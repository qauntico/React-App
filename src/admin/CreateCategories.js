import { useState } from 'react';
import { Container,Row,Button,Form  } from 'react-bootstrap';
import './CreateCategories.css'
import { isAuthenticated } from '../auth/auth';
import { AdminApi } from '../admin/adminApi';
import SuccessMessage from '../components/successAtlert';
import ErrorMessage from '../components/errorAtlert';

export default function CreateCategories(){
    const [validated, setValidated] = useState(false);
    const [category, setCategory] = useState({
        name: '',
        error: '',
        success: '',
        loading: false
    })

    const {name, error, success,loading} = category;

    const {user, token} = JSON.parse(isAuthenticated());
    //makes request to the api
    function CreateCategory(){
        const Name = {name: name}
        setCategory(prev => ({
            ...prev,
            loading: true
        }))
        AdminApi(Name, token, user._id).then(result => {
            if(result.error){
                setCategory(prev => ({
                    ...prev,
                    loading: false,
                    error: result.error
                }))
                setValidated(false); 
            }else{
                setCategory(prev => ({
                    ...prev,
                    loading: false,
                    error: '',
                    success: result.success,
                    name: ''
                }))
                setValidated(false); 
            }
        })
    }
    //handle submit
    const handleSubmit = (event) => { 
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation(); 
        }else{
            CreateCategory();
        }
        setValidated(true); 
        
    };

    //handle form input change
    function HandleChange(e){
        setCategory(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>  
            <Container className='create-category-background' >
                <div className='category-heading-control'>
                    <h2 className='category-heading'>Create Event Category</h2> 
                </div>
                {success && <SuccessMessage message={success}/>}
                {error && <ErrorMessage message={error} />}
                <div className='create-category'>
                    <div className='category-form-control'>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='category-form' encType="multipart/form-data" >
                            <Row className="mb-3">
                                <Form.Group controlId="validationCustom01">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name='name'
                                    value={name}
                                    onChange={HandleChange}
                                    placeholder="Name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter Category Name...
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button type="submit" variant="secondary" disabled={loading}>{!loading ? 'Create' : 'Creating'}</Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </>
    )
}