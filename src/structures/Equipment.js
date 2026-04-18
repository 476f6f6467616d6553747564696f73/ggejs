const Gem = require("./Gem");
const Effect = require("./Effect");
const {equipment_effects} = require('e4k-data').data;

class Equipment {
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
        this.rarityId = data[3];
        /** @type {number} */
        this.pictureId = data[4];
        /** @type {boolean} */
        this.canSlotGem = this.slotId !== 6;
        /** @type {number} */
        this.enhancementLevel = data[8];
        /** @type {number} */
        this.setId = data[7];
        /** @type {Effect[]} */
        this.effects = parseEffects(data[5]);
        if (data[10] !== -1) this.attachedGem = parseGem(data[10], this);
        if (lord) this.equippedLord = lord;
    }
}

/**
 * @param {Array} data
 * @returns {Effect[]}
 */
function parseEffects(data) {
    return data.map(d => {
        const effectData = [...d]
        effectData[0] = equipment_effects.find(e => e.equipmentEffectID === d[0])?.effectID ?? d[0]
        return new Effect(effectData)
    })
}

/**
 * @param {number} data
 * @param {Equipment} equipment
 */
function parseGem(data, equipment) {
    return new Gem(data, equipment)
}

module.exports = Equipment;