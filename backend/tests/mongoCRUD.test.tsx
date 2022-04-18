import * as supertest from 'supertest';
import { expect } from '@jest/globals';
import app from '../src/app';
import Fact from '../src/models/factInterface';
import FactModel from '../src/models/fact';

const request = supertest(app);

describe('/api endpoint tests', () => {
  const dummyFact: Fact = { fact: 'test fact', length: 11 };

  beforeEach(async () => {
    await FactModel.deleteMany({});
    await FactModel.create(dummyFact);
  });

  afterEach(async () => {
    await FactModel.deleteMany({});
    expect((await FactModel.find(dummyFact)).length).toEqual(0);
  });

  it('should create a fact', async () => {
    const initialLength = (await FactModel.find(dummyFact)).length;
    const actual = await request.post(`/api/facts/`).send(dummyFact);
    const finalLength = (await FactModel.find(dummyFact)).length;
    expect(dummyFact.fact).toEqual(actual.body.fact);
    expect(dummyFact.length).toEqual(actual.body.length);
    expect(finalLength === initialLength + 1);
    expect(actual.statusCode).toEqual(200);
  });

  it('should read facts', async () => {
    const actual = await request.get('/api/facts');
    expect(actual.statusCode).toEqual(200);
    expect(actual.body.toString()).toContain(dummyFact.toString());
  });

  it('should update a fact', async () => {
    const updatedFact: Fact = { fact: 'test fact updated', length: 11 };
    const idToBeUpdated = (await FactModel.findOne(dummyFact))._id;

    const actual = await request
      .put(`/api/facts/${idToBeUpdated}`)
      .send(updatedFact);
    expect(actual.statusCode).toEqual(200);
    expect(actual.body.fact).toEqual(updatedFact.fact);
    expect(actual.body.length).toEqual(updatedFact.length);
    await FactModel.deleteMany(updatedFact);
    expect((await FactModel.find(updatedFact)).length).toEqual(0);
  });

  it('should delete a fact', async () => {
    const idToBeUpdated = (await FactModel.findOne(dummyFact))._id;
    const actual = await request.delete(`/api/facts/${idToBeUpdated._id}`);
    const findByIdFact = await FactModel.findById(idToBeUpdated);

    expect(actual.statusCode).toEqual(200);
    expect(actual.text).toContain(idToBeUpdated.toString());
    expect(findByIdFact).toBeNull();
  });
});
