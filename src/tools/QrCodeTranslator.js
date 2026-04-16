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

    translateQrAll(url) {
        let room = 11
        for (let i = 0; i < 4; i++) {
            if (dictionary[room][url] !== undefined) {
                return [room, dictionary[room][url]]
            }

            room = room + 1
        }
        console.error('Unknown QR code error')
        // return null
        return null
    }
}