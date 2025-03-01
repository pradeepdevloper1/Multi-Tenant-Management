import axios from 'axios';

const API_BASE_URL = '/api'; 

// Organizations
export const getOrganizations = async () => {
  const response = await axios.get(`${API_BASE_URL}/organizations`);
  return response.data;
};

export const createOrganization = async (organization) => {
  const response = await axios.post(`${API_BASE_URL}/organizations`, organization);
  return response.data;
};

export const updateOrganization = async (id, organization) => {
  const response = await axios.put(`${API_BASE_URL}/organizations/${id}`, organization);
  return response.data;
};

export const deleteOrganization = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/organizations/${id}`);
  return response.data;
};

// Clients
export const getClientsByOrganizationId = async (organizationId) => {
  const response = await axios.get(`${API_BASE_URL}/organizations/${organizationId}`);
  return response.data;
};
export const getClients = async (organizationId) => {
  const response = await axios.get(`${API_BASE_URL}/organizations/${organizationId}/clients`);
  return response.data;
};

export const createClient = async (organizationId, client) => {
  const response = await axios.post(`${API_BASE_URL}/organizations/${organizationId}/clients`, client);
  return response.data;
};

export const updateClient = async (organizationId, clientId, client) => {
  const response = await axios.put(`${API_BASE_URL}/organizations/${organizationId}/clients/${clientId}`, client);
  return response.data;
};

export const deleteClient = async (organizationId, clientId) => {
  const response = await axios.delete(`${API_BASE_URL}/organizations/${organizationId}/clients/${clientId}`);
  return response.data;
};

// Projects
export const getProjects = async (clientId) => {
  const response = await axios.get(`${API_BASE_URL}/clients/${clientId}/projects`);
  return response.data;
};

export const createProject = async (clientId, project) => {
  const response = await axios.post(`${API_BASE_URL}/clients/${clientId}/projects`, project);
  return response.data;
};

export const updateProject = async (clientId, projectId, project) => {
  const response = await axios.put(`${API_BASE_URL}/clients/${clientId}/projects/${projectId}`, project);
  return response.data;
};

export const deleteProject = async (clientId, projectId) => {
  const response = await axios.delete(`${API_BASE_URL}/clients/${clientId}/projects/${projectId}`);
  return response.data;
};