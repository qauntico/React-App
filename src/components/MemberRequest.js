import { useContext } from 'react';
import CartContex from '../Contex/Cart-Contex';
import { acceptUserRequest, cancelUserRequest } from '../admin/adminApi';
import { isAuthenticated } from '../auth/auth';
import './AdminDashBoardDesign.css';


export default function MemberRequest({members,requestState}){
    const data = useContext(CartContex);
    const {user, token} = JSON.parse(isAuthenticated());
    function ChangeUserToAdmin(){
        acceptUserRequest(user._id,token,members.user._id).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                requestState()
            }
        })
    }

    function CancelUserRequest(){
        cancelUserRequest(token,members.user._id).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                requestState()
            }
        })
    }

    function UserProfileInfo(){
        data.UpdateProfile(members)
    }
    
    return (
        <li className="completed" onClick={UserProfileInfo}>
            <div className="task-title">
                
                <p>{members.user.name}</p>
            </div>
            <div className="AcceptDeclineUser">
                <button onClick={ChangeUserToAdmin}>
                    <i className='bx bx-check-circle'></i>
                </button>
                <button onClick={CancelUserRequest}>
                    <i className='bx bx-x-circle'></i>
                </button>
            </div>
        </li>
    )
}