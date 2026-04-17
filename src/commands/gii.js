const NAME = "gii";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    //const constructionItemInventory = parseGII(client, params);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @return {Promise<void>}
 */
module.exports.getConstructionItemInventory = function (client) {
    const C2SGetConstructionItemInventoryVO = {};
    return require('.').baseSendCommand(client, NAME, C2SGetConstructionItemInventoryVO, callbacks, () => true);
}

module.exports.gii = parseGII;

/**
 * @param {BaseClient} client
 * @param {{}} params
 */
function parseGII(client, params) {

}
