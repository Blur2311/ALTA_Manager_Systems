// components/PrivateRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../context/store";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
