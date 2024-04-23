const mongoose = require('mongoose')
const express = require('express')
const {Admin, Content} = require('../db')
const jwt = require('jsonwebtoken')
const {authenticateJwt, SECRET}  = require('../middleware/auth')


const router = express.Router()

router.get("/me", authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
});



router.post('/signup', (req,res)=>{
    const {username, password} = req.body


    Admin.findOne({username}).then(admin=>{
        if(admin){
            res.status(403).json({message:'User already exists'})
        }
        else{
            const newAdmin = new Admin({
                username,
                password
            })
            newAdmin.save()
            const token = jwt.sign({username, password}, SECRET, {expiresIn:'4h'})

            res.status(200).json({message:'User created', token})
        }
    })
})

router.post('/login', (req,res)=>{
    const {username, password} = req.body
    Admin.findOne({username, password}).then(admin=>{
            if(admin){
                const token = jwt.sign({username, password}, SECRET, {expiresIn:'4h'})
                res.status(200).json({message:'Login successful', token})
            }
            else{
                res.status(403).json({message:'Invalid credentials'})
            }
    })
})

router.post('/addcontent', authenticateJwt, async (req, res)=>{
  const newContent = new Content(req.body)
   await newContent.save()
    res.status(200).json({message:'Content added', contentId: newContent._id})
})

router.get('/animes', authenticateJwt, async (req, res)=>{
    const animes = await Content.find()
    res.status(200).json({animes})
})

router.get('/animes/:id', authenticateJwt, async (req, res)=>{
    const animeId = req.params.id
    const anime = await Content.findById(animeId)
    res.status(200).json(anime)
})
router.put('/animes/:id', authenticateJwt, async (req, res)=>{
    const anime = await Content.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if (anime) {
        res.json({ message: 'Anime updated successfully' });
      } else {
        res.status(404).json({ message: 'Anime not found' });
      }
})

module.exports = router