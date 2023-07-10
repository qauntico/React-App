import { isAuthenticated } from "./auth";
import { useNavigate} from "react-router-dom";

export default function PrivateRoute({element: Element}){
    const isAuth = isAuthenticated();
    const navigate = useNavigate();
    if(!isAuth) {
        console.log('yes')
        //the replace true method set so that we replace the current url in the browser history rather than
        //creating a new one 
        return navigate('/signin', {replace: true })
    }else{
        return <Element />
    }
};