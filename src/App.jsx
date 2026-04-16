import ProgressManager from "./tools/ProgressManager";
import QrCodeTranslator from "./tools/QrCodeTranslator";
import scripts from "./dialogues/scripts.json"
import DialoguePanel from "./components/DialoguePanel";
import { Scanner } from '@yudiel/react-qr-scanner'
import { useMemo, useState } from "react";
import Map from "./components/Map";

export default function App() {
  // View Manager
  // 0 = map
  // 1 = photo/scan
  // 2 = dialogue
  let [view, setView] = useState(1)
  let [room, setRoom] = useState(null)

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
        <Map setView={setView} setStartDialogue={(room) => progressManager.setStartDialogue(room)} />
      </>}
      {/* Photo / Scan */}
      {view == 1 && <>

        <button onClick={() => {
          console.log(progressManager.getCurrentScript())
        }}>Test</button>
        <div className="absolute top-[144px] left-1/2 -translate-x-1/2 z-100 bg-secondary-1 px-[16px] rounded-[20px] w-[300px]">
          <p className="text-[17px] text-center text-mint-cream">Place the QR code inside the frame</p>
        </div>
        <Scanner
          components={{ finder: false }}
          styles={{
            container: {
              width: '100vw',
              height: '100dvh',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 10,
            },
            video: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            },
          }}
          onScan={(result) => {
            let scanResult = progressManager.recordScan(result[0].rawValue.toString());
            console.log(result[0].rawValue.toString());
            if (scanResult) {
              setView(2);
            }
          }}
          onError={(error) => console.log(error?.message)}
        >
          {(() => {
            const size = 220, len = 36, thick = 3, r = 6;
            const arms = (isTop, isLeft) => (
              <div style={{
                position: 'absolute',
                width: len, height: len,
                ...(isTop ? { top: 0 } : { bottom: 0 }),
                ...(isLeft ? { left: 0 } : { right: 0 }),
              }}>
                <div style={{
                  position: 'absolute', width: len, height: thick,
                  backgroundColor: 'white',
                  ...(isTop ? { top: 0 } : { bottom: 0 }),
                  ...(isLeft ? { left: 0 } : { right: 0 }),
                  borderRadius: `${isTop && isLeft ? r : 0}px ${isTop && !isLeft ? r : 0}px ${!isTop && !isLeft ? r : 0}px ${!isTop && isLeft ? r : 0}px`,
                }} />
                <div style={{
                  position: 'absolute', width: thick, height: len,
                  backgroundColor: 'white',
                  ...(isTop ? { top: 0 } : { bottom: 0 }),
                  ...(isLeft ? { left: 0 } : { right: 0 }),
                  borderRadius: `${isTop && isLeft ? r : 0}px ${isTop && !isLeft ? r : 0}px ${!isTop && !isLeft ? r : 0}px ${!isTop && isLeft ? r : 0}px`,
                }} />
              </div>
            );
            return (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: size, height: size }}>
                  {arms(true, true)}
                  {arms(true, false)}
                  {arms(false, true)}
                  {arms(false, false)}
                </div>
              </div>
            );
          })()}
        </Scanner>
      </>}
      {/* Dialogue */}
      {view == 2 && <>
        <DialoguePanel script={progressManager.getCurrentScript()} setView={setView} />
        <button onClick={() => setView(1)}>Back</button>
      </>}
    </>
  );
}
