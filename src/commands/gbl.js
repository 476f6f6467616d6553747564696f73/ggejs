const NAME = "gbl";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    //const bookmarkList = parseGBL(client, params);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @return {Promise<void>}
 */
module.exports.getBookmarkList = function (client) {
    const C2SBookmarkGetListVO = {};
    return require('.').baseSendCommand(client, NAME, C2SBookmarkGetListVO, callbacks, () => true);
}

module.exports.gbl = parseGBL;

/**
 * @param {BaseClient} client
 * @param {{}} params
 */
function parseGBL(client, params) {

}
