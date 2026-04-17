const {ain} = require("./ain");
const {execute: gcu} = require("./onReceived/gcu");
const {execute: grc} = require("./onReceived/grc");

const NAME = "ado";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    parseADO(client, params);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @param {number} areaId
 * @param {number} kingdomId
 * @param {{[key: string]: number}} goodsObject
 * @return {Promise<void>}
 */
module.exports.donateAlliance = function (client, areaId, kingdomId, goodsObject) {
    const C2SAllianceDonateVO = {AID: areaId, KID: kingdomId, RV: goodsObject};
    return require('.').baseSendCommand(client, NAME, C2SAllianceDonateVO, callbacks, _ => true);
}

module.exports.ado = parseADO;

/**
 * @param {BaseClient} client
 * @param {{gcu:{C1: number, C2: number}, grc: Object, ain: Object}} params
 */
function parseADO(client, params) {
    if (!params) return;
    ain(client, params.ain);
    gcu(client, 0, params.gcu);
    grc(client, 0, params.grc);
}