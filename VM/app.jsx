

function createLayers(type, nbLayers, comp) {
    
    var layers = [];
    
    for (var i = 0; i <= nbLayers; i++){
        layers.push(comp.layers.addText("dlfgjsdk"))
    }
    return layers;
}

function setPositionLayer(layers, time) {

    var interval = time / layers.length;

    for (var i = 0; i < layers.length; i++) {
        layers[i].startTime = i * interval;
        layers[i].outPoint = layers[i].startTime + interval
    }
}

function setTimeLayer(layers, time) {

    for (var i = 0; i < layers.length; i++) {
        layers[i].duration = time / layers.length;
    }
}


var videoLength = 61;

var comp = app.project.items.addComp("Composition", 1080, 1920, 1, videoLength, 29.97);

var quotes = [];
var authors = [];

quotes = createLayers("quote number", 7, comp);
authors = createLayers("author", 7, comp);

setTimeLayer(quotes, videoLength);
setTimeLayer(authors, videoLength);

setPositionLayer(quotes, videoLength);
setPositionLayer(authors, videoLength);


quotes.startTime = 15;