import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Form  from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Container } from "react-bootstrap";
import { AddProduct } from './adminApi';
import { isAuthenticated } from '../auth/auth';
import { json, useLoaderData} from 'react-router-dom';


function CreateProduct() {
    const [validated, setValidated] = useState(false);
    const {token, user} = JSON.parse(isAuthenticated());
    const data = useLoaderData();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo:''  
    });
    //populating the category once the component is initaily mounted
   useEffect(() => {
        setProduct(previous => ({
            ...previous,
            categories: data
        }))
   },[data])
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            //event.preventDefault();
            event.stopPropagation(); 
        }
        if(product.name !== '' && product.category !== '' && product.price !== ''){
            setValidated(true);
            const formData = new FormData();
            formData.set('name',product.name)
            formData.set('price',product.price)
            formData.set('category',product.category)
            product.description !== '' && formData.set('description',product.description)
            product.shipping !== '' && formData.set('shipping', product.shipping)
            product.quantity !== '' && formData.set('quantity', product.quantity)
            product.photo !== '' && formData.set('photo', product.photo)
            //begin the loading state
            setLoading(true)
            AddProduct(formData, token,user._id)
            .then(result => {
                setLoading(true) 
                console.log(result)
                setProduct({
                    ...product,
                        name: '',
                        description: '',
                        price: '',
                        category: '',
                        shipping: '',
                        quantity: '', 
                })
                setValidated(false)
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
            return
        }
        setValidated(true)
       console.log('yes')
        return 
    };
    const valueChange = (e) => {
        const name = e.target.name;
        const value = name == 'photo' ? e.target.files[0] : e.target.value;//getting the values of the fields
        setProduct(previous => ({
            ...previous,
            [e.target.name]: value
        }))
    }
  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit} style={{marginTop: '200px'}} encType="multipart/form-data" >
      <Row className="mb-3">
        <Form.Group controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            name='name'
            value={product.name}
            onChange={valueChange}
            placeholder="Name"
          />
          <Form.Control.Feedback type="invalid">
              Please Enter Your Names.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
        <Form.Label>Description</Form.Label>
            <FloatingLabel  controlId="floatingTextarea2" label="Description">
            <Form.Control
                as="textarea"
                name='description'
                value={product.description}
                onChange={valueChange}
                placeholder="Product Description"
                style={{ height: '100px' }}
            />
            </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            name='price'
            value={product.price}
            onChange={valueChange}
            placeholder="Product Price"
          />
          <Form.Control.Feedback type="invalid">
              Please Enter The Product Price
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Category</Form.Label>
          <Form.Select required name='category' onChange={valueChange} value={product.category} >
            <option >Please Select</option>
            {/* we check if there are categories available from the loader if yes then we map it out */}
            {product.categories && 
                product.categories.map((category,id) => (
                    <option key={id} value={category._id}>{category.name}</option>
                ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
              Select a category
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name='quantity'
            value={product.quantity}
            onChange={valueChange}
            placeholder="Quantity"
          />
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type="file"
            name='photo'
            onChange={valueChange}
            placeholder="Image"
          />
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Shipping</Form.Label>
          <Form.Select name='shipping' onChange={valueChange} value={product.shipping}>
            <option>Please select</option>
            <option value="0">Yes</option>
            <option value="1">No</option>
          </Form.Select>
        </Form.Group>
      </Row>
        <Button type="submit">Create Product</Button>
        </Form>
    </Container>
  );
}

export default CreateProduct;

export async function loader(){
    const response = await fetch('http://localhost:8080/api/all/category');

    if(!response.ok) {
        throw json({error: 'An error occured fetching categories'},{status: 400})
    }else{
        return response
    }
}