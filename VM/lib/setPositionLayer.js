export function setPositionLayer(layers, time) {

    var interval = time / layers.length;

    for (var i = 0; i < layers.length; i++) {
        layers[i].startTime = i * interval;
        layers[i].outPoint = layers[i].startTime + interval
    }
}
