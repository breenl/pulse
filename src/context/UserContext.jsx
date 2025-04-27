// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1) Cria o contexto de usuário
const UserContext = createContext();

// 2) Hook para consumir o contexto
export const useUser = () => useContext(UserContext);

// 3) Provider que engloba a aplicação e entrega user + setUser
export const UserProvider = ({ children }) => {
  // Inicializa o estado a partir do que estiver no localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('market-pulse-user');
    return saved ? JSON.parse(saved) : null;
  });

  // Toda vez que `user` mudar, persiste no localStorage
  useEffect(() => {
    localStorage.setItem('market-pulse-user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
