import React, { useState, useEffect } from 'react';
import { getClients, createClient, updateClient, deleteClient } from '../services/api';

const Clients = ({ organizationId }) => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', organizationId });
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    if (organizationId) {
      fetchClients();
    }
  }, [organizationId]);

  const fetchClients = async () => {
    const data = await getClients(organizationId);
    setClients(data);
  };

  const handleCreateClient = async () => {
    await createClient(organizationId, newClient);
    setNewClient({ name: '', organizationId });
    fetchClients();
  };

  const handleUpdateClient = async () => {
    await updateClient(organizationId, editingClient.clientId, editingClient);
    setEditingClient(null);
    fetchClients();
  };

  const handleDeleteClient = async (clientId) => {
    await deleteClient(organizationId, clientId);
    fetchClients();
  };

  return (
    <div>
      <h2>Clients</h2>
      <div>
        <input
          type="text"
          placeholder="Client Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
        />
        <button onClick={handleCreateClient}>Create</button>
      </div>
      <ul>
        {clients.map((client) => (
          <li key={client.clientId}>
            {editingClient?.clientId === client.clientId ? (
              <div>
                <input
                  type="text"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                />
                <button onClick={handleUpdateClient}>Save</button>
                <button onClick={() => setEditingClient(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {client.name}
                <button onClick={() => setEditingClient(client)}>Edit</button>
                <button onClick={() => handleDeleteClient(client.clientId)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;