import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from './store/atoms/user'
import { userEmailState } from './store/selectors/user'

function Appbar() {
    const navigate = useNavigate()
    // const [userEmail, setUserEmail] = useState("")
    const userEmail = useRecoilValue(userEmailState)
    const [user, setUser] = useRecoilState(userState);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/admin/me", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
            })
             if(response.data.username){
                setUser({userEmail: response.data.username})
            }
            }
            catch (error) {
                setUser({
                    userEmail: null
                })
            }
        }
        fetchData()
    },[userEmail])

    useEffect(()=>{
        console.log(userEmail)
        console.log(user)
    },[userEmail])

    if(!userEmail){
        return (
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                AnimCorseIT
                
                <div style={{display: "flex", gap: 10}}>
                    <Button variant="contained" onClick={()=>navigate("/admin/signup")} >SignUp</Button>
                    <Button variant="contained" onClick={()=>navigate("/admin/signin")}>SignIn</Button>
        
                </div>
            </div>
          )
                
    }
    else{
        return (
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            AnimCorseIT
           
            <div style={{display: "flex", gap: 10}}>
                <Button variant="contained" onClick={()=>navigate("/admin/animes")}>Animes</Button>
                <Button variant="contained" onClick={()=>navigate("/admin/addcontent")}>Add anime</Button>
                <Button variant="contained" onClick={()=>{localStorage.removeItem("token");navigate("/admin/login"); window.location.reload()}} >Logout</Button>

    
            </div>
        </div>
        )
    }
  
}

export default Appbar