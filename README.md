Duplicate Question Pair UI (React + Vite)

What this is:
- A minimal React UI to input two questions and compute features similar to your notebook.
- Uses a small client-side heuristic to estimate duplicate-ness. It does NOT run your trained RandomForest model or TF-IDF (those are Python-based).

How to run (Windows PowerShell):

1) Open PowerShell and change to the frontend folder:

   cd "c:\Users\VATSAL\OneDrive\Desktop\AI-ML\new\frontend"

2) Install dependencies:

   npm install

3) Install Material UI (optional but recommended for the provided UI):

   npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

3) Start dev server:

   npm run dev

4) Open the URL printed by Vite (usually http://localhost:5173) in your browser.

Next steps:
- If you want the exact model prediction, create a tiny backend (Flask/FastAPI/Node) that loads the trained `rf` model and `tfidf` vectorizer and exposes a POST /predict endpoint. The UI can then call that endpoint.
