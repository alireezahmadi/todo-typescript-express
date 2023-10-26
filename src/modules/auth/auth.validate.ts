import {body} from 'express-validator'  

function AuthValidator() {
    return [
        body('email')
            .not() 
            .isEmpty() 
            .withMessage('Email can not be empty ')
            .isEmail() 
            .withMessage('Invalid email address '),

        body('password')
            .isLength({min:8})
            .withMessage('Password must be at least 8 chars long ')
            .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d)/)
            .withMessage('Password must contain string, at least one special and one numeric character')
    ]
}

export default AuthValidator

