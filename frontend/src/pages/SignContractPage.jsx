import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "../lib/axios.js";

export default function SignContractPage() {
  const { bookingId } = useParams();
  const [contractUrl, setContractUrl] = useState(null);
  const sigCanvas = useRef(null);

  const handleSign = async () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please draw your signature.");
      return;
    }
    const signatureDataURL = sigCanvas.current.toDataURL();
    const res = await axios.post("/contracts/sign-artist", {
      bookingId,
      artistSignature: signatureDataURL,
    });
    setContractUrl(res.data.contractUrl);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Sign Contract</h1>
      <p className="font-medium">Draw your signature:</p>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 400, height: 150, className: "border bg-white mb-2" }}
      />
      <button onClick={handleSign} className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Sign Contract
      </button>
      {contractUrl && (
        <a href={contractUrl} target="_blank" rel="noopener noreferrer" className="underline text-green-500 block mt-4">
          View Signed Contract PDF
        </a>
      )}
    </div>
  );
}
