import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Form  from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Container } from "react-bootstrap";
import classes from './Signup.module.css';
import { useRef} from "react";
import { User } from '../auth/auth';


export default function Signup() {
    const [validated, setValidated] = useState(false);

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const about = useRef();
    const check = useRef();
    function SendData(){
        var data = {
            name : name.current.value,
            email : email.current.value,
            password: password.current.value,
            about: about.current.value
        };
        
        if (data.name && data.email && data.password && check.current.checked) {
           User(data, "signup").then(result => {
                if (result.errors){
                    console.log(result.errors)
                }else{
                    setTimeout(()=> {
                        name.current.value = ""
                        email.current.value = ""
                        password.current.value = ""
                        about.current.value = ""
                        setValidated(false)
                    },2000);
                }    
           })
              
        }else{
            return 
        };
    }
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            //event.preventDefault();
            event.stopPropagation(); 
        }
        SendData();
        setValidated(true);  
    };
    
 
    const v = process.env.REACT_APP_API_KEY
    return <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className={classes.form}>
      <Row className="mb-3">
        <Form.Group as={Col} md={12} controlId="validationCustom01">
          <Form.Label>Name{v}</Form.Label>
          <Form.Control
            required
            type="text"
            ref={name}
            placeholder="Name"
          />
          <Form.Control.Feedback type="invalid">
              Please Enter Your Names.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={12} controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              
              ref={email}
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose Enter An Email.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md={12} controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" placeholder="password" required />
          <Form.Control.Feedback type="invalid">
            PLease Enter a Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={12}  controlId="validationCustom03">
        <Form.Label>About</Form.Label>
            <FloatingLabel  controlId="floatingTextarea2" label="About">
            <Form.Control
                as="textarea"
                ref={about}
                placeholder="About your self"
                style={{ height: '100px' }}
            />
            </FloatingLabel>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          ref={check}
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
        <Button type="submit">Create Account</Button>
        </Form>
    </Container>
};


