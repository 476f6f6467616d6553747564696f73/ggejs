const NAME = "irc";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    parseIRC(client, params);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @return {Promise<void>}
 */
module.exports.collectTownsfolkGoods = function (client) {
    const C2SResourceCitizenVO = {};
    return require('.').baseSendCommand(client, NAME, C2SResourceCitizenVO, callbacks, () => true);
}

module.exports.irc = parseIRC;

/**
 * @param {BaseClient} client
 * @param {Object} params
 */
function parseIRC(client, params) {
    if (!(params?.G?.length >= 1)) return;
    setTimeout(async () => {
        module.exports.collectTownsfolkGoods(client).catch(_ => {
        });
    }, Math.random() * 1000);
}