import express from 'express';
import {
    listConstituents,
    addConstituent,
    exportCSV,
    searchConstituentsByName,
} from '../controllers/constituentController';

const router = express.Router();

router.get('/', listConstituents);
router.get('/search', searchConstituentsByName);
router.post('/add', addConstituent);
router.get('/export', exportCSV);

export default router;
