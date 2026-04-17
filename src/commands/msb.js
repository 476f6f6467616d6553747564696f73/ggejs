const {execute: sce} = require("./onReceived/sce");
const {execute: scl} = require("./onReceived/scl");

const NAME = "msb";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {{sce: [string, number][], scl: {OIDL: number[], SSC: number}}} params
 */
module.exports.execute = function (client, errorCode, params) {
    if (params?.sce) sce(client, errorCode, params.sce);
    if (params?.scl) scl(client, errorCode, params.scl);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @param {string} minuteSkipType
 * @param {number} objectId
 * @return {Promise<void>}
 */
module.exports.minuteSkipBuilding = function (client, minuteSkipType, objectId) {
    const C2SMinuteSkipBuildingVO = {
        MST: minuteSkipType,
        OID: objectId,
    };
    return require('.').baseSendCommand(client, NAME, C2SMinuteSkipBuildingVO, callbacks, () => true);
}