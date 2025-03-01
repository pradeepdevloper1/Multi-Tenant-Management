import React, { useState, useEffect } from 'react';
import { getOrganizations, getClients,getClientsByOrganizationId, getProjects } from '../services/api';

const Reports = () => {
  const [organizations, setOrganizations] = useState([]); // State for organizations
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch organizations when the component mounts
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations(); // Fetch organizations from the API
        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  // Fetch clients when an organization is selected
  const fetchClients = async (organizationId) => {
    try {
      const data = await getClientsByOrganizationId(organizationId); // Fetch clients for the selected organization
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  // Fetch projects when a client is selected
  const fetchProjects = async (clientId) => {
    try {
      const data = await getProjects(clientId); // Fetch projects for the selected client
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div>
      <h1>Reports</h1>
      <div>
        <label>Select Organization:</label>
        <select
          value={selectedOrganizationId || ''}
          onChange={(e) => {
            const orgId = e.target.value;
            setSelectedOrganizationId(orgId);
            setSelectedClientId(null); // Reset client selection
            setProjects([]); // Clear projects when organization changes
            if (orgId) {
              fetchClients(orgId); // Fetch clients for the selected organization
            }
          }}
        >
          <option value="">-- Select --</option>
          {organizations.map((org) => (
            <option key={org.organizationId} value={org.organizationId}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Client:</label>
        <select
          value={selectedClientId || ''}
          onChange={(e) => {
            const clientId = e.target.value;
            setSelectedClientId(clientId);
            if (clientId) {
              fetchProjects(clientId); // Fetch projects for the selected client
            }
          }}
        >
          <option value="">-- Select --</option>          
          {clients && clients.map((client) => (
            <option key={client.clientId} value={client.clientId}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.projectId}>
              <strong>{project.name}</strong>: {project.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;