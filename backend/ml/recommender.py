import pandas as pd
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SONG_FILE = os.path.join(BASE_DIR, "data", "songs.csv")

songs = pd.read_csv(SONG_FILE)


def recommend_songs(emotion, n=6):
    """
    Recommend songs based on detected emotion.

    Step 1: Filter songs matching the detected emotion.
    Step 2: Rank matching songs using energy and valence.
    Step 3: Return the top N songs.
    """

    emotion = emotion.lower()

    matching_songs = songs[
        songs["emotion"].str.lower() == emotion
    ].copy()

    if matching_songs.empty:
        return matching_songs

    # Normalize energy and valence into a recommendation score.
    matching_songs["score"] = (
        0.5 * matching_songs["energy"]
        + 0.5 * matching_songs["valence"]
    )

    matching_songs = matching_songs.sort_values(
        by="score",
        ascending=False
    )

    return matching_songs.head(n)