import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUser() {

   //This React script uses the useState hook to define a state variable called user, 
    //which is an object with three properties: name, username, and email.
    const [user,setUser]=useState(
        {
            //The useState hook takes an initial state value as its argument, which is an object in this case. The initial values for the name, username, and email properties are all set to empty strings.
            name:"",
            username:"",
            email:""
        }
    );

    const {id}=useParams();

    useEffect(
        ()=>{ loadUser(); },[]
      );

    const loadUser=async()=>{
        //http get request FROM DB TO UI
        const result=await axios.get(`http://localhost:8080/userManagement/getUser/${id}`);
        setUser(result.data);
    };

  


  return (
    <div className='container'>
        <div className='row '>    
            <div className='col-md-6 offset-md-3 border rounded p-3 mt-2 shadow bg-success'>
                <h2 className='text-center m-4 bg-gradient'>User Details</h2>
        
                <div className='card bg-light'>
                    <div className='card-header'>
                        <b>Details of user id:</b>{user.id}
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Name:</b>
                                {user.name}
                            </li>
                            <li className='list-group-item'>
                                <b>UserName:</b>
                                {user.username}

                            </li>
                            <li className='list-group-item'>
                                <b>E-mail:</b>
                                {user.email}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-outline-light mt-3' to={"/"}>Back to Home</Link>
            </div>
        </div>
    </div>
  );
}
