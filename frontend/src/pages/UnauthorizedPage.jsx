import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div style={{ padding: '2rem', color: 'red' }}>
      <h2>🚫 Unauthorized Access</h2>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default UnauthorizedPage;
