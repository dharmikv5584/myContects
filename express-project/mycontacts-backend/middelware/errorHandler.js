const errorHandler = (err,req,res,next) =>{
    const statuscode = res.statusCode ? res.statusCode : 500;

    switch (statuscode) {
        case 400:
            res.json({title :"Validation failed",message:err.message ,stackTrace:err.stack}); 
            break;

        case 401:
            res.json({title :"Unauthorized",message:err.message ,stackTrace:err.stack}); 
            break;

       case 403:
            res.json({title :"Server error",message:err.message ,stackTrace:err.stack}); 
            break;

        case 404:
            res.json({title :"Not Found",message:err.message ,stackTrace:err.stack}); 
            break;
            
        default:
            console.log("All Okay, NO Error!");
            break;
    }
};
 
module.exports=errorHandler;