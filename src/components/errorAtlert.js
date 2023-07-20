import Alert from 'react-bootstrap/Alert';
import classes from './errorAlert.module.css'

function ErrorMessage({message}) {
  return (
    <Alert variant="danger" className={classes.error}>
      <Alert.Heading className={classes.heading}>Oh snap! You got an error!</Alert.Heading>
      <p>
        {message}
      </p>
    </Alert>
  );
}

export default ErrorMessage;