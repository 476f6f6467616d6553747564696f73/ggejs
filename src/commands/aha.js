const NAME = "aha";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @param {number} kingdomId
 * @return {Promise<void>}
 */
module.exports.allianceHelpAll = function (client, kingdomId = 15) {
    const C2SAllianceHelpAllVO = {KID: kingdomId};
    return require('.').baseSendCommand(client, NAME, C2SAllianceHelpAllVO, callbacks, () => true);
}