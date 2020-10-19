import { Router } from 'express'
import multer from 'multer';
import uploadConfig from './config/upload'

import StoresController from './controllers/StoresController'

const routes = Router();
const upload = multer(uploadConfig);
//padrao do controller - index, show, create, update e delete

routes.get('/stores', StoresController.index);
routes.get('/stores/:id', StoresController.show);
routes.post('/stores', upload.array('images'),StoresController.create);

export default routes