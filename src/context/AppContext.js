import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
// createContext: Crea el contexto global para la aplicacion.
// useContext: Para acceder a otros contextos, en este caso el AuthContext.
//useCallback: Para memorizar funciones que dependen de otras variables
import { AuthContext } from './AuthContext';

const AppContext = createContext();
// AppContext es el contexto que sera usado para compartir el estado de las ofertas y matches en toda la aplicacion

const AppProvider = ({ children }) => {
  // selectedOffer: Mantiene la oferta seleccionada por el usuario.
  // user: Proviene del AuthContext, que contiene información sobre el usuario autenticado (incluyendo el token para las peticiones).
  // offers: Guarda todas las ofertas que se obtienen desde el servidor.
  // currentOfferIndex: Indica el índice de la oferta actual que el usuario está viendo.
  // loadingOffers: Controla si las ofertas están cargándose.
  // matches: Almacena los matches que el usuario ha realizado.
  // filteredOffers: Ofertas que han sido filtradas para evitar mostrar ofertas con las que ya se hizo match. 
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [matches, setMatches] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);

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
  

  // Funcion para obtener matches
  const fetchMatches = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/match/customer', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMatches(data); // Actualiza los matches obtenidos
      } else {
        console.error('Error fetching matches');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [user]);
  

  useEffect(() => {
    const filtered = offers.filter((offer) => {
      return !matches.some((match) => match.offer._id === offer._id);
    });
    setFilteredOffers(filtered); // Almacena las ofertas filtradas
    console.log("Filtered Offers:", filtered); 
  }, [offers, matches]); // Filtra las ofertas cada vez que cambian las ofertas o los matches
  
//  Incrementa el indice de la oferta actual para mostrar la siguiente. Si no hay mas ofertas disponibles reinicia el indice a 0
  const passOffer = () => {
    setCurrentOfferIndex((prevIndex) => {
      return prevIndex + 1 < filteredOffers.length ? prevIndex + 1 : 0;
    });
  };

// Envia una solicitud para crear un match con la oferta seleccionada. Si el match ya existe, pasa a la siguiente oferta
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

  // Proporciona el estado y las funciones a todos los componentes hijos de la aplicación. Aquí se exponen las ofertas, el índice de la oferta actual, la funcionalidad de pasar y hacer match, entre otros.
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
        fetchMatches, 
        passOffer,
        matchOffer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
