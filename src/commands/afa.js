const NAME = "afa";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    parseAFA(client, params);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @return {Promise<void>}
 */
module.exports.getAllianceFame = function (client) {
    const C2SAllianceGetFameVO = {};
    return require('.').baseSendCommand(client, NAME, C2SAllianceGetFameVO, callbacks, () => true);
}

module.exports.afa = parseAFA;

/**
 * @param {BaseClient} client
 * @param {{CF:number, HF:number}} params
 */
function parseAFA(client, params) {
    const myAlliance = client.clientUserData.myAlliance;
    myAlliance.allianceFamePoints = params.CF;
    myAlliance.allianceFamePointsHighestReached = params.HF;
}