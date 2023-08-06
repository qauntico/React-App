import { Button } from "react-bootstrap";

export default function SingleCategory({category,action}){
    
    return (
        <>
            <div className="single-category">
                <p>{category.name}</p>
                <Button  variant="outline-danger" onClick={() => action(category._id)}>Delete</Button>
            </div>
        </>
    )
}