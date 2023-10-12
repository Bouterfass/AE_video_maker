from pydub import AudioSegment

# Ouvrez le fichier mp3
song = AudioSegment.from_file("files/musics/tmiya.mp3", format="mp3")

# Durée en millisecondes
start_time = 16 * 1000  # 16 secondes
end_time = (1 * 60 + 26) * 1000  # 1 minute 26 secondes

# Découpez l'audio de 16 secondes à 1 minute 26 secondes
cut_audio = song[start_time:end_time]

# Enregistrez le fichier découpé
cut_audio.export("files/musics/tmiyan.mp3", format="mp3")
print("Le nouveau fichier audio est créé et enregistré.")
