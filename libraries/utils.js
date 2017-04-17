//////////////////////////////////////
// My micellanous support functions //

Array.prototype.swap = function (i, j) {
    var store = this[i];
    this[i] = this[j];
    this[j] = store;
    return this;
}

var randInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};


