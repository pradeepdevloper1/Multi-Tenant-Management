import React, { useState, useEffect } from 'react';
import { getOrganizations, createOrganization, updateOrganization, deleteOrganization } from '../services/api';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [newOrganization, setNewOrganization] = useState({ name: '' });
  const [editingOrganization, setEditingOrganization] = useState(null);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    const data = await getOrganizations();
    setOrganizations(data);
  };

  const handleCreateOrganization = async () => {
    await createOrganization(newOrganization);
    setNewOrganization({ name: '' });
    fetchOrganizations();
  };

  const handleUpdateOrganization = async () => {
    await updateOrganization(editingOrganization.organizationId, editingOrganization);
    setEditingOrganization(null);
    fetchOrganizations();
  };

  const handleDeleteOrganization = async (id) => {
    await deleteOrganization(id);
    fetchOrganizations();
  };

  return (
    <div>
      <h1>Organizations</h1>
      <div>
        <input
          type="text"
          placeholder="Organization Name"
          value={newOrganization.name}
          onChange={(e) => setNewOrganization({ name: e.target.value })}
        />
        <button onClick={handleCreateOrganization}>Create</button>
      </div>
      <ul>
        {organizations.map((org) => (
          <li key={org.organizationId}>
            {editingOrganization?.organizationId === org.organizationId ? (
              <div>
                <input
                  type="text"
                  value={editingOrganization.name}
                  onChange={(e) => setEditingOrganization({ ...editingOrganization, name: e.target.value })}
                />
                <button onClick={handleUpdateOrganization}>Save</button>
                <button onClick={() => setEditingOrganization(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {org.name}
                <button onClick={() => setEditingOrganization(org)}>Edit</button>
                <button onClick={() => handleDeleteOrganization(org.organizationId)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organizations;