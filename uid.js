const BitMax = 64
const BitShareID = 8
const BitSequence = 10
const BitTime = BitMax - BitShareID - BitSequence

const DefaultEpochTime = 1582304400000
const DefaultShareID = 10

class UID {
    constructor(config) {
        this.epochTime = config.epochTime
        this.shareID = config.shareID & (~(1 < BitShareID))
        this.sequence = 0
    }
    id() {
        let duration = Date.now() - this.epochTime & (~(1 << BitTime))
        let sequence = this.sequence + 1 & (~(1 << BitSequence))
        this.sequence = sequence
        const id = (BigInt(duration) << BigInt(BitShareID + BitSequence)) | (BigInt(sequence) << BigInt(BitShareID)) | (BigInt(this.shareID))
        return id.toString()
    }
}

const newUID = (config) => {
    if (!config) {
        config = {
            epochTime: DefaultEpochTime,
            shareID: DefaultShareID
        }
    }
    return new UID(config)
}

module.exports = {
    UID,
    newUID
}
