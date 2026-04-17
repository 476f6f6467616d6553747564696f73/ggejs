const ConstructionSlot = require("../../structures/ConstructionSlot");

module.exports.name = "scl";
/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {{OIDL: number[], SSC: number}} params
 */
module.exports.execute = function (client, errorCode, params) {
    return params.OIDL.map(cs => new ConstructionSlot(client, cs))
}