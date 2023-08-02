import Alert from 'react-bootstrap/Alert';
import classes from './errorAlert.module.css';

function SuccessMessage({message,method}) {
  return (
    <Alert variant="success" className={classes.error}>
      <Alert.Heading className={classes.heading}>Hey, nice to see you</Alert.Heading>
      <p>
        {message}
        {method && method === 'SIGNUP' ? <Alert.Link href="/signin"> Log In Here</Alert.Link>: 
          method === 'POST' ? <Alert.Link href="/shop">  Visit Shop To See Created Event Ticket</Alert.Link>:
          method === 'PUT' ? <Alert.Link href="/shop">  Visit Shop To See Edited Event Ticket</Alert.Link>: 
          method === 'PURCHASEHISTORY' && <Alert.Link href="/shop">  Purchase Event Tickets</Alert.Link> }
      </p>
    </Alert>
  );
}

export default SuccessMessage;