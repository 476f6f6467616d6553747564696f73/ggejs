const NAME = "sie";
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
module.exports.getSubscriptionsInformation = function (client) {
    const C2SSubscriptionsInformationVO = {};
    return require('.').baseSendCommand(client, NAME, C2SSubscriptionsInformationVO, callbacks, () => true);
}