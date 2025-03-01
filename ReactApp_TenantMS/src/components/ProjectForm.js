import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

const ProjectForm = ({ onSubmit, clients }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, clientId });
    setName('');
    setDescription('');
    setClientId('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        select
        label="Select Client"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      >
        {clients.map((client) => (
          <MenuItem key={client.id} value={client.id}>
            {client.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">Create Project</Button>
    </Box>
  );
};

export default ProjectForm;