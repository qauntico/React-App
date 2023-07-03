import { isAuthenticated } from "./auth";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";

export default function AdminPrivateRoute({element: Element}){
    const isAuth = isAuthenticated();
    const {user: {role}} = JSON.parse(isAuth)
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!isAuth && role == 1) {
            console.log('yes')
            //the replace true method set so that we replace the current url in the browser history rather than
            //creating a new one 
            return navigate('/signin', {replace: true })
        }
    }, [isAuth])

   
    return <Element />
};