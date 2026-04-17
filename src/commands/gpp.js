const NAME = "gpp";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {any} params
 */
module.exports.execute = function (client, errorCode, params) {
    //TODO?
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @param {number} packageId
 * @param {boolean} resourceInformation
 * @return {Promise<void>}
 */
module.exports.getPackagePrize = function (client, packageId, resourceInformation) {
    const C2SGetPackagePrizeVO = {
        PKID: packageId,
        RI: resourceInformation ? 1 : 0,
    };
    return require('.').baseSendCommand(client, NAME, C2SGetPackagePrizeVO, callbacks, () => true);
}