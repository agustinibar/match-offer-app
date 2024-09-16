// context/AppContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
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

  const passOffer = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
  };
  const matchOffer = async (offerId) => {
    try {
      const response = await fetch('http://localhost:3001/match/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Asegúrate de que el token esté disponible
        },
        body: JSON.stringify({ offerId }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Aquí puedes manejar el estado después de hacer match, como actualizar el estado local o mostrar un mensaje
        console.log('Match creado exitosamente:', data);
        passOffer(); // Pasa a la siguiente oferta después de hacer match
      } else {
        console.error('Error al crear el match:', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud de match:', error);
    }
  };


  return (
    <AppContext.Provider
      value={{
        selectedOffer,
        setSelectedOffer,
        user,
        offers,
        currentOfferIndex,
        loadingOffers,
        passOffer,
        matchOffer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
