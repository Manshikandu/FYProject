import { useEffect, useState } from "react";
import axios from "axios";
import { Card,CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/Button";


export default function AdminVerifyArtists() {
  const [unverifiedArtists, setUnverifiedArtists] = useState([]);

  useEffect(() => {
    fetchUnverifiedArtists();
  }, []);

  const fetchUnverifiedArtists = async () => {
    try {
      const res = await axios.get("/api/admin/unverified-artists");
      setUnverifiedArtists(res.data);
    } catch (err) {
      console.error("Error fetching unverified artists", err);
    }
  };

  const handleVerify = async (id) => {
  try {
    await axios.patch(`/api/verify/verify-artist/${id}`);
    setUnverifiedArtists((prev) => prev.filter((a) => a._id !== id));
    alert("Artist verified successfully!"); // ✅ basic feedback
  } catch (err) {
    console.error("Error verifying artist", err);
    alert("Error verifying artist.");
  }
};


  return (
    <div className="grid gap-4">
      {unverifiedArtists.length === 0 ? (
        <p>No unverified artists found.</p>
      ) : (
        unverifiedArtists.map((artist) => (
          <Card key={artist._id} className="p-4">
            <CardContent className="space-y-2">
              <h2 className="text-xl font-semibold">{artist.name}</h2>
              <p>Email: {artist.email}</p>
              <p>Citizenship No: {artist.citizenshipNumber}</p>
              <div className="flex gap-4 flex-wrap">
                {artist.citizenshipPhoto && (
                  <img
                    src={artist.citizenshipPhoto}
                    alt="Citizenship"
                    className="w-40 h-40 object-cover border rounded"
                  />
                )}
                {artist.livePhoto && (
                  <img
                    src={artist.livePhoto}
                    alt="Live Photo"
                    className="w-40 h-40 object-cover border rounded"
                  />
                )}
                {artist.guardianDocument && (
                  <img
                    src={artist.guardianDocument}
                    alt="Guardian Doc"
                    className="w-40 h-40 object-cover border rounded"
                  />
                )}
              </div>
              <Button onClick={() => handleVerify(artist._id)}>Verify</Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
