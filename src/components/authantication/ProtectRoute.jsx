import React from 'react';

import { Navigate } from 'react-router-dom';

export default function ProtectRoute({ userData, children }) {
  // Check if userData is valid (you can adjust this based on your logic)
  if (!userData || Object.keys(userData).length === 0 ) {
    return <Navigate to="/login" />;
  }

  return children;
}