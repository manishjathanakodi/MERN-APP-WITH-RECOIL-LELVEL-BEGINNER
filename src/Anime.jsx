import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Card, Grid } from "@mui/material";
import { Typography, TextField, Button } from "@mui/material";
import { courseState } from './store/atoms/course';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseDetails, courseTitle } from './store/selectors/course';




function Anime() {
    let { id } = useParams();
    const courses = useRecoilValue(courseDetails)
    const [anime, setAnime] = useState({})
    const [course, setCourse] = useRecoilState(courseState);




    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/admin/animes/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setCourse({
                    course:response.data});
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])
    useEffect(() => {
        console.log(courses)
    },[courses])
  
  return (
    <div>
        <GrayTopper />
        <Grid container>
        <Grid item lg={8} md={12} sm={12}>
            <EditCard courses={courses}/>
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
            <AniCard />
            </Grid>
        </Grid>
    </div>
  )
}
function GrayTopper() {
    const title = useRecoilValue(courseTitle)
    return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}
function EditCard({courses}) {
   
    const [course, setCourse] = useRecoilState(courseState)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");

    
    useEffect(() => {
        setTitle(courses.title)
        setImage(courses.image)
        setPrice(courses.price)
        setDescription(courses.description)
    }, [courses])
    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update anime details</Typography>
        </div>
        <div style={{padding: 20}}>
        <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />

            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />

            <TextField
                value={image}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />
             <TextField
                value={price}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
            />
            <Button
                variant="contained"
                onClick={async () => {
                    axios.put("http://localhost:3000/admin/animes/" + courses._id, {
                        title: title,
                        description: description,
                        imageLink: image,
                        published: true,
                        price
                    }, {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                   
                    let updatedContent = {
                        _id: courses._id,
                        title: title,
                        description: description,
                        image: image,
                    };
                    setCourse({ course: updatedContent}); }
            }
            > Update course</Button>
        </div>

    </Card>
    </div>
   
}

function AniCard(){
    const courses = useRecoilValue(courseDetails)

    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
         <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={courses.image} style={{width: 350}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{courses.title}</Typography>
            <Typography variant="subtitle2" style={{color: "gray"}}>
                Price
            </Typography>
            <Typography variant="subtitle1">
                <b>Rs {courses.price} </b>
            </Typography>
        </div>
    </Card>
    </div>
}

export default Anime