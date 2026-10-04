import os
import joblib
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

def main():
    print("=" * 60)
    print("Building Mahabharata DSS Models & Embeddings (V5 & V6)")
    print("=" * 60)

    csv_path = "mahabharata_factual_master_v5.csv"
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Cannot find {csv_path}")

    df = pd.read_csv(csv_path)
    print(f"Loaded {len(df)} records from {csv_path}")

    model_name = "all-MiniLM-L6-v2"
    print(f"Loading SentenceTransformer: {model_name}...")
    model = SentenceTransformer(model_name)

    # 1. Base semantic representation for V5 corpus
    # Combining key thematic and strategic dimensions
    corpus_texts = []
    for _, row in df.iterrows():
        text = (
            f"Episode: {row.get('episode', '')}. "
            f"Parva: {row.get('parva', '')}. "
            f"Characters: {row.get('characters', '')}. "
            f"Situation: {row.get('situation_description', '')}. "
            f"Strategic Challenge: {row.get('strategic_challenge', '')}. "
            f"Strategy: {row.get('strategy_or_action', '')}. "
            f"Outcome: {row.get('outcome', '')}. "
            f"Category: {row.get('problem_category', '')}. "
            f"Strategic Insight: {row.get('strategic_insight', '')}. "
            f"Contemporary Problem: {row.get('contemporary_problem', '')}. "
            f"Contemporary Application: {row.get('contemporary_application', '')}"
        )
        corpus_texts.append(text)

    print("Encoding base corpus embeddings...")
    corpus_embeddings = model.encode(
        corpus_texts,
        normalize_embeddings=True,
        show_progress_bar=True
    )
    corpus_embeddings = np.asarray(corpus_embeddings, dtype=np.float32)

    # 2. V6 Field Embeddings
    field_names = [
        "strategic_challenge",
        "problem_category",
        "strategic_insight",
        "contemporary_problem"
    ]
    
    field_embeddings = {}
    for field in field_names:
        print(f"Encoding field embeddings for '{field}'...")
        field_texts = [str(df.iloc[i].get(field, '')) for i in range(len(df))]
        emb = model.encode(
            field_texts,
            normalize_embeddings=True,
            show_progress_bar=False
        )
        field_embeddings[field] = np.asarray(emb, dtype=np.float32)

    # 3. V6 Weighted Scoring Configuration
    # Optimized weights giving balanced emphasis to holistic semantics and specific modern problem matching
    weights = {
        "semantic": 0.40,
        "contemporary_problem": 0.25,
        "strategic_challenge": 0.15,
        "strategic_insight": 0.10,
        "problem_category": 0.10
    }

    # 4. Create directories & save artifacts
    v5_dir = "models_v5_corrected"
    v6_dir = "models_v6"
    os.makedirs(v5_dir, exist_ok=True)
    os.makedirs(v6_dir, exist_ok=True)

    print("\nSaving V5 artifacts...")
    joblib.dump(df, os.path.join(v5_dir, "corpus.joblib"))
    joblib.dump(corpus_embeddings, os.path.join(v5_dir, "corpus_embeddings.joblib"))
    joblib.dump(model_name, os.path.join(v5_dir, "model_name.joblib"))

    print("Saving V6 artifacts...")
    joblib.dump(field_embeddings, os.path.join(v6_dir, "field_embeddings_v6.joblib"))
    joblib.dump(weights, os.path.join(v6_dir, "weights_v6.joblib"))

    print("\nAll models and embeddings built successfully!")
    print(f"V5 Dir: {v5_dir} (corpus, corpus_embeddings, model_name)")
    print(f"V6 Dir: {v6_dir} (field_embeddings_v6, weights_v6)")

if __name__ == "__main__":
    main()
