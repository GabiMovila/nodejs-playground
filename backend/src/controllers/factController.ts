import * as express from 'express';
import Fact from '../models/fact';
import * as asyncHandler from 'express-async-handler';

const getCatFacts = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const facts = await Fact.find();
    res.send(facts);
  }
);

const postCatFact = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const fact = new Fact(req.body);
    fact.save();
    res.send(fact);
  }
);

const updateCatFact = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const fact = await Fact.findById(req.params.id);
    if (!fact) {
      res.status(404);
      throw new Error('Fact not found');
    }
    await Fact.findByIdAndUpdate(req.params.id, req.body);
    res.send(req.body);
  }
);

const deleteCatFact = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const fact = await Fact.findById(req.params.id);
    if (!fact) {
      res.status(404);
      throw new Error('Fact not found');
    }
    await Fact.findByIdAndDelete(req.params.id);
    res.send(req.params.id);
  }
);

export { postCatFact, getCatFacts, updateCatFact, deleteCatFact };
