const BasicMovement = require("./BasicMovement");
const Good = require("../Good");
const Unit = require("../Unit");
const InventoryItem = require("../InventoryItem");

class ArmyTravelMovement extends BasicMovement {
    /**
     * @param {BaseClient} client
     * @param {*} data
     */
    constructor(client, data) {
        super(client, data);
        /** @type {InventoryItem<Unit>[]} */
        this.army = parseArmy(client, data.A);
        /** @type {Good[]} */
        this.goods = parseGoods(client, data.G);
    }
}

/**
 * @param {BaseClient} client
 * @param {*} data
 */
function parseGoods(client, data) {
    /** @type {Good[]} */
    const goods = [];
    for (const i in data) goods.push(new Good(data[i]));
    return goods;
}

/**
 * @param {BaseClient} client
 * @param {*} data
 */
function parseArmy(client, data) {
    /** @type {InventoryItem<Unit>[]} */
    const army = [];
    for (const i in data) army.push(new InventoryItem(new Unit(data[i][0]), data[i][1]))
    return army;
}

module.exports = ArmyTravelMovement;