const errorHandle = (err,req,res,next) => {
    let error = {...err}
    error.message = err.message,
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Internal Server Error'
    })
}

module.exports = errorHandle