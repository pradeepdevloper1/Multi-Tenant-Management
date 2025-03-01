import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';

const ReportGenerator = ({ clients, projects }) => {
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const filteredProjects = selectedClientId
    ? projects.filter((project) => project.clientId === selectedClientId)
    : [];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Generate Report</Typography>
      <TextField
        select
        label="Select Client"
        value={selectedClientId}
        onChange={(e) => setSelectedClientId(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {clients.map((client) => (
          <MenuItem key={client.id} value={client.id}>
            {client.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Select Project"
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {filteredProjects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained">Generate Report</Button>
    </Box>
  );
};

export default ReportGenerator;