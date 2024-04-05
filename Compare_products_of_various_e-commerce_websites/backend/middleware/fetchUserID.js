const express = require('express')
const JWT_SECRET = "This is a secret"
let jwt = require('jsonwebtoken');
const fetchUserID = (req,res,next)=>{

    // fetchUserID using authtoken

    let success = false;

    try{

        console.log("I  here1\n")
        const authtoken = req.header("authtoken")
        console.log("Printing auth token")
        console.log(authtoken)
        console.log("I  here2\n")
    if (!authtoken){
        return res.status(400).json({ success,error:"Please enter a valid token" });
    }
    console.log("I  here3\n")

    //  const data = jwt.verify(token, JWT_SECRET);

    // const data = jwt.verify(JWT_SECRET,authtoken)
    const data = jwt.verify(authtoken,JWT_SECRET)

    console.log("I  here4\n")
    req.user = data.user //   so that u can access its id in other components as well DOUBT:HOW req.user CAME????

    console.log("I  here5\n")
    next() // trigger the next component after this middleware EG router.get('/getuser',fetchUserID,async(req,res)=>{ here after Middlware fetchUserID, async(req,res) will be triggered using next()
    
    console.log("I  here6\n")

    }catch(error){
        return res.status(400).json({ success,error: error.message});
    }

    



}

module.exports = fetchUserID