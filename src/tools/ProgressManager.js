import progressTemplate from './progressTemplate.json'
import QrCodeTranslator from './QrCodeTranslator'
import script from '../dialogues/scripts.json'

export default class ProgressManager {
    // Requires valueKey and array of scripts
    constructor(options) {
        this.valueKey = options.valueKey
        this.scripts = options.scripts
        this.cache = this.getLocalStorageValue()
        this.dialogueStatus = false
        this.currentScript = null
        this.currentRoom = null
        this.currentPlant = null
        this.qrCodeTranslator = new QrCodeTranslator()
        // if there is nothing in local storage
        // create new template for progress tracking
        if (this.cache == 'undefined' || this.cache == null) {
            this.writeLocalStorageValue(progressTemplate)
            this.cache = this.getLocalStorageValue(this.valueKey)
        }
    }

    // Local Storage methods
    getLocalStorageValue() { return JSON.parse(localStorage.getItem(this.valueKey)) }
    writeLocalStorageValue(data) { localStorage.setItem(this.valueKey, JSON.stringify(data)) }

    // Progress methods (old way, outdated)
    recordScan(raw) {
        let translatorResult = this.qrCodeTranslator.translateQrAll(raw)
        if (translatorResult != null) {
            this.cache[translatorResult[0]][translatorResult[1]] = true
            this.writeLocalStorageValue(this.cache)

            // update script for dialogue
            this.currentScript = script[translatorResult[0]][translatorResult[1]]
            return true
        }
        return false
    }

    recordSelectedScan(raw) {
        let translatorResult = this.qrCodeTranslator.translateQrAll(raw)
        if (translatorResult != null) {
            // in case of successful scan, check if user scans correct QR
            if (translatorResult[0] == this.currentRoom && translatorResult[1] == this.currentPlant) {
                this.cache[translatorResult[0]][translatorResult[1]] = true
                this.writeLocalStorageValue(this.cache)

                // update script for dialogue
                this.currentScript = script[translatorResult[0]][translatorResult[1]]

                // update next plant
                this.updateNextPlant(this.currentRoom)

                return true
            }
            return false
        }
    }

    isRoomCompleted(room) { return this.cache[room].every(Boolean) }

    // Dialogue methods
    isDialogueActive() { return this.dialogueStatus }

    getCurrentScript() { return this.currentScript }

    setStartDialogue(room) {
        this.currentScript = script[room]["start"]
        this.currentRoom = room
        this.updateNextPlant(room)
    }

    updateNextPlant(room) {
        // check if room is not finished
        if (this.isRoomCompleted(room)) {
            return null
        }

        this.cache = this.getLocalStorageValue()

        for (let i = 0; i < Object.keys(this.cache[room]).length; i++) {
            if (this.cache[room][i] == false) {
                this.currentPlant = i
                break
            }
        }
    }

    getCurrentPlant() {
        return [this.currentRoom, this.currentPlant]
    }

}