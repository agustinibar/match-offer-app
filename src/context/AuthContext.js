import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (userData, type) => {
    try {
      const endpoint = type === 'company' ? 'companies/register' : 'customer/register';
      const response = await fetch(`http://localhost:3001/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(res)
      const data = await response.json();

      if (response.ok) {
        setUser(data[type]);
        console.log('Registro exitoso:', data);
      } else {
        console.error('Error en el registro:', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
    }
  };

  const login = async (email, password, type) => {
    try {
      const endpoint = type === 'company' ? 'companies/login' : 'customer/login';
      const response = await fetch(`http://localhost:3001/${endpoint}`, {
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
        console.log(user)
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
