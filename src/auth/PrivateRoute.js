import { useEffect } from "react";
import { isAuthenticated } from "./auth";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ element: Element }) {
  const isAuth = isAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin", { replace: true });
    }
  }, [isAuth, navigate]);

  if (isAuth) {
    return <Element />;
  }

  return null;
}