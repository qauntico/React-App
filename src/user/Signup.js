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
import ErrorMessage from '../components/errorAtlert';
import SuccessMessage from '../components/successAtlert';


export default function Signup() {
    const [validated, setValidated] = useState(false);
    const [condition, setCondition] = useState({
      error: '',
      success: '',
      loading: false,
      password_match: true
    });
    //show password statehandle
    const [showPassword, setShowPassword] = useState(false);
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confirm_password = useRef();
    const about = useRef();

    //send form data method
    function SendData(){
        var data = {
            name : name.current.value,
            email : email.current.value,
            password: password.current.value,
            about: about.current.value
        };
        if (password.current.value !== confirm_password.current.value) {
          confirm_password.current.setCustomValidity("Passwords do not match");
        } else {
          setCondition({...condition,password_match: true});
          // Passwords match, remove any previous error message
          confirm_password.current.setCustomValidity('');
          // The form is valid, so you can call your method here
          setCondition({...condition,loading: true});
          User(data, "signup").then(result => {
            if (result.error){
                setCondition({...condition, error: result.error})
                console.log(result.error)
            }else{
                name.current.value = ""
                email.current.value = ""
                password.current.value = ""
                about.current.value = ""
                confirm_password.current.value=""
                setValidated(false)
                setCondition({...condition, error: '', success: result.success})
            }    
          })
        }
  
    }
    
    //form submit method
    const handleSubmit = (event) => { 
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation(); 
        }else{
          SendData();
        }
        setValidated(true); 
        
    };

    //Makes sure the confirm password field always has it default state
    function handleConfirmPassword(){
      setCondition({...condition, password_match: true});
      confirm_password.current.setCustomValidity('');
    }

    //show password method
    function handleShowPassword(){
      setShowPassword(prev => !prev)
    }
    
    //password field errors
    function passwordMatch(){
        if(condition.password_match){
          return <>
                  <Form.Control.Feedback type="invalid">
                    PLease Enter Password.
                  </Form.Control.Feedback>
                </>
        }else{
          return <>
                  <Form.Control.Feedback type="invalid">
                    Password Don't Match
                  </Form.Control.Feedback>
                </>
        }
    }
  
    return <Container style={{paddingTop: '120px'}} className={classes.background}>
      {condition.error && <ErrorMessage message={condition.error}/> }
      {condition.success && <SuccessMessage message={condition.success} method={'SIGNUP'}/> }
      <Form noValidate validated={validated} onSubmit={handleSubmit} className={classes.form} >
      <Row className="mb-3">
        <Form.Group as={Col} md={12} controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
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
          <Form.Control ref={password} type={ !showPassword ? 'password' : 'text' } placeholder="password" required />
          <Form.Control.Feedback type="invalid">
            PLease Enter Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={12} controlId="validationCustom03">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control ref={confirm_password} type={ !showPassword ? 'password' : 'text' } placeholder="password" onChange={handleConfirmPassword} required />
          {passwordMatch()}
        </Form.Group>
        <Form.Group as={Col} md={12} controlId="validationCustom03">
        <Form.Check
          label="show Password"
          onChange={handleShowPassword}
        />
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
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
        <Button type="submit" disabled={condition.loading} variant="secondary">
            {!condition.loading ? 'Create Account' : 'Creating Account ......'}
        </Button>
        </Form>
    </Container>
};


