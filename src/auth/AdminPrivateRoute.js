import { isAuthenticated } from "./auth";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";

export default function AdminPrivateRoute({element: Element}){
    const isAuth = JSON.parse(isAuthenticated());
    const role = isAuth && isAuth.user.role;
    const navigate = useNavigate();
    
   
    if(!isAuth && role != 1) {
        console.log('yes')
        //the replace true method set so that we replace the current url in the browser history rather than
        //creating a new one 
        return navigate('/signin', {replace: true })
    }else if(isAuth && role == 1){
        return <Element />
    }e

};