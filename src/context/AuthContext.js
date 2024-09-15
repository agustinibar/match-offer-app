import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:3001/companies/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token y los datos del usuario
        setUser(data.company);
        // Guardar el token en AsyncStorage para múltiples sesiones
        console.log('Registro exitoso:', data);
      } else {
        console.error('Error en el registro:', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/companies/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {

        setUser(data);
        console.log('Inicio de sesión exitoso:', data);
      } else {
        console.error('Error en el inicio de sesión:', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
    }
  };

  const logout = () => {
    setUser(null);
 
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
