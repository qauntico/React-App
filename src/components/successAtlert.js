import Alert from 'react-bootstrap/Alert';
import classes from './errorAlert.module.css';

function SuccessMessage({message}) {
  return (
    <Alert variant="success" className={classes.error}>
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p>
        {message}
        <Alert.Link href="/signin"> Log In Here</Alert.Link>
      </p>
    </Alert>
  );
}

export default SuccessMessage;