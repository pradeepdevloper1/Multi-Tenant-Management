import React, { useState } from 'react';
import { getOrganizations, getClientsByOrg, getProjectsByClient, getClients, getProjects } from '../data';
import SelectDropdown from './SelectDropdown';

const ReportDisplay = () => {
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const organizations = getOrganizations();
  const clients = selectedOrgId ? getClientsByOrg(selectedOrgId) : [];
  const projects = selectedClientId ? getProjectsByClient(selectedClientId) : [];

  return (
    <div>
      <h2>Reports</h2>
      <SelectDropdown
        options={organizations.map(org => ({ value: org.id, label: org.name }))}
        onChange={(selectedOption) => {
          setSelectedOrgId(selectedOption.value);
          setSelectedClientId(null);
        }}
        placeholder="Select Organization"
      />
      {selectedOrgId && (
        <SelectDropdown
          options={clients.map(client => ({ value: client.id, label: client.name }))}
          onChange={(selectedOption) => setSelectedClientId(selectedOption.value)}
          placeholder="Select Client"
        />
      )}
      {selectedClientId && (
        <div>
          <h3>Projects:</h3>
          <ul>
            {projects.map(project => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        </div>
      )}
      {selectedOrgId && !selectedClientId && clients.length > 0 && (
        <div>
          <h3>Clients:</h3>
          <ul>
            {clients.map(client => (
              <li key={client.id}>{client.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReportDisplay;