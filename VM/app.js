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

var music = new File("../files/musics/takemeinyourarms.mp3");
var backgroundImage = new File("../files/backgrounds/sunset.jpg");
//var backgroundVideo = new File("../files/backgrounds/night1.mp4");


/* END FILES */
/* FUNCTIONS */

function createIntroLayer(comp) {

    var textLayer = comp.layers.addText("Mon Texte");
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

    for (var i = 0; i <= nbLayers; i++) {
        
        textLayer = comp.layers.addText(quotesList[3]);
        var textProp = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
        textDoc = textProp.value;
        textDoc.applyStroke = true;
        textDoc.fontSize = 80;
        textDoc.italic = true;
        textDoc.fillColor = [1, 1, 1];
        textDoc.strokeColor = [0, 0, 0];
        textDoc.strokeWidth = 1;
        textProp.setValue(textDoc);
        layers.push(textLayer)
        
        var totalTextHeight = textDoc.fontSize * textDoc.text.split("\n").length;
        var middleTextY = (comp.height - totalTextHeight) / 2;
        var textRect = textLayer.sourceRectAtTime(0, false);

        var middleTextX = (comp.width - textRect.width) / 2;
        textLayer.position.setValue([middleTextX, middleTextY]);
    }
    return layers;
}

function changeTextStyle(layersArray) {
    // Parcours toutes les couches du tableau
    for (var i = 1; i < layersArray.length; i++) {
      var currentLayer = layersArray[i];
      // Vérifie si la couche est une couche de texte
      if (currentLayer instanceof TextLayer) {
        // Changer le style du texte
        
      }
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

var videoLength = 61;

var comp = app.project.items.addComp("Composition", 1080, 1920, 1, videoLength, 29.97);
var importedMusic = app.project.importFile(new ImportOptions(music));
var importedBackground = app.project.importFile(new ImportOptions(backgroundImage));

//var videoComp = app.project.items.addComp("Video Comp", 1080, 1920, 1, videoLength, 29.97);
var backgroundLayer = comp.layers.add(importedBackground);
//var videoLayer = videoComp.layers.add(importedBackground);

// var nbDuplication = Math.ceil(videoLength / videoLayer.source.duration);
// for (var i = 1; i < nbDuplication; i++) {
//     videoLayer.duplicate();
// }

// var offset = 0;
// for (var i = 1; i <= videoComp.layers.length; i++) {
//     var currentLayer = videoComp.layers[i];
//     currentLayer.startTime = offset;
//     offset += currentLayer.source.duration;
// }

// var backgroundVideoLayer = comp.layers.add(videoComp);
// backgroundVideoLayer.startTime = 0;
// backgroundVideoLayer.outPoint = videoLength;

//backgroundVideoLayer.moveToEnd(); 

var quotes = [];
var authors = [];

quotes = createLayers("quote number", 10, comp);
//authors = createLayers("author", 10, comp);

var introLayer = createIntroLayer(comp);



/* SET LAYERS */
setTimeLayer(quotes, videoLength);
//setTimeLayer(authors, videoLength);

setPositionLayer(quotes, videoLength, introLayer);
//setPositionLayer(authors, videoLength, introLayer);



changeTextStyle(comp.layers);

/* SET MUSIC */
comp.layers.add(importedMusic);

backgroundLayer.moveToEnd();