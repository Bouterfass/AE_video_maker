export function createLayers(type, nbLayers = 7, comp) {
    
    var layers = [];
    
    for (var i = 0; i <= nbLayers; i++) {
        layers.push(comp.layers.addText(`${type} ${i + 1}`))
    }
  
    return layers;
}