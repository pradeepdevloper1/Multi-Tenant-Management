import React, { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../services/api';
const Projects = ({ clientId }) => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', clientId });
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    if (clientId) {
      fetchProjects();
    }
  }, [clientId]);

  const fetchProjects = async () => {
    const data = await getProjects(clientId);
    setProjects(data);
  };

  const handleCreateProject = async () => {
    await createProject(clientId, newProject);
    setNewProject({ name: '', description: '', clientId });
    fetchProjects();
  };

  const handleUpdateProject = async () => {
    await updateProject(clientId, editingProject.projectId, editingProject);
    setEditingProject(null);
    fetchProjects();
  };

  const handleDeleteProject = async (projectId) => {
    await deleteProject(clientId, projectId);
    fetchProjects();
  };

  return (
    <div>
      <h3>Projects</h3>
      <div>
        <input
          type="text"
          placeholder="Project Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Project Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <button onClick={handleCreateProject}>Create</button>
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project.projectId}>
            {editingProject?.projectId === project.projectId ? (
              <div>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                />
                <button onClick={handleUpdateProject}>Save</button>
                <button onClick={() => setEditingProject(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{project.name}</strong>: {project.description}
                <button onClick={() => setEditingProject(project)}>Edit</button>
                <button onClick={() => handleDeleteProject(project.projectId)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;