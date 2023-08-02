import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Form  from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRef} from "react";
import ErrorMessage from '../errorAtlert';
import SuccessMessage from '../successAtlert';
import './UserProfile.css'
import { UpdateUserProfile, isAuthenticated } from '../../auth/auth';

export default function EditUserProfileInfo(){
    const prevProfileData = JSON.parse(isAuthenticated());
    const {user,token} = JSON.parse(isAuthenticated());
    const {name,_id,about = '',email} = user
    const [validated, setValidated] = useState(false);
    const [condition, setCondition] = useState({
      error: '',
      success: '',
      loading: false,
    });
    const {error, success, loading} = condition;

    const userName = useRef();
    const userEmail = useRef();
    const userAbout = useRef();

    //send form data method
    function SendData(){
        var data = {
            name : userName.current.value,
            email : userEmail.current.value,
            about: userAbout.current.value
        };
        setCondition({...condition, loading: true})
        UpdateUserProfile(_id,token,data).then(result => {
            if(result.error){
                setCondition({...condition,success: '', error: result.error})
            }else{
                setCondition({...condition,success: 'Your profile was successfully updated check your info on your dashboard', error: ''})
                setValidated(false)
                let jwt = {};
                if (typeof window !== 'undefined'){
                    jwt = {token: token, user: result}
                    localStorage.setItem('jwt', JSON.stringify(jwt))
                }
                
            }

        })
  
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


    return(
        <>
            <div className="admin-request-background">
                {error && <ErrorMessage message={error} />}
                {success && <SuccessMessage message={success} />}
                <div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Row className="mb-3">
                        <Form.Group as={Col} md={12} controlId="validationCustom01">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            ref={userName}
                            placeholder="Name"
                            defaultValue={name}
                            className="no-border"
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
                            ref={userEmail}
                            defaultValue={email}
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            className='no-border'
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
                        <Form.Group as={Col} md={12}  controlId="validationCustom03">
                        <Form.Label>About</Form.Label>
                            <FloatingLabel  controlId="floatingTextarea2" label="About">
                            <Form.Control
                                as="textarea"
                                ref={userAbout}
                                placeholder="About your self"
                                defaultValue={about}
                                style={{ height: '100px' }}
                            />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                        <Button type="submit" disabled={condition.loading} variant="secondary">
                            {!condition.loading ? 'Apply Changes' : 'Applying Changes......'}
                        </Button>
                        </Form>
                </div> 
            </div>
        </>
    )
}