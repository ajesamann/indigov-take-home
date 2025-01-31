import express from 'express';
import {
    addNewConstituentHandler,
    exportToCSVHandler,
    getAllConstituentsHandler,
    searchConstituentsByNameHandler,
} from '../controllers/constituentController';

const router = express.Router();

router.get('/', getAllConstituentsHandler);
router.post('/add', addNewConstituentHandler);
router.get('/export', exportToCSVHandler);
router.get('/search', searchConstituentsByNameHandler);

export default router;
