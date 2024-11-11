const jwt=require('jsonwebtoken');

function checkAuth(req,res, next){
    try{
        const token=req.headers.authprization.split("")[1];
        const decodeToken=jwt.verify(token,process.env.JWT_KEY);
        req.userData=decodeToken;
        next();

    }catch(e){
        return res.status(401).json({
            'message':"invalid or expired token",
            'error':e
        });

    }
}

module.exports={
    checkAuth:checkAuth
}