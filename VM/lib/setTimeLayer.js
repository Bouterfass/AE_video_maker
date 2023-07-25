export function setTimeLayer(layers, time) {

    for (var i = 0; i < layers.length; i++) {
        layers[i].duration = time / layers.length;
    }
}