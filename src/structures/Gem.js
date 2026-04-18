const Effect = require("./Effect");
const {gems} = require('e4k-data').data;

class Gem {
    /**
     * @param {number} id
     * @param {Equipment} equipment
     */
    constructor(id, equipment = null) {
        const _data = getDataFromJson(id);
        if (!_data) return;
        this.rawData = _data;
        /** @type {number} */
        this.id = _data.gemID;
        if (_data.setID) this.setId = _data.setID;
        /** @type {Effect[]} */
        this.effects = parseEffects(_data.effects);
        if (equipment) this.attachedEquipment = equipment;
    }
}

/** @param {number} id */
function getDataFromJson(id) {
    return gems.find(g => g.gemID === id);
}

/** @param {string} effects */
function parseEffects(effects) {
    return effects.split(",").map(e => new Effect(e.split("&amp;")));
}

module.exports = Gem;