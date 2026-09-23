import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ConsentScreen from '../../pages/auth/ConsentScreen';

export const ConsentGuard = ({ children }) => {
  const { user, role, hasConsent, isLoading } = useAuth();

  if (isLoading) return null;

  // Only student role requires placement consent barrier
  if (role === 'STUDENT' && !hasConsent) {
    return <ConsentScreen />;
  }

  return children;
};

export default ConsentGuard;
