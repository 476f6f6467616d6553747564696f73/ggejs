const {alb} = require("./alb");

const NAME = "clb";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    //const loginBonus = parseCLB(client, params);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @param {{rewards: [{dailyRewards:{rewards:[]}}], activeDay: number}} loginBonusData
 * @param {number} dailyRewardIndex
 * @param {"ALLI" | "VIP" | ""} specialRewardType
 * @return {Promise<void>}
 */
module.exports.catchLoginBonus = function (client, loginBonusData, dailyRewardIndex = -1, specialRewardType = "") {
    const C2SCatchLoginBonusVO = {I: null, ID: -1, SP: null};
    if (dailyRewardIndex !== -1) {
        let id = -1;
        const reward = loginBonusData.rewards[loginBonusData.activeDay % 7].dailyRewards.rewards[dailyRewardIndex];
        if (reward.type === GameAssetEnumerator.UNIT) {
            id = reward.wodID;
        }
        C2SCatchLoginBonusVO.I = reward.type.serverName;
        C2SCatchLoginBonusVO.ID = id;
    } else if (specialRewardType !== "") {
        if (specialRewardType === "ALLI" && client.clientUserData.allianceId === -1) return;
        if (specialRewardType === "VIP" && !client.clientUserData.isVipActive) return;
        C2SCatchLoginBonusVO.SP = specialRewardType;
    }
    return require('.').baseSendCommand(client, NAME, C2SCatchLoginBonusVO, callbacks, () => true);
}

module.exports.clb = parseCLB;

/**
 * @param {BaseClient} client
 * @param {{alb:{D:number, R:Object[]}}} params
 */
function parseCLB(client, params) {
    if (!params) return;
    return alb(client, params.alb)
}
