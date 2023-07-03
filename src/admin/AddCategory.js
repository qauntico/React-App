import React, {useState} from "react";
import { isAuthenticated } from "../auth/auth";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AdminApi } from "./adminApi";


export default function CreateCategory(){
    const [Name, setName] = useState({
        name: ''
    });
    const [result, setResult] = useState('');

    const {token, user} = JSON.parse(isAuthenticated());
    console.log(token)
    function handleChange(e){
        setName(past => ({...past, [e.target.name]: e.target.value}))
    }
    function clickSubmit(e){
        e.preventDefault();
        console.log(Name)
        if(Name !== ''){
            AdminApi(Name, token, user._id).then(result => {
                console.log(result)
            })
            setName({
                name: ''
            });
        }

    }

    const newCategoryForm = () => {
       return <>
                <Form onSubmit={clickSubmit} style={{marginTop: '200px'}}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Name
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name='name' placeholder="Category Name" onChange={handleChange} value={Name.name}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Sign in</Button>
                    </Col>
                </Form.Group>
                </Form>
            </> 
    };
    return <>
        {newCategoryForm()}
    </>
}