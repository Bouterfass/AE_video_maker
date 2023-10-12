import subprocess

input_video_path = "files/backgrounds/hawaii.mp4"
output_video_path = "files/backgrounds/hawaiinew.mp4"
desired_duration = 60  # 1 minute en secondes
resolution = "1080x1920"
start_time = "00:01:00"
gamma = 0.8

# Utilisez ffmpeg pour couper et redimensionner la vidéo
command = f'ffmpeg -i {input_video_path} -an -ss {start_time} -t {desired_duration} -vf "scale={resolution},setsar=1:1,eq=gamma={gamma}" -c:v libx264 -c:a aac -strict experimental {output_video_path}'
subprocess.call(command, shell=True)