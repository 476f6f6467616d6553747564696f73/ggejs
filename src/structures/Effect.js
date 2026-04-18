const {effects} = require('e4k-data').data;

class Effect {
    /** @param {Array | number} data */
    constructor(data) {
        if (typeof data === "number") {
            /** @type {number} */
            this.effectId = data;
        } else {
            this.effectId = parseFloat(data[0]);
            /** @type {number} */
            this.power = parseFloat(data[1]);
        }
        const _data = getDataFromJson(this.effectId);
        if (_data === undefined) return;
        this.rawData = _data;
        this.name = _data.name;
        this.capId = _data.capID;
        this.uncappedPower = this.power;
    }
}

/** @param {number} id */
function getDataFromJson(id) {
    return effects.find(e => e.effectID === id);
}

module.exports = Effect;