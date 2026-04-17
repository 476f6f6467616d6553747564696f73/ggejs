const CastlePosition = require("../structures/CastlePosition");
const {gaa} = require("./gaa");

const NAME = "fnt";
/** @type {CommandCallback<CastlePosition>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {{X:number, Y: number, gaa: Object}} params
 */
module.exports.execute = function (client, errorCode, params) {
    const nextTower = parseFNT(client, params);
    require('.').baseExecuteCommand(client, nextTower, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @return {Promise<CastlePosition>}
 */
module.exports.findNextTower = function (client) {
    const C2SFindNextTowerVO = {};
    return require('.').baseSendCommand(client, NAME, C2SFindNextTowerVO, callbacks, () => true);
}

module.exports.fnt = parseFNT;

/**
 * @param {BaseClient} client
 * @param {{X:number, Y: number, gaa: Object}} params
 * @returns {CastlePosition}
 */
function parseFNT(client, params) {
    gaa(client, params.gaa);
    const nextTower = new CastlePosition();
    nextTower.kingdomId = 10;
    nextTower.xPos = params.X;
    nextTower.yPos = params.Y;
    return nextTower;
}