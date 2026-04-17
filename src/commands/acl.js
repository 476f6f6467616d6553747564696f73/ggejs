const ChatMessage = require("../structures/ChatMessage");
const {execute: acv} = require("./onReceived/acv");

const NAME = "acl";
/** @type {CommandCallback<ChatMessage[]>[]}*/
const callbacks = [];

module.exports.name = NAME;

/**
 * @param {BaseClient} client
 * @param {number} errorCode
 * @param {Object} params
 */
module.exports.execute = function (client, errorCode, params) {
    const chatHistory = parseACL(client, params);
    require('.').baseExecuteCommand(client, chatHistory, errorCode, params, callbacks);
}

/**
 * @param {BaseClient} client
 * @return {Promise<ChatMessage[]>}
 */
module.exports.getAllianceChatHistory = function (client) {
    const C2SAllianceChatHistoryVO = {};
    return require('.').baseSendCommand(client, NAME, C2SAllianceChatHistoryVO, callbacks, () => true);
}

module.exports.acl = parseACL;

/**
 * @param {BaseClient} client
 * @param {{CM:Object[], acv: {H:number}}} params
 * @return {ChatMessage[]}
 */
function parseACL(client, params) {
    acv(client, 0, params.acv);
    return params.CM.map(m => {
        const msg = new ChatMessage(client, m);
        client.emit("chatMessage", msg);
        return msg
    })
}