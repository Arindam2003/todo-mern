const jwt = require('jsonwebtoken');
const JWT_SECRET = JWT_SEC;


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

}

module.exports={auth,JWT_SECRET}