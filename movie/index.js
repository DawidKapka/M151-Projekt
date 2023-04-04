import { Router } from 'express';
import {
  listAction,
  removeAction,
  formAction,
  saveAction,
  rateAction,
} from './controller.js';

const router = Router();

router.get('/', listAction);
router.get('/delete/:id', removeAction);
router.get('/form/:id?', formAction);
router.post('/save', saveAction);
router.post('/rating/:id', rateAction)

export { router };
