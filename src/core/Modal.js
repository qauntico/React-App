import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AppModal({message,action,state}) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    state();
  }

  function PerformAction(){
    setShow(false);
    action()
  }

  useEffect(() => {
    setShow(true);
  },[])

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={PerformAction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AppModal;

