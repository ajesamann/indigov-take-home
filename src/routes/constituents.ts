import express from 'express';
import {
    listConstituents,
    addConstituent,
    exportCSV,
} from '../controllers/constituentController';

const router = express.Router();

router.get('/', listConstituents);
router.post('/add', addConstituent);
router.get('/export', exportCSV);

export default router;
