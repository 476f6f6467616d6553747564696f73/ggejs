const EmpireError = require("../tools/EmpireError");

const NAME = "gbd";
/** @type {CommandCallback<void>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    parseGBD(client, params);
    require('.').baseExecuteCommand(client, undefined, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @returns {Promise<void>}
 */
module.exports.registerGbdListener = function (client) {
    return new Promise((resolve, reject) => {
        const id = require('crypto').randomUUID();
        callbacks.push({id, clientId: client._id, match: () => true, resolve, reject});
        setTimeout(() => {
            const i = callbacks.findIndex(c => c.id === id);
            if (i !== -1) callbacks.splice(i, 1);
            resolve();
        }, 1000);
    });
}

module.exports.gbd = parseGBD;

/**
 * @param {BaseClient} client
 * @param {{WR: number, LA: number, ch: {HID: number}, [p: string]: Object}} params
 * @return {Player}
 */
function parseGBD(client, params) {
    client.clientUserData.wasResetted = params.WR === 1;
    client.clientUserData.lastUserActivity = params.LA;
    client.clientUserData.selectedHeroID = params.ch["HID"];
    // castleUserData.parse_GAL(paramObj.gal);
    // parseNestedJsonResponse("gcu");
    // parseNestedJsonResponse("gho");
    // parseNestedJsonResponse("gxp");
    require('./gpi').gpi(client, params.gpi);
    // parseNestedJsonResponse("upi");
    // parseNestedJsonResponse("ufa");
    // parseNestedJsonResponse("ufp");
    // parseNestedJsonResponse("uar");
    // parseNestedJsonResponse("gem");
    // parseNestedJsonResponse("gpf");
    // parseNestedJsonResponse("gms");
    // parseNestedJsonResponse("gpc");
    require('./gcl').gcl(client, params.gcl);
    // parseNestedJsonResponse("kgv");
    // parseNestedJsonResponse("uap");
    // parseNestedJsonResponse("gri");
    // parseNestedJsonResponse("gkl");
    // parseNestedJsonResponse("vip");
    // parseNestedJsonResponse("opt");
    // parseNestedJsonResponse("pgl");
    // parseNestedJsonResponse("boi");
    // parseNestedJsonResponse("sei");
    // parseNestedJsonResponse("tei");
    // parseNestedJsonResponse("txi");
    // parseNestedJsonResponse("rei");
    // parseNestedJsonResponse("kpi");
    require('./mpe').mpe(client, params.mpe);
    // parseNestedJsonResponse("vli");
    // parseNestedJsonResponse("dql");
    // parseNestedJsonResponse("gli");
    // parseNestedJsonResponse("drt");
    // parseNestedJsonResponse("tmp");
    // parseNestedJsonResponse("sce");
    // parseNestedJsonResponse("esl");
    require('./ggm').ggm(client, params.ggm);
    // parseNestedJsonResponse("lts");
    // parseNestedJsonResponse("skl");
    // parseNestedJsonResponse("rww");
    // parseNestedJsonResponse("dcl");
    // parseNestedJsonResponse("ahl");
    // parseNestedJsonResponse("gai");
    // if (!_loc2_) {
    //     parseNestedJsonResponse("mre");
    //     parseNestedJsonResponse("gml");
    // }
    // parseNestedJsonResponse("sin");
    // parseNestedJsonResponse("nrf");
    // parseNestedJsonResponse("gatp");
    // parseNestedJsonResponse("bie");
    // parseNestedJsonResponse("ree");
    // parseNestedJsonResponse("DTS");
    // parseNestedJsonResponse("mvf");
    // parseNestedJsonResponse("pre");
    // parseNestedJsonResponse("gls");
    // parseNestedJsonResponse("mcd");
    for (const x in params) {
        const msg = JSON.stringify(params[x]);
        switch (x.toLowerCase()) {
            case "WR".toLowerCase():
            case "LA".toLowerCase():
            case "ch":
            case "gpi":
            case "gcl":
            case "mpe":
            case "ggm":
                // Handled before for-loop
                break;
            case "gal":
            case "gcu":
            case "gho":
            case "gxp":
            case "upi":
            case "ufa":
            case "ufp":
            case "uar":
            case "gem":
            case "gpf":
            case "gms":
            case "gpc":
            case "kgv":
            case "uap":
            case "gri":
            case "gkl":
            case "vip":
            case "opt":
            case "pgl":
            case "boi":
            case "sei":
            case "tei":
            case "txi":
            case "rei":
            case "kpi":
            case "vli":
            case "dql":
            case "gli":
            case "drt":
            case "tmp":
            case "sce":
            case "esl":
            case "lts":
            case "skl":
            case "rww":
            case "dcl":
            case "ahl":
            case "gai":
            case "mre":
            case "gml":
            case "sin":
            case "nrf":
            case "gatp":
            case "bie":
            case "ree":
            case "DTS".toLowerCase():
            case "mvf":
            case "pre":
            case "gls":
            case "mcd":
//#region not handled in gbd source code
            case "cpi":
            case "gas":
            case "gabgap":
            case "gmu":
            case "sne":
//#endregion
                try {
                    client.logger.t('[RECEIVED-GBD]', x, '%', msg.substring(0, Math.min(140, msg.length)));
                    try {
                        require(`./${x.toLowerCase()}`)[x.toLowerCase()](client, params[x]);
                        client.logger.d("[GBD]", x, "should be handled outside switch statement, but it's not.")
                    } catch (e) {
                        require(`./onReceived/${x.toLowerCase()}`).execute(client, 0, params[x]);
                    }
                } catch (e) {
                    client.logger.e("[GBD]", e);
                }
                break;
//#region not handled in gbd source code
            case "atl":
            case "dsd":
            case "fcs":
            case "gll":
            case "scd":
                //Not implemented in game
                client.logger.t('[RECEIVED-GBD-not_implemented]', x, '%', msg.substring(0, Math.min(140, msg.length)));
                break;
            case "fii":
            //Not implemented in game: Friend invite info
            case "thi":
            //Not implemented in game: Treasure hunt info
            case "wbie":
                //Not implemented in game: Welcome back message info event
                client.logger.t('[RECEIVED-GBD-not_implemented]', x, '%', msg.substring(0, Math.min(140, msg.length)));
                break;
            default:
                client.logger.t('[GBD Unknown] Unknown part in gbd command:', x, msg);
                break;
//#endregion
        }
    }
    setTimeout(() => handlePostGBDCommandInNextFrame(client), 10);
}

/** @param {BaseClient} client */
function handlePostGBDCommandInNextFrame(client) {
    /* todo
     *  var _loc1_:LockConditionVO = null;
     *  var _loc2_:Boolean = autoReconnectionService.isAutoReconnected;
     *  if(!_loc2_)
     *  {
     *     restoreTutorialIfRuined();
     *  }
     *  enableIAPmanagerStartupIntervalSignal.dispatch(false);
     *  configureNotificationsSignal.dispatch();
     *  worldmapCameraData.currentCenteredWorldMapObject = castleListService.getMainCastleByKingdomId(kingdomData.activeKingdomID);
     *  if (!_loc2_) {
     *      startTutorialSignal.dispatch(true);
     *  }
     *  else {
     *      castleRemoveLoadingScreenSignal.dispatch();
     *  }
     *  restoreLastSessionGameStateSignal.dispatch();
     *  initMarketingTracking();
     *  helpshiftLoginSignal.dispatch();
     *  trackDevice();
     *  trackDisconnection();
     */
    requestSubscriptionsData(client).catch(e => client.logger.w(new EmpireError(client, e)));
    /*todo
     * directCommandMap.map(InitPaymentShopCommand).execute();
     * if (!featureRestrictionsModel.isFeatureRestrictedWithType("accountCode",FeatureRestrictionType.HIDDEN)) {
     *    directCommandMap.map(MobileWebShopGetAccountIdCommand).execute();
     * }
     * sendInstallerPackageSignal.dispatch();
     * requestTimeForRuinPushNotification();
     */
    requestLoginBonusInfo(client).catch(e => client.logger.w(new EmpireError(client, e)));
    requestMessagesData(client).catch(e => client.logger.w(new EmpireError(client, e)));
    requestAllianceData(client).catch(e => client.logger.w(new EmpireError(client, e)));
    requestBookmarkData(client).catch(e => client.logger.w(new EmpireError(client, e)));
    requestConstructionItemInventory(client).catch(e => client.logger.w(new EmpireError(client, e)));
    requestGeneralsInnData(client).catch(e => client.logger.w(new EmpireError(client, e)));
    /* todo
         showAccountForcedDialog();
         directCommandMap.map(SendDeviceMetaDataCommand).execute();
         gameStatusModel.gameIsListening = true;
         stopCachingJsonCommandsSignal.dispatch();
         connectionLostModel.reset();
         if (lockConditionModel.hasCondition()) {
            _loc1_ = lockConditionModel.hasCondition();
            debug("client has lock condition in GBD:",_loc1_.originalConditionIds + ", find the original reason where it came from and clean");
            lockConditionModel.conditionComplete();
         }
     */
}

/** @param {BaseClient} client */
async function requestGeneralsInnData(client) {
    await require('./gcs').getCharactersStatus(client);
}

/** @param {BaseClient} client */
async function requestBookmarkData(client) {
    await require('./gbl').getBookmarkList(client);
}

/** @param {BaseClient} client */
async function requestConstructionItemInventory(client) {
    await require('./gii').getConstructionItemInventory(client);
}

/** @param {BaseClient} client */
async function requestMessagesData(client) {
    await require('./sne').showMessages(client);
}

/** @param {BaseClient} client */
async function requestAllianceData(client) {
    if (client.clientUserData.allianceId >= 0) {
        await require('./ain').getAllianceInfo(client, client.clientUserData.allianceId);
        await require('./afa').getAllianceFame(client);
        await require('./acl').getAllianceChatHistory(client);
    }
}

/** @param {BaseClient} client */
async function requestSubscriptionsData(client) {
    await require('./sie').getSubscriptionsInformation(client);
}

/** @param {BaseClient} client */
async function requestLoginBonusInfo(client) {
    await require('./alb').getLoginBonus(client);
    require('./sli').getStartupLoginBonus(client).catch(e => e);
}