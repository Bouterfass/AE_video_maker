// Lecture du fichier texte
var settingsFile = new File("./settings/settings.txt"); // Remplacez "chemin_vers_le_fichier.txt" par le chemin réel de votre fichier

if (settingsFile.open("r")) {
    var quotesList = [];
    var currentQuote = "";

    while (!settingsFile.eof) {
        var line = settingsFile.readln();

        if (line === "") {
            // Une ligne vide signifie une nouvelle citation
            if (currentQuote !== "") {
                quotesList.push(currentQuote);
                currentQuote = "";
            }
        } else {
            // Ajouter la ligne à la citation actuelle
            currentQuote += line + "\n";
        }
    }

    settingsFile.close();
}
/* FILES */

var music = new File("../files/musics/tmiyan.mp3");
var backgroundImage = new File("../files/backgrounds/hawaiinew.mp4");

/* END FILES */
/* FUNCTIONS */

function createIntroLayer(comp) {

    var textLayer = comp.layers.addText("");
    var textProp = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
    textDoc = textProp.value;

    var textRect = textLayer.sourceRectAtTime(0, false);

    var middleTextY = (comp.height + textRect.height) / 2;
    var middleTextX = (comp.width - textRect.width) / 2;
    textLayer.position.setValue([middleTextX, middleTextY]);

    return textLayer;
}

function createLayers(type, nbLayers, comp) {

    var layers = [];
    var textLayer;

    var maxWidth = 1080; // Largeur maximale souhaitée

    for (var i = 0; i < nbLayers; i++) {
        var quote = quotesList[i];
        var lines = [];
        var currentLine = '';
        var words = quote.split(' ');

        for (var j = 0; j < words.length; j++) {
            var testLine = currentLine + (currentLine === '' ? '' : ' ') + words[j];
            var testTextLayer = comp.layers.addText(testLine);
            var testSourceRect = testTextLayer.sourceRectAtTime(0, false);
            testTextLayer.remove();

            if (testSourceRect.width > maxWidth) {
                lines.push(currentLine);
                currentLine = words[j];
            } else {
                currentLine = testLine;
            }
        }

        if (currentLine !== '') {
            lines.push(currentLine);
        }

        var text = lines.join('\n');
        textLayer = comp.layers.addText(text);

        // Configurez les propriétés du texte (couleur, taille, etc.)
        layers.push(textLayer);

        var textProp = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
        var textDoc = textProp.value;
        textDoc.applyStroke = true;
        textDoc.fontSize = 75;
        textDoc.italic = true;
        textDoc.fillColor = [1, 1, 1];
        textDoc.strokeColor = [0, 0, 0];
        textDoc.strokeWidth = 1;
        textProp.setValue(textDoc);


        // Centrez le texte dans le cadre
        var textRect = textLayer.sourceRectAtTime(0, false);
        var middleTextX = comp.width / 2 - textRect.width / 2;
        var middleTextY = comp.height / 2 - textRect.height / 2;
        textLayer.position.setValue([middleTextX, middleTextY]);
    }
    return layers;
}


function fadeInOut(layer, duration) {
    layer.opacity.setValueAtTime(0, 0); // Opacité initiale à 0
    layer.opacity.setValueAtTime(duration / 12, 100); // Opacité maximale au milieu de la transition
    layer.opacity.setValueAtTime(duration - (duration / 12), 100); // Opacité de retour à 0 à la fin de la transition
    layer.opacity.setValueAtTime(duration, 0);
}

function layerTransition(quotes, videoLength) {

   
    for (var i = 0; i < quotes.length; i++) {
        var quote = quotes[i];
        var transitionDuration = videoLength / quotes.length;; // Durée de la transition en secondes (personnalisez selon vos besoins)
        fadeInOut(quote, transitionDuration);
    }

}


function setPositionLayer(layers, time, introLayer) {

    var interval = time / layers.length;

    for (var i = 0; i <= layers.length; i++) {
        if (i == 0) {
            introLayer.startTime = i;
            introLayer.outPoint = interval;
        } else {
            layers[i - 1].startTime = (i) * interval;
            layers[i - 1].outPoint = layers[i - 1].startTime + interval
        }
    }
}

function setTimeLayer(layers, time) {

    for (var i = 0; i < layers.length; i++) {
        layers[i].duration = time / layers.length;
    }
}

/* END FUNCTIONS*/

var videoLength = quotesList.length * 5;

var comp = app.project.items.addComp("Composition", 1080, 1920, 1, videoLength, 29.97);
var importedMusic = app.project.importFile(new ImportOptions(music));
var importedBackground = app.project.importFile(new ImportOptions(backgroundImage));

//var videoComp = app.project.items.addComp("Video Comp", 1080, 1920, 1, videoLength, 29.97);
var backgroundLayer = comp.layers.add(importedBackground);

var sign = comp.layers.addText("@anhedonia");
sign.outPoint = comp.duration;
sign.position.setValue([10, 1200]);


if (sign instanceof TextLayer) {
    var textProperties = sign.property("ADBE Text Properties").property("ADBE Text Document");
    var textDocument = textProperties.value;

    // Changez le style du texte
    textDocument.font = "Helvetica Neue"; // Changer la police
    textDocument.fontSize = 60; // Changer la taille de la police
    textDocument.fillColor = [1, 1, 1]; // Changer la couleur de remplissage en blanc (1, 1, 1 correspond au blanc)
    textDocument.strokeColor = [0, 0, 0]; // Changer la couleur du contour en noir
    textDocument.strokeWidth = 1; // Changer la largeur du contour

    textDocument.italic = true; // Mettre en italique
    textProperties.setValue(textDocument);

    var newPositionX = sign.position.value[0] + 80; // Décalage horizontal de 50 pixels
    var newPositionY = sign.position.value[1] - 750; // Décalage vertical de 100 pixels
    sign.position.setValue([newPositionX, newPositionY]);

}

var quotes = [];
var authors = [];

quotes = createLayers("quote number", quotesList.length, comp);
//authors = createLayers("author", 10, comp);

var introLayer = createIntroLayer(comp);



/* SET LAYERS */
setTimeLayer(quotes, videoLength);
//setTimeLayer(authors, videoLength);

layerTransition(quotes, videoLength);

setPositionLayer(quotes, videoLength, introLayer);
//setPositionLayer(authors, videoLength, introLayer);

/* SET MUSIC */
comp.layers.add(importedMusic);

backgroundLayer.moveToEnd();