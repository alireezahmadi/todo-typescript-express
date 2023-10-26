import {body} from 'express-validator'

export default function searchValidator(){
    return [

        body('priorety')
            .optional()
            .isInt({min:0, max:4})
            .withMessage('Priorety must be between 1 and 4!'),
        body('startDate')
            .optional()
            .isDate()
            .withMessage('StartDate must be Date type !'),
        body('endDate')
            .optional()
            .isBoolean()
            .withMessage('EndDate must be Date type !'),
        body('active')
            .optional()
            .isBoolean()
            .withMessage('Active must be Boolean type !'),
    ]
}