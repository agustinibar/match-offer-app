import React, { createContext, useState } from 'react';

// Crear el contexto
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ selectedOffer, setSelectedOffer, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
