import ProgressManager from "./tools/ProgressManager";
import QrCodeTranslator from "./tools/QrCodeTranslator";
import scripts from "./dialogues/scripts.json"
import DialoguePanel from "./components/DialoguePanel";
import { Scanner } from '@yudiel/react-qr-scanner'
import { useState } from "react";

export default function App() {
  // View Manager
  // 0 = map
  // 1 = photo/scan
  // 2 = dialogue
  let [view, setView] = useState(1)
  let [room, setRoom] = useState(-1)

  // Progress Manager
  let options = {
    valueKey: "player:progress",
    scripts
  }
  let progressManager = new ProgressManager(options)

  return (
    <>
      {view == 0 && <>

      </>}
      {view == 1 && <>

        <button onClick={() => {
          console.log(progressManager.getCurrentScript())
        }}>Test</button>
        <Scanner
          onScan={(result) => {
            progressManager.recordScan(result[0].rawValue.toString())
            console.log(result[0].rawValue.toString())
          }}
          onError={(error) => console.log(error?.message)}
        />
      </>}
    </>
  );
}
