from pydub import AudioSegment
import subprocess
import argparse

#Ce fichier a pour but de trim la video et l'audio 

def str_to_milli(temps_str):
    # Divisez le temps en heures, minutes et secondes
    heures, minutes, secondes = map(int, temps_str.split(":"))
    
    # Calculez le temps total en millisecondes
    temps_total = (heures * 3600 + minutes * 60 + secondes) * 1000
    
    return temps_total


parser = argparse.ArgumentParser(description="Songs trimmer script.")

parser.add_argument("background", help="Chemin du background")
parser.add_argument("music", help="Chemin de la music")
parser.add_argument("time", help="Longueur de la video")
parser.add_argument("--st_background", help="début du découpage background")
parser.add_argument("--st_music", help="début du découpage music")

args = parser.parse_args()


background = args.background
music = args.music
time = args.time
st_background= args.st_background
st_music = args.st_music

# Ouvrez le fichier mp3
song = AudioSegment.from_file("files/raw/musics/"+music+".mp3", format="mp3")

# Durée en millisecondes
start_time = str_to_milli(st_music)
end_time = int(start_time) + (int(time) * 1000) # 1 minute 26 secondes

# Découpez l'audio de 16 secondes à 1 minute 26 secondes
cut_audio = song[start_time:end_time]

# Enregistrez le fichier découpé
cut_audio.export("files/edited/musics/"+music+"_edited.mp3", format="mp3")
print("Le nouveau fichier audio est créé et enregistré.")


input_video_path = "files/raw/backgrounds/"+background+".mp4"
output_video_path = "files/edited/backgrounds/"+background+"_edited.mp4"
desired_duration = time 
resolution = "1080x1920"
start_time = st_background
gamma = 0.8

# Utilisez ffmpeg pour couper et redimensionner la vidéo
command = f'ffmpeg -i {input_video_path} -an -ss {start_time} -t {desired_duration} -vf "scale={resolution},setsar=1:1,eq=gamma={gamma}" -c:v libx264 -c:a aac -strict experimental {output_video_path}'
subprocess.call(command, shell=True)