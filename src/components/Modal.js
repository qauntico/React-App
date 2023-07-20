import classes from './Modal.module.css';
import siteImage from './image/background2.jpg';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Modal({visibility}){
    const navigate = useNavigate();
    function handleChange(){
        navigate('/shop');
        visibility()
    }
  
    return <>
        <div className={classes.overlay} onClick={() => visibility()}></div>
        <div className={classes.container}>
           <div className={classes.modal}>
                <img src={siteImage}  className={classes.image}/>   
                <div className={classes.content}>
                    <h6>Sorry You Got An Empty Cart</h6>
                    <p>You can view all the available Events and buy some in the store.</p>
                    <Button variant="secondary" onClick={handleChange} className={classes['modal-button']}>Return Shop</Button>
                </div>   
           </div>
        </div>
    </>
}