import express from 'express'
import userController from '../controllers/userController'
const router = express.Router()

router.get('/', userController.getAll)
router.get('/:user_id', userController.getById)
router.post('/', userController.store)
router.delete('/:user_id', userController.deleteUser)

export default router