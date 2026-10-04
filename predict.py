import os
import argparse
import joblib
import numpy as np
import pandas as pd
import re
from sentence_transformers import SentenceTransformer

# Constants and configuration
MODELS_DIR = "models_v8"
DEFAULT_TOP_K = 3
LOW_RELEVANCE_THRESHOLD = 0.26
CANDIDATES_PER_VIEW = 15

print("============================================================")
print("  MAHABHARATA STRATEGIC DECISION SUPPORT SYSTEM (V8) CLI   ")
print("============================================================")

# Load precomputed embeddings and model artifacts
cases_df = joblib.load(os.path.join(MODELS_DIR, "corpus_v8.joblib"))
field_embeddings = joblib.load(os.path.join(MODELS_DIR, "field_embeddings_v8.joblib"))
weights = joblib.load(os.path.join(MODELS_DIR, "weights_v8.joblib"))
model_name = joblib.load(os.path.join(MODELS_DIR, "model_name.joblib"))

try:
    from fastembed import TextEmbedding
    USE_FASTEMBED = True
    print("Loading lightweight FastEmbed ONNX engine (Memory ~35MB)...")
    model = TextEmbedding("sentence-transformers/all-MiniLM-L6-v2")
except Exception:
    import torch
    from sentence_transformers import SentenceTransformer
    torch.set_num_threads(1)
    USE_FASTEMBED = False
    print(f"Loading SentenceTransformer: {model_name}...")
    model = SentenceTransformer(model_name)

print("DSS Engine Ready!\n")


def clean_text(val):
    """Returns clean string from pandas fields."""
    if pd.isna(val):
        return ""
    return str(val).strip()


def extract_keywords(text):
    """Extracts lowercase tokens with 4 or more characters."""
    return set(re.findall(r"[a-zA-Z]{4,}", str(text).lower()))


def calculate_lexical_overlap(query, case_row):
    """Calculates keyword match ratio between query and case description."""
    query_tokens = extract_keywords(query)
    if not query_tokens:
        return 0.0

    case_tokens = extract_keywords(" ".join([
        clean_text(case_row.get("contemporary_problem")),
        clean_text(case_row.get("strategic_challenge")),
        clean_text(case_row.get("strategic_insight")),
        clean_text(case_row.get("strategic_dimension")),
    ]))

    common_tokens = query_tokens.intersection(case_tokens)
    return len(common_tokens) / len(query_tokens)


def predict(query_text, top_k=DEFAULT_TOP_K):
    """Finds the most relevant historical cases for a given problem statement."""
    cleaned_query = query_text.strip()
    if not cleaned_query:
        raise ValueError("Please provide a valid non-empty query.")

    # Generate query embedding
    if USE_FASTEMBED:
        encoded = np.array(list(model.embed([cleaned_query]))[0], dtype=np.float32)
    else:
        encoded = model.encode([cleaned_query], normalize_embeddings=True, show_progress_bar=False)[0]
    query_vector = encoded.astype(np.float32)

    # Calculate similarity across each strategic field
    views = {
        field_name: np.dot(field_embeddings[field_name], query_vector)
        for field_name in weights.keys()
    }

    # Pool candidate indices
    candidate_indices = set()
    pool_size = min(CANDIDATES_PER_VIEW, len(cases_df))
    for score_array in views.values():
        top_indices = np.argsort(score_array)[::-1][:pool_size].tolist()
        candidate_indices.update(top_indices)

    # Rank candidate cases
    ranked_cases = []
    for idx in candidate_indices:
        row = cases_df.iloc[idx]
        field_scores = {f: float(views[f][idx]) for f in weights.keys()}
        overlap = calculate_lexical_overlap(cleaned_query, row)

        base_score = sum(weights[f] * field_scores[f] for f in weights.keys())
        final_score = (0.92 * base_score) + (0.08 * overlap)

        ranked_cases.append({
            "id": int(row.get("id", idx + 1)),
            "episode": clean_text(row.get("episode")),
            "parva": clean_text(row.get("parva")),
            "section": clean_text(row.get("adhyaya_or_section")),
            "strategic_challenge": clean_text(row.get("strategic_challenge")),
            "strategy_or_action": clean_text(row.get("strategy_or_action")),
            "outcome": clean_text(row.get("outcome")),
            "contemporary_problem": clean_text(row.get("contemporary_problem")),
            "strategic_insight": clean_text(row.get("strategic_insight")),
            "contemporary_application": clean_text(row.get("contemporary_application")),
            "final_score": round(float(final_score), 4),
            "match_percentage": round(max(0.0, min(100.0, float(final_score) * 100)), 1),
        })

    # Sort in descending order of final match score
    ranked_cases.sort(key=lambda x: x["final_score"], reverse=True)
    return ranked_cases[:top_k]


def main():
    parser = argparse.ArgumentParser(
        description="Mahabharata Strategic Decision Support System CLI"
    )
    parser.add_argument(
        "--query", "-q",
        type=str,
        default=None,
        help="Problem statement or management dilemma to query"
    )
    parser.add_argument(
        "--top-k", "-k",
        type=int,
        default=DEFAULT_TOP_K,
        help="Number of matching cases to retrieve (default: 3)"
    )

    args = parser.parse_args()

    if args.query:
        results = predict(args.query, top_k=args.top_k)
        print(f'\nTop {len(results)} Strategic Case Matches for: "{args.query}"\n')
        for idx, r in enumerate(results, start=1):
            print(f"#{idx} [{r['match_percentage']}% Match] {r['episode']} ({r['parva']})")
            print(f"   Challenge: {r['strategic_challenge']}")
            print(f"   Strategy:  {r['strategy_or_action']}")
            print(f"   Insight:   {r['strategic_insight']}")
            print("-" * 60)
    else:
        # Interactive CLI prompt mode
        print("Interactive mode. Type your problem below (or 'exit' to quit):")
        while True:
            try:
                user_input = input("\nEnter problem query > ").strip()
                if not user_input or user_input.lower() in ["exit", "quit", "q"]:
                    print("Exiting. Dhanyavaad!")
                    break

                matches = predict(user_input, top_k=args.top_k)
                print(f"\nFound {len(matches)} matching case studies:")
                for idx, r in enumerate(matches, start=1):
                    print(f"\n[{idx}] {r['episode']} — {r['match_percentage']}% Match")
                    print(f"    Parva:    {r['parva']} ({r['section']})")
                    print(f"    Action:   {r['strategy_or_action']}")
                    print(f"    Insight:  {r['strategic_insight']}")
            except KeyboardInterrupt:
                print("\nExiting. Dhanyavaad!")
                break
            except Exception as err:
                print(f"Error: {err}")


if __name__ == "__main__":
    main()
