import ProgressManager from "./tools/ProgressManager";
import QrCodeTranslator from "./tools/QrCodeTranslator";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function App() {
  // Progress Manager
  let options = {
    valueKey: "player:progress",
  };
  let progressManager = new ProgressManager(options);

  // QR Translator
  let qrCodeTranslator = new QrCodeTranslator();

  return (
    <>
      <Scanner
        onScan={(result) => console.log(result)}
        onError={(error) => console.log(error?.message)}
      />
    </>
  );
}
