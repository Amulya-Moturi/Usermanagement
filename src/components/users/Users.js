import './Users.css'
import axios from 'axios'
import { useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import {useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
function Users() {
  let navigate=useNavigate();
  let [users,setUsers]=useState([])
  let [err,seterror]=useState("")
  let [show,setShow]=useState(false)
  let [usertoedit,setusertoedit]=useState({})
  let [usertodelete,setusertodelete]=useState({})
  let showModal=()=>setShow(true);
  let closeModal=()=>setShow(false);
  let {register,handleSubmit,formState:{errors},setValue,getValues}=useForm()
  let editUser=(userObj)=>{
    showModal()
    setusertoedit(userObj)
    setValue("name",userObj.name)
    setValue("email",userObj.email)
    setValue("dob",userObj.dob)
    setValue("img",userObj.img)
  }
  let deleteUser=(userObj)=>{
    // setusertoedit(userObj)
    // let modify=getValues()
    // console.log("usertoedit is ",usertoedit)
    // console.log("modify is ",modify)
    // modify.id=usertoedit.id
    axios.delete(`http://localhost:4000/users/${userObj.id}`)
        .then(res=>{
          getUsers()
        })
        .catch(err=>{
         console.log("error is ",err.message)
        })
    axios.post("http://localhost:4000/removedUsers",userObj)
    .then(response=>{
         navigate("/removedusers")
    })
    .catch(err=>{
      seterror(err.message)
    })
  }
let saveUser=()=>{
  closeModal()
  let modify=getValues()
  modify.id=usertoedit.id
  console.log("id ",modify.id)
  axios.put(`http://localhost:4000/users/${modify.id}`,modify)
  .then(res=>{
    if(res.status===200){
      getUsers()
    }
  })
  .catch(err=>{
console.log(err)
  })
}
  useEffect(()=>{
    getUsers()
  },[])

  let getUsers=()=>{
    axios.get("http://localhost:4000/users")
    .then(response=>{
      if(response.status===200){
        setUsers(response.data)
      }
    })
    .catch(err=>{
      seterror(err.message);
    })
  }
  return (
    <div className='users'>
      <p className='display-3 text-center'>Users</p>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {
          users.map((userObj)=>
            <div className="col text-center mx-auto" key={userObj.id}>
              
          <div className="card">
            <img src={userObj.img} className='mx-auto p-3 profile' alt=""/>
            <div className='card-body'>
              <p className='display-3 name'>{userObj.name}</p>
              <p className='lead fs-4'>{userObj.email}</p>
              <p className='lead'>DOB: {userObj.dob}</p>
              
              <button className='btn edit-btn float-start' onClick={()=>editUser(userObj)}>Edit</button>
              <button className='btn delete-btn float-end' onClick={()=>deleteUser(userObj)}>Delete</button>
              </div>
              </div>
          </div>

            )
        }
      </div>
      <Modal show={show} onHide={closeModal} backdrop='static' centered className='modal'>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className='fw-bold'>Name</label>
              <input type="text" id="name" className="form-control" 
              {...register("name",{required:true})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className='fw-bold'>Email</label>
              <input type="emailtext" id="email" className="form-control" 
              {...register("email",{required:true})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="dob " className='fw-bold'>Date Of Birth</label>
              <input type="date" id="dob" className="form-control" 
              {...register("dob",{required:true})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="img" className='fw-bold'>User Image</label>
              <input type="text" id="img" className="form-control" 
              {...register("img")} disabled/>
            </div>
          </form>
        </Modal.Body>
      <Modal.Footer>
        <button className="btn save-btn" onClick={saveUser}>Save</button>
      </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Users