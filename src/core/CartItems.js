import { Col,Row,Button } from "react-bootstrap";
import { removeItem, updateItem } from "./cartHelpers";
import { useContext, useState } from "react";
import CartContex from "../Contex/Cart-Contex";

export default function CartItems({product, update = false, setRun = f => f,run = undefined}){
    const data = useContext(CartContex);//this is a gobal state manager that updates the cart value in the navbar when the user removes an item
    const [count, setCount] = useState(product.count);

    const handleChange = productId => event => {
        setRun(!run)
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1){
           updateItem(productId, event.target.value) 
        }
    }

    //this is the method that controlls that and updates it's value in the local storage
    function handleRemoveProduct(){
        setRun(!run) 
        removeItem(product._id)
        data.toggle()
    }

    //this form input controls the number of tickets the user want's to buy 
    function updateOption(update){
        return update && <>
            <input type='number' value={count} className="form-control"  onChange={handleChange(product._id)} />
        </>
    }
    
    return (
        <>
            <li className='mb-3 cart-items'>
                <Row >
                    <Col xs={12} sm={5}>
                        <img src={`http://localhost:8080/api/product/photo/${product._id}`} alt="icon" width="100%" height="110" className="cart-image" />
                    </Col>
                    <Col xs={12} sm={7} >
                        <Row>
                            <Col sm={12}>
                                <h4>{product.name}</h4>
                            </Col>
                            <Col sm={12}>
                               {updateOption(update)}
                            </Col>
                            <Col sm={12} className='pt-1'>
                                <Button variant="outline-danger" 
                                    onClick={() => handleRemoveProduct()} 
                                    >Remove</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </li>
        </>
    )
}