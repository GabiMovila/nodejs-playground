import * as express from 'express';
import {
  postCatFact,
  getCatFacts,
  updateCatFact,
  deleteCatFact,
} from '../controllers/factController';

const router = express.Router();

router.get('/', getCatFacts);

router.post('/', postCatFact);

router.put('/:id', updateCatFact);

router.delete('/:id', deleteCatFact);

module.exports = router;
