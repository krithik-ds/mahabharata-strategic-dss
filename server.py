import os
import ast
import re
import json
import joblib
import numpy as np
import pandas as pd
from typing import List, Optional, Dict, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

# Directory paths and config constants
MODELS_DIR = "models_v8"
DATASET_CSV = "mahabharata_factual_master_v5.csv"
DEFAULT_MODEL_NAME = "all-MiniLM-L6-v2"
LOW_RELEVANCE_THRESHOLD = 0.26
CANDIDATES_PER_VIEW = 15

# Multi-view retrieval weights based on domain relevance
FIELD_WEIGHTS = {
    "retrieval_text": 0.30,
    "contemporary_problem": 0.28,
    "strategic_challenge": 0.18,
    "strategic_insight": 0.12,
    "strategic_dimension": 0.12,
}

os.makedirs(MODELS_DIR, exist_ok=True)


def build_embeddings_if_missing():
    """Builds and caches embeddings from dataset if not already present."""
    required_files = [
        "corpus_v8.joblib",
        "field_embeddings_v8.joblib",
        "weights_v8.joblib",
        "model_name.joblib",
    ]
    all_exist = all(os.path.exists(os.path.join(MODELS_DIR, f)) for f in required_files)
    if all_exist:
        return

    print("Embeddings not found on disk. Generating them from CSV dataset...")
    df_raw = pd.read_csv(DATASET_CSV).fillna("")
    encoder = SentenceTransformer(DEFAULT_MODEL_NAME)

    target_fields = [
        "retrieval_text",
        "contemporary_problem",
        "strategic_challenge",
        "strategic_insight",
        "strategic_dimension",
    ]

    field_embeddings_dict = {}
    for field in target_fields:
        text_list = [str(val) for val in df_raw[field].tolist()]
        embeddings = encoder.encode(text_list, normalize_embeddings=True, show_progress_bar=True)
        field_embeddings_dict[field] = np.asarray(embeddings, dtype=np.float32)

    # Save artifacts for fast startup
    joblib.dump(df_raw, os.path.join(MODELS_DIR, "corpus_v8.joblib"))
    joblib.dump(field_embeddings_dict, os.path.join(MODELS_DIR, "field_embeddings_v8.joblib"))
    joblib.dump(FIELD_WEIGHTS, os.path.join(MODELS_DIR, "weights_v8.joblib"))
    joblib.dump(DEFAULT_MODEL_NAME, os.path.join(MODELS_DIR, "model_name.joblib"))
    print("Saved all precomputed embeddings successfully.")


# Startup Initialization
print("Initializing Mahabharata Strategic DSS Engine...")
build_embeddings_if_missing()

cases_df = joblib.load(os.path.join(MODELS_DIR, "corpus_v8.joblib"))
field_embeddings = joblib.load(os.path.join(MODELS_DIR, "field_embeddings_v8.joblib"))
active_weights = joblib.load(os.path.join(MODELS_DIR, "weights_v8.joblib"))
model_name = joblib.load(os.path.join(MODELS_DIR, "model_name.joblib"))

print(f"Loading transformer model ({model_name})...")
model = SentenceTransformer(model_name)
print(f"Ready! Total cases indexed: {len(cases_df)}")


# FastAPI App setup
app = FastAPI(
    title="Mahabharata Strategic Decision Support System",
    version="8.0.0",
    description="Multi-view semantic search and strategic decision analysis based on Mahabharata case studies."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str
    top_k: Optional[int] = 3


def parse_characters(raw_value):
    """Safely extracts character names from strings, JSON lists, or CSV formats."""
    if isinstance(raw_value, list):
        return raw_value
    if not isinstance(raw_value, str) or not raw_value or raw_value == "nan":
        return []
    
    raw_str = raw_value.strip()
    if raw_str.startswith("["):
        try:
            return ast.literal_eval(raw_str)
        except Exception:
            pass
    
    return [name.strip().strip("'\"") for name in raw_str.split(",") if name.strip()]


def clean_text(val):
    """Ensures clean string output without NaN."""
    if pd.isna(val):
        return ""
    return str(val).strip()


def extract_keywords(text):
    """Extracts words with 4 or more letters for overlap scoring."""
    return set(re.findall(r"[a-zA-Z]{4,}", str(text).lower()))


def calculate_lexical_overlap(query, case_row):
    """Computes basic keyword overlap between query and case description."""
    query_words = extract_keywords(query)
    if not query_words:
        return 0.0

    combined_text = " ".join([
        clean_text(case_row.get("contemporary_problem")),
        clean_text(case_row.get("strategic_challenge")),
        clean_text(case_row.get("strategic_insight")),
        clean_text(case_row.get("strategic_dimension")),
    ])
    case_words = extract_keywords(combined_text)
    shared_words = query_words.intersection(case_words)
    return len(shared_words) / len(query_words)


def format_case_response(case_row, index, final_score, field_scores, lexical_overlap_score):
    """Standardizes case study format for API JSON responses."""
    parva_no = str(case_row.get("parva_number", "")).strip()
    parsed_parva_num = int(parva_no) if parva_no.isdigit() else 0

    return {
        "id": int(case_row.get("id", index + 1)),
        "index": int(index),
        "parva": clean_text(case_row.get("parva")),
        "parva_number": parsed_parva_num,
        "adhyaya_or_section": clean_text(case_row.get("adhyaya_or_section")),
        "episode": clean_text(case_row.get("episode")),
        "characters": parse_characters(case_row.get("characters")),
        "situation_description": clean_text(case_row.get("situation_description")),
        "strategic_challenge": clean_text(case_row.get("strategic_challenge")),
        "strategy_or_action": clean_text(case_row.get("strategy_or_action")),
        "outcome": clean_text(case_row.get("outcome")),
        "problem_category": clean_text(case_row.get("problem_category")),
        "contemporary_problem": clean_text(case_row.get("contemporary_problem")),
        "strategic_insight": clean_text(case_row.get("strategic_insight")),
        "contemporary_application": clean_text(case_row.get("contemporary_application")),
        "source": clean_text(case_row.get("source")),
        "source_url": clean_text(case_row.get("source_url")),
        "source_verification_status": clean_text(case_row.get("source_verification_status")),
        "final_score": round(float(final_score), 4),
        "match_percentage": round(max(0.0, min(100.0, float(final_score) * 100)), 1),
        "semantic_score": round(float(field_scores.get("retrieval_text", 0.0)), 4),
        "field_scores": {k: round(float(v), 4) for k, v in field_scores.items()},
        "lexical_overlap": round(float(lexical_overlap_score), 4),
    }


def find_matching_cases(user_query, top_k=3):
    """Encodes query and performs multi-view weighted cosine similarity ranking."""
    cleaned_query = user_query.strip()
    if not cleaned_query:
        raise ValueError("Query string cannot be empty.")

    # Encode user query
    encoded_query = model.encode([cleaned_query], normalize_embeddings=True, show_progress_bar=False)[0]
    query_vector = encoded_query.astype(np.float32)

    # Compute dot product similarity across all views
    similarity_views = {}
    for field_name in active_weights.keys():
        similarity_views[field_name] = np.dot(field_embeddings[field_name], query_vector)

    # Select top candidates from each field view
    candidate_indices = set()
    k_candidates = min(CANDIDATES_PER_VIEW, len(cases_df))
    for field_name, scores_array in similarity_views.items():
        top_indices = np.argsort(scores_array)[::-1][:k_candidates].tolist()
        candidate_indices.update(top_indices)

    # Compute weighted final score for candidate cases
    ranked_cases = []
    for idx in candidate_indices:
        case_row = cases_df.iloc[idx]
        scores_by_field = {f: float(similarity_views[f][idx]) for f in active_weights.keys()}
        lex_overlap = calculate_lexical_overlap(cleaned_query, case_row)

        base_semantic_score = sum(active_weights[f] * scores_by_field[f] for f in active_weights.keys())
        # Blend semantic similarity with slight lexical overlap
        combined_final_score = (0.92 * base_semantic_score) + (0.08 * lex_overlap)

        formatted = format_case_response(case_row, idx, combined_final_score, scores_by_field, lex_overlap)
        ranked_cases.append(formatted)

    # Sort descending by final score
    ranked_cases.sort(key=lambda x: x["final_score"], reverse=True)
    limit = max(1, min(int(top_k), len(ranked_cases)))
    top_matches = ranked_cases[:limit]

    highest_score = top_matches[0]["final_score"] if top_matches else 0.0

    return {
        "query": cleaned_query,
        "top_k": len(top_matches),
        "is_low_relevance": highest_score < LOW_RELEVANCE_THRESHOLD,
        "highest_score": highest_score,
        "results": top_matches,
        "total_cases_evaluated": len(cases_df),
        "candidate_pool_size": len(candidate_indices),
        "model_version": "V8 Multi-View Retrieval",
        "weights": active_weights,
    }


# API Endpoints
@app.post("/api/predict")
async def handle_predict(request: QueryRequest):
    try:
        results = find_matching_cases(request.query, request.top_k or 3)
        return results
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@app.get("/api/cases")
async def get_all_cases():
    zero_scores = {k: 0.0 for k in active_weights}
    all_formatted = [
        format_case_response(cases_df.iloc[i], i, 0.0, zero_scores, 0.0)
        for i in range(len(cases_df))
    ]
    return {"total": len(cases_df), "cases": all_formatted}


@app.get("/api/cases/{case_id}")
async def get_single_case(case_id: int):
    matched = cases_df[cases_df["id"] == case_id]
    if matched.empty:
        raise HTTPException(status_code=404, detail="Case not found")
    idx = matched.index[0]
    zero_scores = {k: 0.0 for k in active_weights}
    return format_case_response(cases_df.iloc[idx], idx, 0.0, zero_scores, 0.0)


@app.get("/api/stats")
async def get_dataset_stats():
    unique_characters = set()
    for character_entry in cases_df["characters"]:
        for name in parse_characters(character_entry):
            unique_characters.add(name)

    return {
        "total_cases": len(cases_df),
        "total_parvas": cases_df["parva"].nunique(),
        "parvas": sorted(cases_df["parva"].unique()),
        "total_categories": cases_df["strategic_dimension"].nunique(),
        "categories": sorted(cases_df["strategic_dimension"].unique()),
        "total_characters": len(unique_characters),
        "characters_sample": sorted(unique_characters)[:20],
        "weights": active_weights,
        "model_name": model_name,
        "model_version": "V8",
    }


# Static web UI files
os.makedirs("static", exist_ok=True)
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    # Support dynamic PORT environment variable (useful for cloud/Docker hosting)
    port = int(os.environ.get("PORT", 7860))
    uvicorn.run(app, host="0.0.0.0", port=port)
