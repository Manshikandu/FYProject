import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "../lib/axios.js";

export default function GenerateContractPage() {
  const { bookingId } = useParams();
  const [wage, setWage] = useState("");
  const [contractUrl, setContractUrl] = useState(null);
  const sigCanvas = useRef(null);

  const handleGenerate = async () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide your signature.");
      return;
    }
    const signatureDataURL = sigCanvas.current.toDataURL();
    const res = await axios.post("/contracts/generate-client", {
      bookingId,
      wage,
      signatureImage: signatureDataURL,
    });
    setContractUrl(res.data.contractUrl);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Generate Contract</h1>
      <input
        type="number"
        placeholder="Enter Wage"
        value={wage}
        onChange={(e) => setWage(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <p className="font-medium">Draw your signature:</p>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 400, height: 150, className: "border bg-white mb-2" }}
      />
      <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Generate Draft Contract
      </button>
      {contractUrl && (
        <a href={contractUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-500 block mt-4">
          View Contract PDF
        </a>
      )}
    </div>
  );
}


