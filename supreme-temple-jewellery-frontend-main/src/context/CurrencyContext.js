import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1, INR: 1 });

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const res = await fetch('https://api.exchangerate.host/latest');
        const data = await res.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
