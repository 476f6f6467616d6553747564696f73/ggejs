const {execute: gui} = require("./onReceived/gui");

const NAME = "sbp";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {any} params
 */
module.exports.execute = function (client, errorCode, params) {
    /*
       var _loc4_:int = int(paramObj["PID"]);
       var _loc2_:int = int(paramObj["AMT"]);
       var _loc3_:PackageStaticVO = packagesStaticData.getPackageByID(_loc4_);
       if(_loc3_.packageType == PackageTypeEnum.TOOL)
       {
          instantToolBoughtSignal.dispatch(new InstantToolBoughtVO(_loc3_.wodID,_loc2_));
       }
       userData.parse_GCU(paramObj.gcu);
       parseNestedJsonResponse("gui");
       parseNestedJsonResponse("grc");
       spyData.parse_CPI(paramObj.cpi);
       parserFactory.getParser("sin").parse(paramObj.sin);
       parserFactory.getParser("vip").parse(paramObj.vip);
       var _loc5_:EventPackageBoughtSignalVO = new EventPackageBoughtSignalVO();
       _loc5_.packageId = _loc4_;
       _loc5_.amount = _loc2_;
       eventPackageBoughtSignal.dispatch(_loc5_);
      */
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 *
 * @param {BaseClient} client
 * @param {number} packageId
 * @param {number} amount
 * @param {number} kingdomId
 * @param {number} typeId
 * @param {number} buyType
 * @param {number} areaId
 * @param {number} vipPackage
 * @param {number} proposedC2
 * @param {boolean} payResourcesWithRubies
 * @return {Promise<void>}
 */
module.exports.buyEventPackage = function (client, packageId = -1, amount = 1, kingdomId = -1, typeId = -1, buyType = -1, areaId = -1, vipPackage = -1, proposedC2 = -1, payResourcesWithRubies = false) {
    const C2SBuyEventPackageVO = {
        PID: packageId,
        AMT: amount,
        KID: kingdomId,
        TID: typeId,
        BT: buyType,
        AID: areaId,
        VP: vipPackage,
        PC2: proposedC2,
        PWR: payResourcesWithRubies ? 1 : 0
    };
    return require('.').baseSendCommand(client, NAME, C2SBuyEventPackageVO, callbacks, () => true);
}