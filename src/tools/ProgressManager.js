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
    
    // Progress methods
    recordScan(raw) {
        let translatorResult = this.qrCodeTranslator.translateQrAll(raw)
        if(translatorResult != null) {
            this.cache[translatorResult[0]][translatorResult[1]] = true
            this.writeLocalStorageValue(this.cache)

            // update script for dialogue
            this.currentScript = script[translatorResult[0]][translatorResult[1]]
            return true
        }
        return false
    }
    isRoomCompleted(room) { return this.cache[room].every(Boolean) }

    // Dialogue methods
    isDialogueActive() { return this.dialogueStatus }

    getCurrentScript() { return this.currentScript }

}