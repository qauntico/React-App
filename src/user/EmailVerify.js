import { useEffect, useState } from 'react';
import './EmailVerify.css';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import success from './image/goodtick.jpg'
import { Link, useParams } from 'react-router-dom';
import { VerifyEmail } from './userApi/userApi';


export default function EmailVerify(){
    const [validUrl, setValidUrl] =useState(false);
    const param = useParams();
    console.log(param)
    useEffect(() => {
        VerifyEmail(param.id,param.token).then(result => {
            if(result.error){
                setValidUrl(false)
            }else{
                setValidUrl(true)
            }
        })
    },[param])
    return (
        <>
           {!validUrl ? (
            <div className='container valid-email'>
                <img src={success} alt='verified' className='success_img'/>
                <h1>Email verified successfully</h1>
                <Link to='/signin'>
                   <button className='validButton'>Login</button> 
                </Link>
            </div>
           ): <div>
                <ErrorPage />
            </div>} 
        </>
    )
}