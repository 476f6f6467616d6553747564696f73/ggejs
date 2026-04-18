const RelicEffect = require("./RelicEffect");

class RelicGem {
    /**
     * @param {Array} data
     * @param {RelicEquipment} equipment
     */
    constructor(data, equipment = null) {
        /** @type {number} */
        this.id = data[0];
        /** @type {number} */
        this.slotId = this.id % 4 + 7;
        /** @type {number} */
        this.relicTypeId = data[1];
        /** @type {number} */
        this.relicCategoryId = data[2];
        /** @type {number} */
        this.mightValue = data[3];
        /** @type {number} */
        this.enhancementLevel = data[5];
        if (equipment) this.attachedEquipment = equipment;
        /** @type {RelicEffect[]} */
        this.effects = parseEffects(data[4]);
    }
}

/**
 * @param {Array} data
 * @returns {RelicEffect[]}
 */
function parseEffects(data) {
    return data.map(d => new RelicEffect(d));
}

module.exports = RelicGem;