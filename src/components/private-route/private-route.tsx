import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);
  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
