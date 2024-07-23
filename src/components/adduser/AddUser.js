import React from 'react'
import './AddUser.css'
import {useForm } from 'react-hook-form'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function AddUser() {
  let navigate=useNavigate();
  let {register,handleSubmit,formState:{errors}}=useForm()
  let[err,seterror]=useState("");
  let addNewUser=(newUser)=>{
    axios.post("http://localhost:4000/users",newUser)
    .then(response=>{
      if(response.status===201){
        seterror("");
        navigate("/users")
      }
    })
    .catch(err=>{
      seterror(err.message)
    })
  }
  return (
    <div className='add-user'>
      <p className='display-3 text-center'>Add New User</p>
      {err.length!==0 && <p className='text-danger display-3 fw-bold text-center'>{err}</p>}
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(addNewUser)}>
            <div className="mb-3">
              <label htmlFor="name" className='fw-bold'>Name</label>
              <input type="text" id="name" className="form-control" 
              {...register("name",{required:true})}/>
            </div>
            {errors.name?.type==="required" && <p className='text-danger fw-bold'>*Name is required</p>}
            <div className="mb-3">
              <label htmlFor="email" className='fw-bold'>Email</label>
              <input type="emailtext" id="email" className="form-control" 
              {...register("email",{required:true})}/>
              {errors.email?.type==="required" && <p className='text-danger fw-bold'>*email is required</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="dob " className='fw-bold'>Date Of Birth</label>
              <input type="date" id="dob" className="form-control" 
              {...register("dob",{required:true})}/>
              {errors.dob?.type==="required" && <p className='text-danger fw-bold'>*date of birth is required</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="img" className='fw-bold'>User Image</label>
              <input type="text" id="img" className="form-control" 
              {...register("img",{required:true})}/>
              {errors.img?.type==="required" && <p className='text-danger fw-bold'>*image is required</p>}
            </div>
            <button type="submit" className='btn adduser-btn'>Create User</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUser