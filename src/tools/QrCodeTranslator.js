import dictionary from "./dictionary.json"

export default class QrCodeTranslator {
    constructor() {
        this.dictionary = structuredClone(dictionary)
    }

    translateQr(room, url) {
        try {
            return dictionary[room][url]
        } catch {
            return null
        }
    }
}