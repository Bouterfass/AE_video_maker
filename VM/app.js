/* FILES */

var music = new File("../files/musics/idea22.mp3");
var backgroundImage = new File("../files/backgrounds/books.jpg");


/* END FILES */
/* FUNCTIONS */

function createIntroLayer(comp) {

    var textLayer = comp.layers.addText("Mon Texte");
    return textLayer;
}

function createLayers(type, nbLayers, comp) {

    var layers = [];
    
    var textLayer;

    for (var i = 0; i <= nbLayers; i++) {
        
        textLayer = comp.layers.addText('BLANLAA');
       
        layers.push(textLayer)
    }
    return layers;
}

function changeTextStyle(layersArray) {
    // Parcours toutes les couches du tableau
    for (var i = 0; i < layersArray.length; i++) {
      var currentLayer = layersArray[i];
  
      // Vérifie si la couche est une couche de texte
      if (currentLayer instanceof TextLayer) {
        // Changer le style du texte
        var textDocument = currentLayer.property("ADBE Text Properties").property("ADBE Text Document");
        textDocument.font = "Arial"; // Changer la police
        textDocument.fontSize = 50; // Changer la taille de la police
        textDocument.fillColor = [1, 1, 0]; // Changer la couleur de remplissage en jaune
        textDocument.strokeColor = [0, 0, 0]; // Changer la couleur du contour en noir
        textDocument.strokeWidth = 2; // Changer la largeur du contour
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
var importedBackgroundImage = app.project.importFile(new ImportOptions(backgroundImage));

var quotes = [];
var authors = [];

quotes = createLayers("quote number", 10, comp);
authors = createLayers("author", 10, comp);

var introLayer = createIntroLayer(comp);



/* SET LAYERS */
setTimeLayer(quotes, videoLength);
setTimeLayer(authors, videoLength);

setPositionLayer(quotes, videoLength, introLayer);
setPositionLayer(authors, videoLength, introLayer);

changeTextStyle(quotes);

/* SET MUSIC */
comp.layers.add(importedMusic);
var backgroundLayer = comp.layers.add(importedBackgroundImage);
backgroundLayer.moveToEnd();