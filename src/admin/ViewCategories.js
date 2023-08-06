import { getAllCategories } from "./adminApi";
import { Container } from "react-bootstrap";
import './CreateCategories.css'
import { useEffect, useState } from "react"; 
import SingleCategory from "./SingleCategory";
import AppModal from "../core/Modal";
import { deleteCategory } from "./adminApi";
import { isAuthenticated } from "../auth/auth";
import SuccessMessage from "../components/successAtlert";
import ErrorMessage from "../components/errorAtlert";

export default function ViewCategories(){
   const [data, setData] = useState([]);
    const {user, token} = JSON.parse(isAuthenticated());
    const [categoryState, setCategoryState] = useState({
        deletePopUp: false,
        categoryID: '',
        success: '',
        error: ''
    })

    const {deletePopUp,categoryID,success,error} =  categoryState;

    //send request for the order deletion
    function HandleDelete(){
        deleteCategory(user._id,categoryID,token).then(result => {
           if(result.error){
              setCategoryState(prev => ({
                ...prev,
                error: result.error,
                categoryID: ''
              })) 
              setTimeout(() => {
                setCategoryState(prev => ({
                    ...prev,
                    error: ''
                }))
            },4000) 
           }else{
                setCategoryState(prev => ({
                    ...prev,
                    success: result.success,
                    categoryID: ''
                }))
                setTimeout(() => {
                    setCategoryState(prev => ({
                        ...prev,
                        success: ''
                    }))
                },4000)
           }
        })
    }

    //sets the state to render the AppModal component from the viewCategories component
    function ShowModal(value){
        setCategoryState(prev => ({
            ...prev,
            categoryID: value,
            deletePopUp:!prev.deletePopUp
        }))
    }

    //sends the request to get all the event categories from the backend and sets to data state
    function HandleCategories(){
        getAllCategories().then(result => {
            if(result.error){
                console.log(result.error)
            }else{
                setData(result)
            }
        })
    }

    useEffect(() => {
        HandleCategories()
    },[success,error])

    
    return (
        <>
            {deletePopUp && <AppModal message='Do You Want To Delete This Category' action={HandleDelete}  state={ShowModal} />}
           <Container className='create-category-background' >
                <div className='category-heading-control'>
                    <h2 className='category-heading'>Available Categories</h2> 
                </div>
                {success && <SuccessMessage message={success} />}
                {error && <ErrorMessage message={error} />}
                <div className='create-category'>
                    <div className="view-categories-body"> 
                        <div>
                            {data.map((category,index) => (
                                <SingleCategory key={index} category={category} action={ShowModal}/>
                            ))}
                        </div>
                    </div>
                </div>
            
            </Container> 
        </>
    )
}