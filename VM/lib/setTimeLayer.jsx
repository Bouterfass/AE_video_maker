export function setTimeLayer(layers, time) {

    layers.forEach(layer => {
        layer.time = time / layers.length;
    })

}