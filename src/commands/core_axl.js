const NAME = "core_axl";
/** @type {CommandCallback<{M:string, P:string}>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Array} params
 */
module.exports.execute = function (client, errorCode, params) {
    require('.').baseExecuteCommand(client, params, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @param {string} mail
 * @param {string} password
 * @param {boolean} newsletterSubscription
 * @return {Promise<{M: string, P: string, PB: string}>}
 */
module.exports.exportAccount = function (client, mail, password, newsletterSubscription = false) {
    const CoreC2SExportAccountVO = {P: password, M: mail, N: newsletterSubscription ? 1 : 0};
    return require('.').baseSendCommand(client, NAME, CoreC2SExportAccountVO, callbacks, () => true);
}