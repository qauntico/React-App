import Button from 'react-bootstrap/Button';
import { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Form  from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Container } from "react-bootstrap";
import { AddProduct } from './adminApi';
import { isAuthenticated } from '../auth/auth';
import { json, useParams, useRouteLoaderData} from 'react-router-dom';
import SuccessMessage from '../components/successAtlert';
import ErrorMessage from '../components/errorAtlert';
import './EventForm.css'


function EventForm({method, eventFormData}) {
    const param = useParams();
    const [validated, setValidated] = useState(false);
    const {token, user} = JSON.parse(isAuthenticated());
    const data = useRouteLoaderData('category');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null)
    const [generalState, setGeneralState] = useState({
      loading: false,
      error: '',
      success: ''
    });
    const {loading, error,success} = generalState;
    const [product, setProduct] = useState({
        name: '',
        startDate: '',
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo:''  
    });

    //send the event Data to the backend
    function SendData(){
      const formData = new FormData();
      formData.set('name',product.name);
      formData.set('price',product.price);
      formData.set('category',product.category);
      formData.set('description',product.description);
      formData.set('shipping', product.shipping);
      formData.set('quantity', product.quantity);
      formData.set('photo', product.photo);
      formData.set('startDate', product.startDate);
      formData.set('startTime', product.startTime);
      formData.set('endTime', product.endTime);
      formData.set('location', product.location);
      setGeneralState(prev => ({
        ...prev,
        loading: true
      }));//set loading to true
      AddProduct(formData, token,user._id,method, param.productId && param.productId).then(result => {
        if (result.error){
            console.log(result.error)
            setGeneralState(prev => ({
              ...prev,
              error: result.error,
              loading: false
            }))
        }else{
            setProduct({
              ...product,
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  shipping: '',
                  quantity: '', 
                  photo: '',
                  startDate: '',
                  startTime: '',
                  endTime: '',
                  location: '',
            })
            fileInputRef.current.value = '';
            setGeneralState({loading: false, error: '', success: result.success});
            setImagePreview('');
            setValidated(false);
        }    
      })
      }



    //handle submitting data 
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

  //in setProduct state in the use useEffect we are first checking if a eventFormData is available before i set the default values for the input fiedls to empty strings
  //this eventFormData will only be present if the user want's to edit an event so check in the EditSingleEvent Component
   useEffect(() => {
        setProduct(previous => ({
            ...previous,
            name: eventFormData ? eventFormData.name : '',
            startDate: eventFormData ? eventFormData.startDate : '',
            startTime: eventFormData ? eventFormData.startTime : '',
            endTime: eventFormData ? eventFormData.endTime : '',
            location: eventFormData ? eventFormData.location : '',
            description: eventFormData ? eventFormData.description : '',
            price: eventFormData ?  eventFormData.price : '',
            quantity: eventFormData ?  eventFormData.quantity : '',
            category: eventFormData ? eventFormData.category._id: '',
            shipping: eventFormData ? eventFormData.shipping : '',
            categories: data
        }))
   },[data,eventFormData])

    //handle reading the value from the file input so that i can be displayed for preview
   useEffect(() => {
    if (product.photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(product.photo);
    }
  }, [product.photo]);
    
    //handles changes in the form input value
    const valueChange = (e) => {
        const name = e.target.name;
        const value = name == 'photo' ? e.target.files[0] : e.target.value;//getting the values of the fields
        setProduct(previous => ({
            ...previous,
            [e.target.name]: value
        }))
    }
    
     
  return (
    <Container className='event-background'>
      <h2 className='event-heading' >{method === 'POST' ? 'Create Amazing Events!!' : 'Edit Event'}</h2>
      {success && <SuccessMessage message={success} method={method} />}
      {error && <ErrorMessage message={error} />}
      <Form noValidate validated={validated} onSubmit={handleSubmit} className='event-form' encType="multipart/form-data" >
      {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt='Preview'
              className='event-image'
            /> 
          </div>
        )}
      <Row className="mb-3">
        <Form.Group controlId="validationCustom01">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            required
            type="text"
            name='name'
            value={product.name}
            onChange={valueChange}
            placeholder="Name"
          />
          <Form.Control.Feedback type="invalid">
              Please Enter Event Name...
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
        <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              required
              type="date"
              name="startDate"
              value={product.startDate}
              onChange={valueChange}
              placeholder="Start Date"
            />
            <Form.Control.Feedback type="invalid">Please Enter Start Date...</Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              required
              type="time"
              name="startTime"
              value={product.startTime}
              onChange={valueChange}
              placeholder="Start Time"
            />
            <Form.Control.Feedback type="invalid">Please Enter Start Time...</Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="endTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              required
              type="time"
              name="endTime"
              value={product.endTime}
              onChange={valueChange}
              placeholder="End Time"
            />
            <Form.Control.Feedback type="invalid">Please Enter End Time...</Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="text"
              name="location"
              value={product.location}
              onChange={valueChange}
              placeholder="Location"
            />
            <Form.Control.Feedback type="invalid">Please Enter Event Location...</Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        <Form.Label>Description</Form.Label>
            <FloatingLabel  controlId="floatingTextarea2" label="Description">
            <Form.Control
                required
                as="textarea"
                name='description'
                value={product.description}
                onChange={valueChange}
                placeholder="Product Description"
                style={{ height: '100px' }}
            />
            <Form.Control.Feedback type="invalid">
              Please Add a Description...
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Price For Tickets</Form.Label>
          <Form.Control
            required
            type="number"
            name='price'
            value={product.price}
            onChange={valueChange}
            placeholder="Product Price"
          />
          <Form.Control.Feedback type="invalid">
              Please Enter The Ticket Price
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Event Category</Form.Label>
          <Form.Select required name='category' onChange={valueChange} value={product.category} >
            <option >Please Select</option>
            {/* we check if there are categories available from the loader if yes then we map it out */}
            {product.categories && 
                product.categories.map((category,id) => (
                    <option key={id} value={category._id}>{category.name}</option>
                ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
              What Category Does This Event Falls Under....
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            required
            type="number"
            name='quantity'
            value={product.quantity}
            onChange={valueChange}
            placeholder="Quantity"
          />
          <Form.Control.Feedback type="invalid">
              Please Enter the Quantity Of Tickets Available For This Event
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Photo</Form.Label>

          <Form.Control
            type="file"
            name='photo'
            ref={fileInputRef} 
            onChange={valueChange}
            placeholder="Image"
          />
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Shipping</Form.Label>
          <Form.Select name='shipping' onChange={valueChange} value={product.shipping}>
            <option>Please select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Form.Select>
        </Form.Group>
      </Row>
        <Button type="submit" disabled={loading}  variant="secondary" >{loading && method === 'POST' ? 'Creating Event...' : 
                                                                        loading && method === 'PUT' ? 'Editing Event...': 
                                                                        method == 'POST' ? 'Create Event' : 'Edit Event'}
        </Button>
        </Form>
    </Container>
  );
}

export default EventForm;

export async function loader(){
    const response = await fetch('https://backend-c1rf.onrender.com/api/all/category');

    if(!response.ok) {
        throw json({error: 'An error occured fetching categories'},{status: 400})
    }else{
        return response
    }
}