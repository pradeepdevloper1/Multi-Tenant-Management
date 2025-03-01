let organizations = [];
let clients = [];
let projects = [];

export const addOrganization = (org) => {
  organizations.push(org);
};

export const addClient = (client) => {
  clients.push(client);
};

export const addProject = (project) => {
  projects.push(project);
};

export const getOrganizations = () => organizations;
export const getClients = () => clients;
export const getProjects = () => projects;

export const getClientsByOrg = (orgId) => clients.filter(client => client.orgId === orgId);
export const getProjectsByClient = (clientId) => projects.filter(project => project.clientId === clientId);