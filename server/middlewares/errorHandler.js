export const errorHandler=(err,req,res,next)=>{
    let statuscode = 500
    let message = "Internal server error"
    if(err.name=="ValidationError"){
        const validationError = err.details[0].message
        statuscode = 400
        message =validationError
    }
    else if (err.code = 11000){
        const field = Object.keys(err.keyValue)[0];
        message = `${field} is already taken`
        statuscode = 400
    }

    return res.status(statuscode).json({
        message
    })
}