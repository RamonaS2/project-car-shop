import { model as createModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './mongoModel';

const carMongooseSchema = new Schema<ICar>(
  { model: String,
    year: Number,
    color: String,
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number },
  {
    versionKey: false,
  },
);

class CarModel extends MongoModel<ICar> {
  constructor(model = createModel('Car', carMongooseSchema)) {
    super(model);
  }
}

export default CarModel;