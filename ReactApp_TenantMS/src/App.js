import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Organizations from './pages/Organizations';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Reports from './pages/Reports';

const App = () => {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Organizations Route */}
        <Route
          path="/organizations"
          element={<Organizations onOrganizationSelect={setSelectedOrganizationId} />}
        />

        {/* Clients Route */}
        <Route
          path="/clients"
          element={
            <Clients
              organizationId={selectedOrganizationId}
              onClientSelect={setSelectedClientId}
            />
          }
        />

        {/* Projects Route */}
        <Route
          path="/projects"
          element={<Projects clientId={selectedClientId} />}
        />

        {/* Reports Route */}
        <Route path="/reports" element={<Reports />} />

        {/* Default Route (Organizations) */}
        <Route
          path="/"
          element={<Organizations onOrganizationSelect={setSelectedOrganizationId} />}
        />
      </Routes>
    </Router>
  );
};

export default App;