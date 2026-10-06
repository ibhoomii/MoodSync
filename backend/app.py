from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from ml.recommender import recommend_songs

app = Flask(__name__)
CORS(app)

# Load trained ML model
model = joblib.load("models/emotion_model.pkl")
vectorizer = joblib.load("models/tfidf_vectorizer.pkl")


@app.route("/api/text-emotion", methods=["POST"])
def predict_emotion():

    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({
            "error": "Text is required"
        }), 400

    text = data["text"].strip()

    if not text:
        return jsonify({
            "error": "Text cannot be empty"
        }), 400

    # Convert text into TF-IDF features
    text_tfidf = vectorizer.transform([text])

    # Predict emotion
    emotion = model.predict(text_tfidf)[0]

    # Calculate confidence
    probabilities = model.predict_proba(text_tfidf)[0]
    confidence = float(max(probabilities))

    return jsonify({
        "emotion": emotion,
        "confidence": round(confidence, 4)
    })

@app.route("/api/recommendations", methods=["POST"])
def recommendations():

    data = request.get_json()

    if not data or "emotion" not in data:
        return jsonify({
            "error": "Emotion is required"
        }), 400

    emotion = data["emotion"]

    songs = recommend_songs(emotion, 6)

    result = []

    for _, song in songs.iterrows():

        result.append({
            "title": song["title"],
            "artist": song["artist"],
            "emotion": song["emotion"],
            "genre": song["genre"]
        })

    return jsonify({
        "emotion": emotion,
        "songs": result
    })

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "MoodSync backend is running"
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )