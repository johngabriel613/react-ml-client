import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useGlobalContext';

const ProtectedLayout = () => {
  const {results} = useGlobalContext();

  return results ? <Outlet/> : <Navigate to={'/'}/>
}

export default ProtectedLayout
