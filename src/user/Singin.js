import { React, useState, useRef} from "react";
import { Container } from "react-bootstrap";
import { User , authenticate} from "../auth/auth";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Form  from 'react-bootstrap/Form';
import classes from './signin.module.css'

export default function Signin() {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();


    const email = useRef();
    const password = useRef();
    function SendData(){
        var data = {
            email : email.current.value,
            password: password.current.value,
        };
        if (data.email && data.password) {
           User(data, "signin").then(result => {
                if(result.error){
                    console.log(result.error)
                }else{
                    setValidated(false)
                    authenticate(result, () => {
                        console.log(result.user.role)
                        if(result.user.role == 0){
                          navigate('/user/dashboard')
                        }else{
                          navigate('/admin/dashboard')
                        }
                        
                    })     
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
            event.stopPropagation();
        }
        SendData()
        setValidated(true);
    };
   
    
    return <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className={classes.form}>
      <Row className="mb-3">
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
      </Row>
        <Button type="submit">Create Account</Button>
        </Form>
    </Container>
}
export function action () {
    console.log('yes')
    fetch('google.com')
}