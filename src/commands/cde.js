const {execute: grc} = require("./onReceived/grc");

const NAME = "cde";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    parseCDE(client, params);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @param {number} castleId
 * @param {number} kingdomId
 * @param {number} amountStone
 * @param {number} amountWood
 * @return {Promise<void>}
 */
module.exports.colossusDepositResources = function (client, castleId, kingdomId, amountStone, amountWood) {
    const C2SColossusDepositResourcesVO = {
        SCID: castleId,
        SKID: kingdomId,
        DS: amountStone,
        DW: amountWood,
    };
    return require('.').baseSendCommand(client, NAME, C2SColossusDepositResourcesVO, callbacks, () => true);
}

module.exports.cde = parseCDE;

/**
 * @param {BaseClient} client
 * @param {{grc: Object, che: Object}} params
 */
function parseCDE(client, params) {
    grc(client, 0, params.grc);
}