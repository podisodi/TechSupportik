/**
 * Return new instance of passed array, with passed element (or array of elements) at the end of new array.
 * @param {Array} arr An instance of source array.
 * @param {*} item An element (or array of elements) to add.
 * @returns New instance of array.
 */
export function append(arr, item) {
    if(item instanceof Array) {
        return [...arr, ...item];
    } else {
        return [...arr, item];
    }
}

export function appendFront(arr, item) {
    if(item instanceof Array) {
        return [...item, ...arr];
    } else {
        return [item, ...arr];
    }
}