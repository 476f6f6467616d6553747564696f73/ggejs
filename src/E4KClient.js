'use strict'

const {NetworkInstance} = require('e4k-data');
const BaseClient = require("./BaseClient");
const ExternalClient = require("./ExternalClient");
const {verifyLoginData} = require('./commands/core_avl');
const {exportAccount} = require("./commands/core_axl");
const {login} = require('./commands/core_lga');
const {requestLoginData} = require("./commands/core_rld");
const {registerGbdListener} = require("./commands/gbd");
const {generateLoginToken} = require('./commands/glt');
const EmpireError = require("./tools/EmpireError");
const {ConnectionStatus, Events} = require("./utils/Constants");

class E4KClient extends BaseClient {
    #name = ""
    #password = ""
    /** @type {ExternalClient | null} */
    _externalClient = null;

    /**
     * @param {string} mail
     * @param {string} password
     * @param {NetworkInstance} serverInstance
     */
    static async registerNewAccount(mail, password, serverInstance) {
        const client = new E4KClient(serverInstance);
        await client.socketManager.connect();
        const tmpLoginData = await client.requestLoginData();
        await client._login(tmpLoginData.M, tmpLoginData.P);
        await client.safeAccount(mail, password);
        return client;
    }

    /**
     * @param {string} name
     * @param {string} password
     */
    async connect(name, password) {
        if (this.socketManager.connectionStatus === ConnectionStatus.Connected) return this;
        await this.socketManager.connect();
        const loginData = await this._verifyLoginData(name, password);
        await this._login(loginData.M, loginData.P);
        (async () => {
            try {
                await this._sendPingPong();
                this.emit(Events.CONNECTED);
            } catch (e) {
                this.logger.w(e);
            }
        })().then()
        return this;
    }

    /** @param {number} serverType */
    async getExternalClient(serverType = this._externalClient?.socketManager?.serverType) {
        if (this._externalClient?.socketManager?.connectionStatus === ConnectionStatus.Connected) return this._externalClient;

        if (this._externalClient != null) {
            this._externalClient.reconnectTimeout = -1;
            await this._externalClient.socketManager.disconnect();
            this._externalClient = null
        }

        const loginToken = await this._generateExternalServerLoginToken(serverType);
        /** @type {NetworkInstance} */
        const serverInstance = {
            server: loginToken.ip,
            port: loginToken.port,
            zone: loginToken.zone,
            zoneId: loginToken.zoneId,
            value: loginToken.instanceId,
        }
        this._externalClient = new ExternalClient(serverInstance);
        this._externalClient.logger.verbosity = this.logger.verbosity;
        this._externalClient.reconnectTimeout = this.socketManager.reconnectTimeout;
        await this._externalClient.connect(loginToken.token);
        this.emit(Events.EXTERNAL_CLIENT_READY, this._externalClient);
        return this._externalClient;
    }

    async requestLoginData() {
        try {
            return await requestLoginData(this);
        } catch (errorCode) {
            throw new EmpireError(this, errorCode);
        }
    }

    /**
     * @param {string} mail
     * @param {string} password
     */
    async safeAccount(mail, password) {
        try {
            const loginData = await exportAccount(this, mail, password);
            this.#name = loginData.M;
            this.#password = loginData.P;
            return loginData;
        } catch (errorCode) {
            const overrideTextId = (() => {
                switch (errorCode - 10005) {
                    case 6:
                        return "generic_register_passwordwrong_copy";
                    case 12:
                    case 13:
                        return "generic_register_emailwrong_copy";
                    case 14:
                        return "error_mail_exists";
                    default:
                        return '';
                }
            })();
            throw new EmpireError(this, errorCode, overrideTextId);
        }
    }

    /**
     * @param {string} name
     * @param {string} password
     */
    async _login(name, password) {
        const gbdListener = registerGbdListener(this);
        this.#name = name;
        this.#password = password;
        const e = await login(this, name, password);
        if (e.error !== "") {
            this.bannedUntil = e.args.length === 0 ? new Date(0) : e.args[0];
            throw new EmpireError(this, e.errorCode, e.error, ...e.args);
        }
        this.bannedUntil = new Date(0);
        await gbdListener;
    }

    /**
     * @param {string} name
     * @param {string} password
     */
    async _verifyLoginData(name, password) {
        try {
            const loginData = await verifyLoginData(this, name, password);
            this.#name = loginData.M;
            this.#password = loginData.P;
            return loginData;
        } catch (errorCode) {
            const overrideTextId = (() => {
                switch (errorCode) {
                    case -1:
                        return 'generic_alert_connection_lost_copy';
                    case 10011:
                    case 10012:
                        return 'generic_login_wronglogin';
                    default:
                        return '';
                }
            })();
            throw new EmpireError(this, errorCode, overrideTextId);
        }
    }

    async _reconnect() {
        const bannedSecLeft = this.bannedUntil.getTime() - Date.now();
        await new Promise(res => setTimeout(res, Math.max(bannedSecLeft, 0)));
        return await this.connect(this.#name, this.#password);
    }

    /** @param {number} serverType */
    async _generateExternalServerLoginToken(serverType) {
        try {
            return await generateLoginToken(this, serverType);
        } catch (errorCode) {
            throw new EmpireError(this, errorCode);
        }
    }
}

module.exports = E4KClient;