import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../../router/router'
import { AuthContext } from '../../context';
import Loader from '../UI/Loader/Loader';

function AppRouter() {
  const {isAuth, setIsAuth, isLoading} = React.useContext(AuthContext);

  if (isLoading) {
    return (<Loader/>)
  }

  return (
    isAuth
      ? (
        <Routes>
          {privateRoutes.map(route =>
            <Route
                exact={route.exact}
                path={route.path}
                element={route.element}
                key={route.path}
            />
          )}
        </Routes>
      )
      : (
        <Routes>
          {publicRoutes.map(route =>
            <Route
                exact={route.exact}
                path={route.path}
                element={route.element}
                key={route.path}
            />
          )}
        </Routes>
      )
  )
}

export default AppRouter