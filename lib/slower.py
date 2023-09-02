import subprocess


input_video_path = "./files/backgrounds/bgvideo1.mp4"
output_video_path = "./files/backgrounds/bgvideo1_slowed.mp4"
desired_duration = 60  # 1 minute

speed_factor = float(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=duration', '-of', 'default=noprint_wrappers=1:nokey=1', input_video_path])) / desired_duration

# Use ffmpeg to slow down the video
command = f'ffmpeg -i {input_video_path} -vf "setpts=({desired_duration}*PTS)" -c:v libx264 -r 30 -preset slow -t {desired_duration} {output_video_path}'
subprocess.call(command, shell=True)
