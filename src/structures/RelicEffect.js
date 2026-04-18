const Effect = require('./Effect');
const {relicEffects} = require('e4k-data').data;

class RelicEffect extends Effect {
    /** @param {Array} data */
    constructor(data) {
        let _data = getDataFromJson(data[0]);
        super(_data.effectID);
        /** @type {number} */
        this.relicEffectId = data[0];
        //this.? = data[1];
        /** @type {number} */
        this.power = parseFloat(data[2][0]);
    }
}

/** @param {number} id */
function getDataFromJson(id) {
    return relicEffects.find(e => e.id === id);
}

module.exports = RelicEffect;