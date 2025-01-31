import express from 'express';
import {
    addNewConstituentHandler,
    exportCSVHandler,
    getAllConstituentsHandler,
    searchConstituentsByNameHandler,
} from '../controllers/constituentController';

const router = express.Router();

router.get('/', getAllConstituentsHandler);
router.post('/add', addNewConstituentHandler);
router.get('/export', exportCSVHandler);
router.get('/search', searchConstituentsByNameHandler);

export default router;
