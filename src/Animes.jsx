import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { Button, Card, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";




function Animes() {
    const navigate = useNavigate();
const [animes, setAnimes] = useState([])
useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/admin/animes", {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          setAnimes(response.data.animes);
        
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();

    
},[])
  return (
    <div style={{display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap"}}>
        {
            animes.map((anime)=>{
                return (
                    <Card style={{     
                        margin: 10,
                        width: 300,
                        height: 300,
                        padding: 20}}>
                        <Typography variant={"h6"}>
                            {anime.title}
                        </Typography>
                        <img style={{width: "90%", height: "50%"}} src={anime.image} alt={anime.title}/>
                        <Typography variant={"h6"}>
                            {anime.description}
                        </Typography>
                        <Button variant="contained" size="large" onClick={()=>navigate(`/admin/animes/${anime._id}`)}>Edit</Button>
                    </Card>
                )
            })
        }

    </div>
  )
}

export default Animes