import {query} from 'express-validator' 

function queryValidator(){
    return[
        query('priorety')
            .optional()
            .isIn(['ASC', 'DESC'])
            .withMessage('Priorety must be between ASC and DESC!'),
        query('createdAt')
            .optional()
            .isIn(['ASC', 'DESC'])
            .withMessage('CreatedAt must be between ASC and DESC!'),
    ]
}

export default queryValidator