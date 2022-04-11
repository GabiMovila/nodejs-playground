import * as express from 'express';
import Fact from '../models/fact';

const getCatFacts = async (req: express.Request, res: express.Response) => {
  try {
    const facts = await Fact.find();
    res.send(facts);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(`Something went wrong`);
  }
};

const postCatFact = async (req: express.Request, res: express.Response) => {
  try {
    const fact = new Fact(req.body);
    fact.save();
    res.send(`1 cat fact insterted: ${fact}`);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(`Something went wrong`);
  }
};
const updateCatFact = (req: express.Request, res: express.Response) => {
  const dummy = 2;
};

const deleteCatFact = (req: express.Request, res: express.Response) => {
  const dummy = 2;
};

export { postCatFact, getCatFacts, updateCatFact, deleteCatFact };
