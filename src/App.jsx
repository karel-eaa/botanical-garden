import ProgressManager from "./tools/ProgressManager";
import QrCodeTranslator from "./tools/QrCodeTranslator";
import scripts from "./dialogues/scripts.json"
import DialoguePanel from "./components/DialoguePanel";
import { Scanner } from '@yudiel/react-qr-scanner'
import { useMemo, useState } from "react";

export default function App() {
  // View Manager
  // 0 = map
  // 1 = photo/scan
  // 2 = dialogue
  let [view, setView] = useState(1)

  // Progress Manager
  let options = {
    valueKey: "player:progress",
    scripts
  }
  const progressManager = useMemo(() => new ProgressManager(options), [])

  return (
    <>
      {/* Map */}
      {view == 0 && <>

      </>}
      {/* Photo / Scan */}
      {view == 1 && <>

        <button onClick={() => {
          console.log(progressManager.getCurrentScript())
        }}>Test</button>
        <Scanner
          onScan={(result) => {
            let scanResult = progressManager.recordScan(result[0].rawValue.toString())
            console.log(result[0].rawValue.toString())
            if(scanResult) {
              setView(2)
            }
          }}
          onError={(error) => console.log(error?.message)}
        />
      </>}
      {/* Dialogue */}
      {view == 2 && <>
        <DialoguePanel script={progressManager.getCurrentScript()} setView={setView} />
        <button onClick={() => setView(1)}>Back</button>
      </>}
    </>
  );
}
