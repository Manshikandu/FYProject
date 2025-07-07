import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Client = () => {

  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const res = await axios.get("http://localhost:3000/api/admin/Clients-detail");
      setClients(res.data);
    };
    fetchClients();
  }, []);

  return (
    <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
      <h2 className="text-xl font-semibold mb-4">Clients</h2>
      <table className="min-w-full border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Bookings</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{client.name}</td>
              <td className="p-2 border">{client.username}</td>
              <td className="p-2 border">{client.email}</td>
              <td className="p-2 border">{client.phone}</td>
              <td className="p-2 border">{client.location}</td>
              <td className="p-2 border">{client.bookingsCount}</td>
              <td className="p-2 border">{client.status}</td>
              <td className="p-2 border">
                <button onClick={() => navigate(`/admin/clients/${client._id}`)} className="text-blue-600 hover:underline mr-2">View Profile</button>
                <button className="text-red-600 hover:underline">Deactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Client;
