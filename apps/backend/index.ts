import express from 'express';
import {prismaClient} from '@repo/db/client'

const app = express();

app.use(express.json());

app.get('/users', async(req,res)=>{
    const user = await prismaClient.user.findMany()
    if(user){
        res.status(200).json({
            message: "Login successful",
            userId:user
        })
    }
    else {
        res.status(401).json({
            message: "Invalid username or password"
        })
    }
})


app.post('/users', async(req, res)=>{
    const {username, password} = req.body;
    const user = await prismaClient.user.create({
        data:{
            username,
            password
        }
    })

    if(user){
        res.status(200).json({
            message: "User created successfully",
            userId:user.id
        })
    }
    else {
        res.status(500).json({
            message: "User creation failed"
        })
    }
    
})


app.listen(8080,()=>{
    console.log('Server is running on port 3001');
})