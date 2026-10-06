import pandas as pd
import os



# Load song dataset
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SONG_FILE = os.path.join(BASE_DIR, "data", "songs.csv")

songs = pd.read_csv(SONG_FILE)


def recommend_songs(emotion, n=6):
    """
    Recommend songs based on detected emotion.
    """

    # Find songs matching the detected emotion
    matching_songs = songs[
        songs["emotion"].str.lower() == emotion.lower()
    ].copy()

    # If enough matching songs exist
    if len(matching_songs) >= n:

        # Rank using energy + valence
        matching_songs["score"] = (
            0.5 * matching_songs["energy"]
            + 0.5 * matching_songs["valence"]
        )

        matching_songs = matching_songs.sort_values(
            by="score",
            ascending=False
        )

        return matching_songs.head(n)

    return matching_songs