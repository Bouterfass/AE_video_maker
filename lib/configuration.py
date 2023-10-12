import subprocess


# Initialisez les variables pour stocker les données
citations = []
background = ""
music = ""
settings = "VM/settings/settings.txt"
current_quote = ""
stback = "00:00:00"
stmusic = "00:00:00"

with open(settings, "r") as fichier:
    ligne = fichier.readline()
    while ligne:
        ligne = ligne.strip()  # Supprimez les espaces et les sauts de ligne

        if ligne == "":
            # Ligne vide : nouvelle citation
            if current_quote:
                citations.append(current_quote)
                current_quote = ""
        elif ligne.startswith("scene: "):
            # Ligne avec le nom du fichier MP4 (background)
            background = ligne.replace("scene: ", "")
        elif ligne.startswith("song: "):
            # Ligne avec le nom du fichier MP3 (music)
            music = ligne.replace("song: ", "")
        elif ligne.startswith("st_background: "):
            stback = ligne.replace("st_background: ", "")
        elif ligne.startswith("st_music: "):
            stmusic = ligne.replace("st_music: ", "")         
        else:
            # Ajoutez la ligne à la citation actuelle
            current_quote += ligne + "\n"
        ligne = fichier.readline()

# Assurez-vous d'ajouter la dernière citation si elle existe
if current_quote:
    citations.append(current_quote)

# Maintenant, vous avez les citations dans la liste 'citations', le nom du fichier MP4 dans 'background'
# et le nom du fichier MP3 dans 'music'


autre_script = "lib/trimmer.py"  # Remplacez ceci par le chemin du script que vous voulez exécuter

# Vous pouvez passer des arguments à l'autre script si nécessaire
print("lencit ", str(len(citations) * 5))
if stmusic != "" or stback != "":
    arguments = [background, music, str(((len(citations) + 1) * 5)), "--st_background", stback, "--st_music", stmusic]      

    
# Exécutez l'autre script
try:
    subprocess.check_call(["py", autre_script] + arguments)
except subprocess.CalledProcessError:
    print("L'exécution de l'autre script a rencontré une erreur.")
