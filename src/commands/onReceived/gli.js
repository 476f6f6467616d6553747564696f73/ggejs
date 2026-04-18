const Lord = require("../../structures/Lord");

module.exports.name = "gli";
/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {{B: Object[], C: Object[]}} params
 */
module.exports.execute = function (client, errorCode, params) {
    const barons = parseLords(params.B).sort((l1, l2) => l1.pictureId - l2.pictureId);
    const commanders = parseLords(params.C).sort((l1, l2) => l1.pictureId - l2.pictureId);
    client.equipments._setCommandersAndBarons(barons, commanders);
}

/** @param {Object[]} data */
function parseLords(data) {
    return data.map(l => new Lord(l));
}