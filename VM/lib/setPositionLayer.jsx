export function setPositionLayer(layers, time) {

    var position = 0;
    var interval = array.length / time;

    layers.forEach(layer => {
        layer.start_time = position;
        position += interval;
    })
}