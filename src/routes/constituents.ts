import express from 'express';
import {
    addNewConstituentHandler,
    exportAllCSVHandler,
    getAllConstituentsHandler,
    searchConstituentsByNameHandler,
} from '../controllers/constituentController';

const router = express.Router();

router.get('/', getAllConstituentsHandler);
router.post('/add', addNewConstituentHandler);
router.get('/export', exportAllCSVHandler);
router.get('/search', searchConstituentsByNameHandler);

export default router;
