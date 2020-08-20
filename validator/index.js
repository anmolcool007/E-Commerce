exports.userSignupValidator = (req, res, next) =>{
    req.check("name", "Name is required").noEmpty();
    req.check("email", "Enter a Valid Email Address").noEmpty()
            .matches(/\S+@\S+\.\S+/)
            .withMessage("Enter a Valid Email");

    req.check("password", "Password is required").noEmpty();
    req.check("password")
        .isLength({min: 6})
        .withMessage("Password must contains atleast 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.message)[0];
        return res.status(400).json({error : firstError});
    }
    next();
};