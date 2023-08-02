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
import ErrorMessage from "../components/errorAtlert";

export default function Signin() {
    const [validated, setValidated] = useState(false);
    const [condition, setCondition] = useState({
      error: '',
      loading: false,
      showPassword: false
    })
    const navigate = useNavigate();

    const email = useRef();
    const password = useRef();

    //sends form data to  the backend
    function SendData(){
        var data = {
            email : email.current.value,
            password: password.current.value,
        };
        setCondition({...condition, loading: true})
        User(data, "signin").then(result => {
            if(result.error){
                setCondition({...condition, error: result.error})
                password.current.value = ''
            }else{
                setCondition({...condition, error: ''})
                authenticate(result, () => {
                    password.current.value = '';
                    email.current.value = '';
                    if(result.user.role == 0){
                      navigate('/user/dashboard');
                    }else{
                      navigate('/admin/dashboard');
                    }
                    setValidated(false)
                })     
            }    
        })
              
      
    }
    //handles the show password state
    function handleShowPassword(){
      setCondition({...condition, showPassword: !condition.showPassword})
    }

    //submits the form data 
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }else{
          SendData()
        }
        setValidated(true);
    };
   
    
    return <Container style={{paddingTop: '120px'}} className={classes.background}  >
        {condition.error && <ErrorMessage message={condition.error} />}
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
               Enter An Email.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md={12} controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control
           ref={password} 
           type={condition.showPassword ? 'text' : 'password'}
           placeholder="password" 
           required />
          <Form.Control.Feedback type="invalid">
            PLease Enter a Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={12} controlId="validationCustom03">
        <Form.Check
          label="show Password"
          onChange={handleShowPassword}
        />
      </Form.Group>
      </Row>
      <Button type="submit" disabled={condition.loading} variant="secondary">
            {!condition.loading ? 'Log In' : 'Logging In ......'}
      </Button>
        </Form>
    </Container>
}