import React, { createContext, useState, useEffect, useContext } from 'react';
import {  onAuthStateChanged } from 'firebase/auth';
import {auth} from '../config/firebase'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
