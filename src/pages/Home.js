import React, { useEffect, useState } from 'react';//is importing the React library, as well as two React hooks, useEffect and useState, into a JavaScript or TypeScript file.
//npm i axios
import axios from 'axios';                         //is importing the axios library into a JavaScript or TypeScript file.
import { Link, useParams } from 'react-router-dom';
/*
Axios is a popular open-source library that provides an easy-to-use interface for making HTTP requests from JavaScript or TypeScript. It allows developers to send requests to web servers and receive responses using a promise-based syntax.
With axios, you can send GET, POST, PUT, and DELETE requests, as well as handle request and response interceptors, configure timeouts, and more.
*/
export default function Home() {

  /*
  This code defines a React component using a functional component syntax, and creates 
  a state variable called users and 
  a function to update that state variable called setUsers.

  The useState hook is used to create this state variable and its updater function. 
  The useState hook is a built-in hook in React that allows functional components to have state variables. 
  The initial value of the users state variable is set to an empty array ([]) using the useState hook.
  */
  const [users,setUsers]=useState([])
  
  const {id}=useParams()

  /*
  The useEffect hook is used to GET user data from an API endpoint when the component mounts 
  (i.e. when the component is first rendered on the page). 
  */
  useEffect(()=>{
    loadUsers();
  },[]);
  //[] ILE loadUsers(); SADECE BIR KEZ CALISIR
 
  const loadUsers=async () => {
    //HTTP GET REQUEST TO THE ENDPOINT
    const result=await axios.get("http://localhost:8080/userManagement/getAllUsers");
    
    //The fetched data is then used to update the users state variable using the setUsers function.
    setUsers(result.data);
  }


  const deleteUser=async (id)=>{
    //HTTP DELETE REQUEST
    await axios.delete(`http://localhost:8080/userManagement/deleteUser/${id}`)
    loadUsers()
  }

  const deleteAllUsers=async ()=>{
    //HTTP DELETE REQUEST
    await axios.delete(`http://localhost:8080/userManagement/deleteAllUsers`)
    loadUsers()
  }

  /*
  In this React script, className is used to define the CSS class for the HTML elements.
  React uses className instead of class because class is a reserved keyword in JavaScript, so React uses the className attribute to define classes for HTML elements instead.
  */
  return (
    <div className='container'>
        <div className='py-4'>
          <table className="table border shadow">
            
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">User ID</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
               
                {/* 
                    The users state variable is then used to render a list of user names in the component's output. 
                    The map function is used to create a list item for each user object in the users array. 
                    FOREACH LOOP(User user:UserArray), index ise her user objesinin arraydeki indexi
                    The scope="row" attribute specifies that the <th> element is a header cell for a row.
                    key={index} attribute assigns a unique key to each header cell, which is important for React to efficiently update and re-render the table when needed.
               */}
                {
                  users.map((user,index)=>(
                    <tr>
                    <th scope="row" key={index}>{index+1}</th>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td> 
                    <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>View</Link>
                    <Link className='btn btn-outline-success mx-2' to={`/edituser/${user.id}`}>Edit</Link>
                    <button className='btn btn-danger mx-2' onClick={()=>deleteUser(user.id)}>Delete</button>
                    </td>
                    </tr>
                  ))
                }
                <tr>
                    <td colSpan="6" className="text-end">
                      <button className="btn btn-outline-warning" disabled onClick={()=>deleteAllUsers()} style={{ marginRight: '55px' , width: '215px'}} >
                        Delete All Users
                      </button>
                    </td>
                </tr>
                 
            </tbody>
            </table>
        </div>

    </div>
  )
}
