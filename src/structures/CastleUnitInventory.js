const Unit = require("./Unit");
const {execute: gsi} = require("../commands/onReceived/gsi");
const InventoryItem = require("./InventoryItem");

class CastleUnitInventory {

    /** @type {InventoryItem<Unit>[]} */
    units = [];
    /** @type {InventoryItem<Unit>[]} */
    unitsTraveling = [];
    /** @type {InventoryItem<Unit>[]} */
    unitsInHospital = [];
    /** @type {InventoryItem<Unit>[]} */
    unitsInStronghold = [];
    /** @type {number} */
    totalShadowUnits = 0;
    /** @type {number} */
    travellingShadowUnits = 0;
    /** @type {InventoryItem<Unit>[]} */
    shadowUnits = [];

    /**
     * @param {BaseClient} client
     * @param {{I:[], HI:[],SHI:[],TU:[],gsi:Object}} data
     */
    constructor(client, data) {
        if (!data) return;
        this.units = parseUnits(client, data.I);
        this.unitsInHospital = parseUnits(client, data.HI);
        this.unitsInStronghold = parseUnits(client, data.SHI);
        this.unitsTraveling = parseUnits(client, data.TU);
        if (data.gsi) {
            const shadowUnitsInfo = gsi(client, 0, data.gsi);
            this.totalShadowUnits = shadowUnitsInfo.totalShadowUnits;
            this.travellingShadowUnits = shadowUnitsInfo.travellingShadowUnits;
            this.shadowUnits = shadowUnitsInfo.shadowUnits;
        }
    }
}

/**
 * @param {BaseClient} client
 * @param {[]} data
 * @return {InventoryItem<Unit>[]}
 */
function parseUnits(client, data) {
    return data.map(d => new InventoryItem(new Unit(d[0]), d[1]));
}

module.exports = CastleUnitInventory;