import ProgressManager from "./tools/ProgressManager"
import QrCodeTranslator from "./tools/QrCodeTranslator"

export default function App() {

  // Progress Manager
  let options = {
    valueKey: 'player:progress'
  }
  let progressManager = new ProgressManager(options)

  // QR Translator
  let qrCodeTranslator = new QrCodeTranslator()

  return (
    <>
      <h1 className='text-4xl'>Test</h1>
    </>
  )
}