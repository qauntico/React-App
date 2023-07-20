import { useEffect } from "react";
import { isAuthenticated } from "./auth";
import { useNavigate} from "react-router-dom";

export default function AdminPrivateRoute({element: Element}){
    const isAuth = JSON.parse(isAuthenticated());
    const role = isAuth && isAuth.user.role;
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isAuth) {
          navigate("/signin", { replace: true });
        }
    }, [isAuth, navigate]);
    
    if (isAuth && role == 1) {
        return <Element />;
    }
    return null;
 
};