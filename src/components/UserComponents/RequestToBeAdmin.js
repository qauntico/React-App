import Button from 'react-bootstrap/Button';
import { adminRequest, cancelUserRequest } from '../../admin/adminApi';
import { isAuthenticated } from '../../auth/auth';
import SuccessMessage from '../successAtlert';
import ErrorMessage from '../errorAtlert'
import { useState } from 'react';

export default function RequestToBeAdmin(){
    const [feedBack, setFeedBack] = useState({
        errorMessage: '',
        successMessage: ''
    })

    //destructure state
    const {errorMessage, successMessage} = feedBack;

    //get user token and id
    const {user,token} = JSON.parse(isAuthenticated());
    const {_id} = user

    function SendRequest(){
        adminRequest(token,_id).then(result => {
            if(result.error){
                setFeedBack({successMessage: '', errorMessage: result.error})
            }else{
                setFeedBack({successMessage: result.success, errorMessage: ''})
            }
        })
    }

    function CancelAdminRequest(){
        cancelUserRequest(token,_id).then(result => {
            if(result.error){
                setFeedBack({successMessage: '', errorMessage: result.error})
            }else{
                setFeedBack({successMessage: result.success, errorMessage: ''})
            }
        })
    }
    return (
        <>
           
            <div className="admin-request-background">
                {successMessage && <SuccessMessage message={successMessage} />}
                {errorMessage && <ErrorMessage message={errorMessage} />} 
                <div className="admin-request-body">
                        <p>Do You Wish To send a Request To The Admins To Be an Event Lister. You Will Have The Benefits To List Out Events And Sell Tickets</p>
                        <div className="admin-request-buttons">
                            <Button variant="secondary" onClick={SendRequest}>Request</Button>
                            <Button variant="outline-danger" onClick={CancelAdminRequest}>Cancel</Button>
                        </div>
                </div>
            </div>
        </>
    )
}