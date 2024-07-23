import React from 'react'
import './RemovedUser.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function RemovedUser() {
  let [err,seterror]=useState("")
  let [users,setUsers]=useState([])
  let navigate=useNavigate()
  let restoreUser=(userObj)=>
    {
      axios.delete(`http://localhost:4000/removedUsers/${userObj.id}`)
        .then(res=>{
          getUsers()
        })
        .catch(err=>{
         console.log("error is ",err.message)
        })
      axios.post("http://localhost:4000/users",userObj)
      .then(response=>{
        // axios.get("http://localhost:4000/users")
        // .then(res=>{})
        // .catch(err=>{})
        navigate("/users")
      })
      .catch(err=>{})
    }
  let deleteUser=(userObj)=>
    {
      axios.delete(`http://localhost:4000/removedUsers/${userObj.id}`)
        .then(res=>{
         getUsers()
        //  console.log(users.length)
        //  if(users.length===0){navigate("/users")}
        })
        .catch(err=>{
         console.log("error is ",err.message)
        })
    }
    useEffect(()=>{
      getUsers()
    },[])
    let getUsers=()=>{
      axios.get("http://localhost:4000/removedUsers")
      .then(response=>{
       if(response.status===200){
        setUsers(response.data)
      }
     })
     .catch(err=>{
      seterror(err.message);
  })
    }
    let nav=()=>
      {
        navigate("/users")
      }
  return (
    <div className='removed-users'>
      <p className='display-3 text-center'>Removed Users</p>
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
              <button className='btn edit-btn float-start' onClick={()=>restoreUser(userObj)}>Restore</button>
              <button className='btn delete-btn float-end' onClick={()=>deleteUser(userObj)}>Delete</button>
              </div>
              </div>
          </div>
            )
          }
          </div>
          </div>
  )

}

export default RemovedUser