export const errorHandler=(err,req,res,next)=>{
    let statuscode = 500
    let message = "Internal server error"
    if(err.name=="ValidationError"){
        const validationError = err.details[0].message
        statuscode = 400
        message =validationError
    }
    else if (err.code === 11000) {
        if (err.keyValue) {
            const field = Object.keys(err.keyValue)[0];
            message = `${field} is already taken`;
            statuscode = 400;
        } else {
            console.error("Duplicate key error without keyValue:", err);
            message = "Duplicate key error";
            statuscode = 400;
        }
    }
    else {
        // Gère les erreurs non prévues
        console.error("Unhandled error:", err); // Log pour le développeur
        message = err.message || "Something went wrong";
    }
    return res.status(statuscode).json({
        message
    })
}