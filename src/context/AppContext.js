// context/AppContext.js
import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [user, setUser] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:3001/offers');
        if (response.ok) {
          const data = await response.json();
          setOffers(data);
        } else {
          console.error('Error fetching offers');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoadingOffers(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <AppContext.Provider value={{ selectedOffer, setSelectedOffer, user, setUser, offers, loadingOffers }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
