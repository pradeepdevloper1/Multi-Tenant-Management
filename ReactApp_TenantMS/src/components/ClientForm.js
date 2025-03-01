import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

const ClientForm = ({ onSubmit, organizations }) => {
  const [name, setName] = useState('');
  const [organizationId, setOrganizationId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, organizationId });
    setName('');
    setOrganizationId('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        select
        label="Select Organization"
        value={organizationId}
        onChange={(e) => setOrganizationId(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      >
        {organizations.map((org) => (
          <MenuItem key={org.id} value={org.id}>
            {org.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">Create Client</Button>
    </Box>
  );
};

export default ClientForm;