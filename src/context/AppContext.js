import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [matches, setMatches] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [companyOffers, setCompanyOffers] = useState([]); // Ofertas activas de la empresa
  const [formData, setFormData] = useState([]);

  // Fetch de las ofertas activas de la empresa
  const fetchCompanyOffers = async () => {
    try {
      const response = await fetch('http://localhost:3001/offers', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Ofertas recibidas del backend:', data); 

        const companyOffers = data.filter((offer) => {
          console.log('Comparando:', offer.company, 'con', user.company._id); 
          return offer.company === user.company._id; 
        });
  
        console.log('Ofertas filtradas:', companyOffers);   
        setCompanyOffers(companyOffers);
        setLoadingOffers(false);
      } else {
        console.error('Error al obtener las ofertas de la empresa:', response.status);
        setLoadingOffers(false);
      }
    } catch (error) {
      console.error('Error en el fetch de ofertas de la empresa:', error);
      setLoadingOffers(false);
    }
  };
  
  

  // Fetch de las ofertas
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:3001/offers', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
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
  }, [user, matches]); // Se vuelve a ejecutar cuando los matches cambian

  // Fetch de los matches
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

  // Filtra las ofertas para excluir las que ya tienen match
  useEffect(() => {
    const filtered = offers.filter((offer) => {
      return !matches.some((match) => match.offer._id === offer._id);
    });
    setFilteredOffers(filtered); // Almacena las ofertas filtradas
    console.log("Filtered Offers:", filtered);
  }, [offers, matches]); // Filtra las ofertas cada vez que cambian las ofertas o los matches

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
        setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== offerId));
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
  
  /////Crear oferta//////
  const createOffer = async (offerData) => {
    try {
      const response = await fetch('http://localhost:3001/offers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(offerData),
      });
      console.log(response)
      const data = await response.json();

      if(response.ok) {
        setFormData(data);
      } else {
        const errorData = await response.json();
        console.error('Error al crear la oferta:', errorData.message);
      }

    } catch (error) {
      console.error('Error en la solicitud de carga:', error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        offers: filteredOffers,
        currentOfferIndex,
        loadingOffers,
        matches,
        fetchMatches,
        passOffer,
        matchOffer,
        companyOffers, 
        fetchCompanyOffers,
        createOffer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
