const {collectStartupLoginBonus} = require("./slc");

const NAME = "sli";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    if (params?.CC === 1) collectStartupLoginBonus(client).then()
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @return {Promise<void>}
 */
module.exports.getStartupLoginBonus = function (client) {
    const C2SStartupLoginBonusVO = {};
    return require('.').baseSendCommand(client, NAME, C2SStartupLoginBonusVO, callbacks, () => true);
}