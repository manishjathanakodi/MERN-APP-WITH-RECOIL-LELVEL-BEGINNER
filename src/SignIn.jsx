import React from 'react'
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div>
        <div style={{paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"}}>
          
            <div style={{display: "flex", justifyContent: "center"}}>
                <Card varint={"outlined"} style={{width: 300, padding: 30, display: "flex", flexDirection: "column", gap: 10}}>
                    <Typography variant={"h6"}>
                        Welcome Back!
                    </Typography>
                    <TextField fullWidth={true}
                    label="Email"
                    variant="outlined"
                    onChange={(e)=>setEmail(e.target.value)}/>


                     <TextField fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    onChange={(e)=>setPassword(e.target.value)}/>

          

                   <Button size={"large"}
                    variant="contained" onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/admin/login",{
                            username: email,
                            password: password
                        })
                        let data = response.data
                        localStorage.setItem("token", data.token)
                        navigate("/admin/animes")

                    }
                    }>Sign In</Button>
                </Card>

            </div>
    </div>
    </div>
  )
}

export default SignIn