import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  // TODO: create state isLoggedIn, set value to false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [update, setUpdate] = useState(false);


  return (
    <MainContext.Provider value={{
      isLoggedIn, setIsLoggedIn,
      user, setUser,
      userData, setUserData,
      update, setUpdate
    }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
