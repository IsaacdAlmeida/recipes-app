import React, { useState } from 'react';
import PropTypes from 'prop-types';
import headerContext from './headerContext';

function HeaderProvider({ children }) {
  const [search, setSearch] = useState('');

  function handleChange({ target: { value } }) {
    setSearch(value);
  }

  const contextValue = {
    search,
    handleChange,
  };

  return (
    <headerContext.Provider value={ contextValue }>
      { children }
    </headerContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
