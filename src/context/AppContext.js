import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [matches, setMatches] = useState([]);

  // Fetch de las ofertas
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:3001/offers', {
          headers: {
            Authorization: `Bearer ${user.token}` 
          }
        });
        if (response.ok) {
          const data = await response.json();
          setOffers(data);
          setLoadingOffers(false); 
        } else {
          console.error('Error al obtener las ofertas:', response.status);
          setLoadingOffers(false); 
        }
      } catch (error) {
        console.error('Error en el fetch de ofertas:', error);
        setLoadingOffers(false); 
      }
    };
  
    fetchOffers();
  }, [user, matches]); 
  


  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3001/match/customer', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMatches(data);
        } else {
          console.error('Error fetching matches');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user) {
      fetchMatches();
    }
  }, [user]);


  const filteredOffers = offers.filter((offer) => {
    return !matches.some((match) => match.offer._id === offer._id);
  });


  const passOffer = () => {
    setCurrentOfferIndex((prevIndex) => {
      return prevIndex + 1 < filteredOffers.length ? prevIndex + 1 : 0;
    });
  };


  const matchOffer = async (offerId) => {
    try {
      const response = await fetch('http://localhost:3001/match/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ offerId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Match creado exitosamente:', data);
        

        setOffers((prevOffers) => prevOffers.filter(offer => offer._id !== offerId));
  
        
        passOffer(); 
      } else if (response.status === 400 && data.message === 'El match ya existe') {
        console.log('El match ya existe, pasando a la siguiente oferta');
        passOffer(); 
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
        offers: filteredOffers,
        currentOfferIndex,
        loadingOffers,
        matches,
        passOffer,
        matchOffer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
