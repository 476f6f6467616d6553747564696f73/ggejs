const NAME = "slc";
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
 * @return {Promise<void>}
 */
module.exports.collectStartupLoginBonus = function (client) {
    const C2SStartupLoginBonusCollectVO = {};
    return require('.').baseSendCommand(client, NAME, C2SStartupLoginBonusCollectVO, callbacks, () => true);
}