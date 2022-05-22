import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const data =JSON.parse( localStorage.getItem("authantication"));

  return data ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;