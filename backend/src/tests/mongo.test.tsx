import { MongoClient } from 'mongodb';
import CatFact from '../models/fact';
const dbConnectionString = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
const colectionName = 'Facts';
const dbName = 'test-mongo-db';
describe('CRUD', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(dbConnectionString);
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    await db.collection(colectionName).deleteMany({});
  });

  it('should create and read one fact', async () => {
    const facts = db.collection(colectionName);
    const mockFact = await insertFact(2, facts);

    const insertedFact = await facts.findOne({ _id: 2 });
    expect(insertedFact).toEqual(mockFact);
    // Apelat endpoint
    // Vazut daca aduce dupa ceea ce am salvat
    //denumit variabile ok (db in loc de facts)
  });

  it('should update one fact', async () => {
    const facts = db.collection(colectionName);
    await insertFact(3, facts);

    await facts.updateOne({ _id: 3 }, { $set: { length: 22 } });
    const insertedUser = await facts.findOne({ _id: 3 });

    expect(insertedUser.length).toEqual(22);
  });

  it('should delete one fact', async () => {
    const facts = db.collection(colectionName);
    await insertFact(4, facts);

    await facts.deleteOne({ _id: 4 });
    const insertedUser = await facts.findOne({ _id: 4 });

    expect(insertedUser).toBeNull();
  });

  const insertFact = async (id: number, db) => {
    let fact = 'They are cute';
    let length = fact.length;
    const mockFact = { _id: id, fact: fact, length: length };
    await db.insertOne(mockFact);
    return mockFact;
  };
});
