import { useEffect, useState } from "react";
import axios from "axios";

const ArtistList = () => {

  const [artists, setArtists] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=> {
    const fetchArtists = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/Artists-detail");
        setArtists(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch artists : ", error);
      }
    };
    fetchArtists();
  }, []);

  if(loading) return <p className="p-6">Loading artists...</p>;


  return (
    <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
      <h2 className="text-xl font-semibold mb-4">Artists</h2>
      <table className="min-w-full border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{artist.name}</td>
              <td className="p-2 border">{artist.username}</td>
              <td className="p-2 border">{artist.category}</td>
              <td className="p-2 border">{artist.location}</td>
              <td className="p-2 border">{artist.email}</td>
              <td className="p-2 border">{artist.status}</td>
              <td className="p-2 border">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Deactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistList;
