import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';//npm i react-router-dom

export default function EditUser() {

    
    const {id}=useParams()

    //This React script uses the useState hook to define a state variable called user, 
    //which is an object with three properties: name, username, and email.
    const [user,setUser]=useState(
        {
            //The useState hook takes an initial state value as its argument, which is an object in this case. The initial values for the name, username, and email properties are all set to empty strings.
            name:"",
            username:"",
            email:""
        }
    )



    const loadUser=async()=>{
        //http get request FROM DB TO UI
        const result=await axios.get(`http://localhost:8080/userManagement/getUser/${id}`)
        setUser(result.data)
    }

    useEffect(()=>{
        loadUser();
      },[]);


    //This creates three separate variables (name, username, and email) with the same values as the corresponding properties of the user object.
    //3 farkli variable html form ile value assign edilecekler
    const{name,username,email}=user
   
    // onInputChange function in a React component, which is called whenever there is a change event on an input field.
    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
        // e.target.name->> expression as the property key, which corresponds to the name attribute of the input field that triggered the event.
        //e.target.value->> corresponds to the new value entered by the user in the input field.
    }
    
    let navigate=useNavigate()


    //The function takes an event object e as its argument, 
    //which is automatically passed to the function by the browser when the form is submitted.
    const onSubmit=async(e)=>{
        
        //When an event is triggered, such as a form submission, 
        //the default behavior of the event is to reload the page or perform some other default action. 
        //By calling e.preventDefault(), you can prevent this default behavior from occurring and instead handle the event in a custom way using JavaScript.
        e.preventDefault();//submit event'inin default davranisini engelle asagiya kendimiz yeni davranislari yazalim

        //HTTP PUT REQUEST WITH JS OBJECT FROM UI TO DB
        await axios.put(`http://localhost:8080/userManagement/updateUser/${id}`,user)
        navigate("/");//once onSubmit invoked, reactApp will navigate "/" path 
    }



  return (
    <div className='container'>
        <div className='row'>
            
            <div className='col-md-6 offset-md-3 border rounded p-3 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit a User</h2>
              
                <form onSubmit={(e)=>onSubmit(e)}>  {/*The function is called whenever the form is submitted by the user. */}
                    <div className='mb-3'>
                        {/*By setting htmlFor='Name', the label element is associated with an input element that has a name attribute with a value of "Name". So when the user clicks on the label element, the corresponding input element will be focused on. */}
                        <label htmlFor='Name' className='form-label'>Name</label>
                        <input type={"text"} className="form-control" placeholder='Enter your name' name='name' value={name} onChange={(e)=>onInputChange(e)}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='UserName' className='form-label'>UserName</label>
                        <input type={"text"} className="form-control" placeholder='Enter your UserName' name='username' value={username} onChange={(e)=>onInputChange(e)}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Email' className='form-label'>E-mail</label>
                        <input type={"text"} className="form-control" placeholder='Enter your Email' name='email' value={email} onChange={(e)=>onInputChange(e)}/>
                    </div>

                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to="/" >Cancel</Link>
                </form>
            </div>

            
        </div>

    </div>
  )
}
