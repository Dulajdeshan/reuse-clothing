import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { auth } from '../config/firebaseConfig';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<firebase.User | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
