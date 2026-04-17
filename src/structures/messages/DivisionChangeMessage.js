const {readMessages} = require("../../commands/rms");
const EmpireError = require("../../tools/EmpireError");
const Localize = require("../../tools/Localize");
const BasicMessage = require("./BasicMessage");

class DivisionChangeMessage extends BasicMessage {
    /** @type {BaseClient} */
    #client = null;

    /**
     * @param {BaseClient} client
     * @param {Array} data
     */
    constructor(client, data) {
        super(client, data);
        this.#client = client;
    }

    get typeAffix() {
        if (this.divisionChangeType === -1) return "demotion";
        if (this.divisionChangeType === 0) return "maintain";
        if (this.divisionChangeType === 1) return "promotion";
    }

    async getDivisionChangeMessage() {
        try {
            const stringData = await readMessages(this.#client, this.messageId);
            const data = JSON.parse(stringData);
            this.startDivision = data["SD"];
            this.endDivision = data["ED"];
            this.rank = data["R"];
            this.points = data["P"];
            this.pointsToThreshold = data["PT"];
            return this
        } catch (e) {
            throw new EmpireError(this.#client, e);
        }
    }

    parseMetaData(client, metaArray) {
        super.parseMetaData(client, metaArray);
        this.eventId = parseInt(metaArray[0]);
        this.divisionChangeType = parseInt(metaArray[1]);
        this.isForAlliance = parseInt(metaArray[2]) === 1;
        this.senderName = Localize.text(client, `event_title_${this.eventId}`);
        this.subject = Localize.text(client, `division_${this.typeAffix}_popup_title`);
    }
}

module.exports = DivisionChangeMessage;