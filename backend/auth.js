const jwt = require('jsonwebtoken');
const JWT_SECRET = "s3cret";


function auth(req,res,next)
{
    const token =req.headers.auth;

    const response=jwt.verify(token,JWT_SECRET);
    if(response)
    {
        req.userId=response.id;
        next();
    }else{
        res.json({
            message:"Invalid credential"
        })
    }
    //690f81ec2705842fbd7bef91

}

module.exports={auth,JWT_SECRET}