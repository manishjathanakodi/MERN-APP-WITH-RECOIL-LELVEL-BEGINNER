import React from 'react'
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import axios from "axios";

function AddAnime() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
  return (
    <div>
        <div style={{paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"}}>
          
            <div style={{display: "flex", justifyContent: "center"}}>
                <Card varint={"outlined"} style={{width: 300, padding: 30, display: "flex", flexDirection: "column", gap: 10}}>
                    <Typography variant={"h6"}>
                        Add your Anime
                    </Typography>
                    <TextField fullWidth={true}
                    label="Title"
                    variant="outlined"
                    onChange={(e)=>setTitle(e.target.value)}/>


                     <TextField fullWidth={true}
                    label="Image"
                    variant="outlined"
                    onChange={(e)=>setImage(e.target.value)}/>

                    <TextField fullWidth={true}
                    label="Description"
                    variant="outlined"
                    onChange={(e)=>setDescription(e.target.value)}/>

          

                   <Button size={"large"}
                    variant="contained" onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/admin/addcontent",{
                            title: title,
                            image: image,
                            description: description
                        },{
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        alert("Content Added!")
                    
                    }
                    }>Add</Button>
                </Card>

            </div>
    </div>
    </div>
  )
}

export default AddAnime