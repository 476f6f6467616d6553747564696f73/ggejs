const NAME = "mpe";
/** @type {CommandCallback<MercenariesCampMissionItem[]>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {{NM:number, M:{D:number, RD:number, P:number, Q:number, S:number, R:[], ID: number}[]}} params
 */
module.exports.execute = function (client, errorCode, params) {
    const missions = parseMPE(client, params);
    require('.').baseExecuteCommand(client, missions, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @param {number} missionId
 * @return {Promise<MercenariesCampMissionItem[]>}
 */
module.exports.getMercenariesPackage = function (client, missionId) {
    const C2SMercenariesPackageVO = {MID: missionId};
    return require('.').baseSendCommand(client, NAME, C2SMercenariesPackageVO, callbacks, () => true);
}

module.exports.mpe = parseMPE;

/**
 * @param {BaseClient} client
 * @param {{NM:number, M:{D:number, RD:number, P:number, Q:number, S:number, R:[], ID: number}[]}} params
 * @returns {MercenariesCampMissionItem[]}
 */
function parseMPE(client, params) {
    if (!params?.M) return [];
    // mercenariesCampData.remainingSecondsUntilNextMissions = params.NM;
    const missions = params.M.map(m => {
        return /* MercenariesCampMissionItemVO */{
            missionId: m.ID,
            duration: m.D,
            remainingDuration: m.RD,
            price: m.P,
            quality: m.Q,
            state: m.S,
            rewards: m.R,
            rewardsChanged: true,
        }
    });
    // mercenariesCampData.missions = missions;
    return missions;
}