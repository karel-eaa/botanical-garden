import progressTemplate from './progressTemplate.json'

export default class ProgressManager {
    // Requires valueKey
    constructor(options) {
        this.valueKey = options.valueKey
        this.cache = this.getLocalStorageValue()
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
    recordScan(room, id) {
        this.cache[room][id] = true
        this.writeLocalStorageValue(this.cache)
    }
    isRoomCompleted(room) { return this.cache[room].every(Boolean) }

}