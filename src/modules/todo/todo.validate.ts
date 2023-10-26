import {body} from 'express-validator' 
import authRepository from '../auth/auth.repository' 

function todoValidator() {
    return[ 
        body('title')
            .not() 
            .isEmpty() 
            .withMessage("Title can not be empty")
            .isLength({min:8})
            .withMessage('Title must be at least 8 chars long '),
        body('description')
            .not() 
            .isEmpty() 
            .withMessage("Description year can not be empty")
            .isLength({min:8})
            .withMessage('Description must be at least 8 chars long '),
        body('priorety')
            .default(1)
            .isInt({min:1 , max: 4})
            .withMessage('Priorety must be between 0-4 '),
        body('authorId')
            .optional()
            .custom(async(userId:number) => {
                const user = await authRepository.retirieveById(userId)
                if(!user) throw new Error(`can not retrieve User with id ${userId} `)
            })
    
    ]
}





export default todoValidator