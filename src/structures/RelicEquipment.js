const RelicEffect = require("./RelicEffect");
const RelicGem = require("./RelicGem");

class RelicEquipment {
    /**
     * @param {Array} data
     * @param {Lord} lord
     */
    constructor(data, lord = null) {
        /** @type {number} */
        this.id = data[0];
        /** @type {number} */
        this.slotId = data[1];
        /** @type {number} */
        this.wearerId = data[2];
        /** @type {number} */
        this.rarityId = data[3]
        /** @type {boolean} */
        this.canSlotGem = this.slotId !== 6;
        /** @type {number} */
        this.enhancementLevel = data[8];
        /** @type {number} */
        this.relicTypeId = data[12][0];
        /** @type {number} */
        this.relicCategoryId = data[12][1];
        /** @type {number} */
        this.mightValue = data[12][2];
        if (data[12][3]?.length > 0) this.attachedGem = parseGem(data[12][3], this);
        /** @type {RelicEffect[]} */
        this.effects = parseEffects(data[5]);
        if (lord) this.equippedLord = lord;
    }
}

/**
 * @param {Array} data
 * @param {RelicEquipment} equipment
 */
function parseGem(data, equipment) {
    return new RelicGem(data, equipment);
}

/** @param {Array} data */
function parseEffects(data) {
    return data.map(d => new RelicEffect(d));
}

module.exports = RelicEquipment;