
import { Router } from 'express';
import FlatController from '../controllers/flatController.js';

const flatRouter = Router()

flatRouter.post('', FlatController.addFlat)
flatRouter.get('', FlatController.getFlats)
flatRouter.put('/:flatId', FlatController.editFlat)
flatRouter.delete('/:flatId', FlatController.deleteFlat)

export default flatRouter