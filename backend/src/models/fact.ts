import * as mongoose from 'mongoose';

const factsSchema = new mongoose.Schema({
  fact: String,
  length: Number,
});

const Fact = mongoose.model('Fact', factsSchema);
export default Fact;
