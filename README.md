---
title: Mahabharata Strategic DSS
emoji: 🏹
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 7860
---

# 🏹 Mahabharata Strategic Decision Support System (V8)

Namaste! 🙏 Welcome to the **Mahabharata Strategic Decision Support System (DSS)**.

This project connects timeless strategic wisdom and real-life problem-solving from the **Mahabharata** with modern-day challenges (leadership dilemmas, team management, ethical conflicts, diplomacy, and crisis handling).

---

## 📌 What Does This Project Do?

Suppose you have a modern management or life issue, for example:
> *"How do I handle a conflict between two key teammates?"* or *"What should a leader do when resources are limited during a crisis?"*

You simply enter your question. The system will:
1. Understand your exact situation using **Sentence Transformers (AI/NLP)**.
2. Search through **50 carefully documented historical case studies** from the Mahabharata.
3. Retrieve the most relevant epic stories, character decisions (like Krishna, Vidura, Bhishma, Yudhishthira), and give you structured **strategic insights and key takeaways**.

---

## 🚀 Key Highlights & Features

- **Multi-View Semantic Search:** Finds matches not just on simple keywords, but on the deeper meaning of the problem, strategic dimensions, and practical insights.
- **50 Detailed Case Studies:** Based on authentic classical references (standardized to Kisari Mohan Ganguli’s English translation).
- **Interactive Web Interface:** Clean and easy-to-use UI with search, case exploration, character filters, and bilingual support.
- **Fast & Lightweight:** Powered by FastAPI backend and Sentence Transformers (`all-MiniLM-L6-v2`).

---

## 🛠️ Tech Stack Used

- **Backend:** Python, FastAPI, Uvicorn
- **Machine Learning / NLP:** Sentence-Transformers (`all-MiniLM-L6-v2`), PyTorch, Scikit-learn / Joblib, Pandas, NumPy
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (located in `static/`)
- **Deployment:** Docker & Hugging Face Spaces

---

## 💻 How to Run on Your Local Machine

### 1. Prerequisites
Make sure you have **Python 3.10+** installed on your system.

### 2. Install Required Packages
Open your terminal in the project folder and run:
```bash
pip install -r requirements.txt
```

### 3. Start the Application
Simply run the server:
```bash
python3 server.py
```

### 4. Open in Chrome / Browser
Open your browser and visit:
👉 **[http://127.0.0.1:7860](http://127.0.0.1:7860)** or **[http://localhost:7860](http://localhost:7860)**

---

## ☁️ How to Deploy on Hugging Face Spaces

1. Create a new Space on [Hugging Face](https://huggingface.co/new-space).
2. Choose **Docker** as the SDK.
3. Push this project code using Git:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Deploying Mahabharata DSS"
   git remote add origin https://huggingface.co/spaces/<YOUR_USERNAME>/<SPACE_NAME>
   git push -u origin main --force
   ```
4. Hugging Face will automatically build the Docker container and start your live app!

---

## 📚 Reference Note
- Historical texts are referenced from the standard **Kisari Mohan Ganguli English Translation (1883–1896)**.
- Strategic interpretations are curated to assist in modern decision-making analysis.

---
*Developed with dedication to bring classical Indian strategic philosophy to modern decision science.*
