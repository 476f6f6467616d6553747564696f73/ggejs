const NAME = "gcs";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    //const charactersStatus = parseGCS(client, params);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @return {Promise<void>}
 */
module.exports.getCharactersStatus = function (client) {
    const C2SGetCharactersStatusVO = {};
    return require('.').baseSendCommand(client, NAME, C2SGetCharactersStatusVO, callbacks, () => true);
}

module.exports.gcs = parseGCS;

/**
 * @param {BaseClient} client
 * @param {{}} params
 */
function parseGCS(client, params) {

}
