import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { carMocksId, carMocks, carUpdate, carUpdateId } from '../../mocks/carMocks';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;



describe('Car Model', () => {
  const carsModel = new CarModel();
  before(async () => {
    sinon.stub(Model, 'create').resolves(carMocksId);
    sinon.stub(Model, 'find').resolves([carMocksId]);
    sinon.stub(Model, 'findOne').resolves(carMocksId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carUpdateId);
    sinon.stub(Model, 'findOneAndDelete').resolves(carMocksId);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Create', () => {
    it('Caso de sucesso', async () => {
      const response = await carsModel.create(carMocks);
      expect(response).to.be.deep.equal(carMocksId);
    });
  });

  describe('Read', () => {
    it('Busca todos os carros', async () => {
      const response  = await carsModel.read();
      expect(response ).to.be.deep.equal([carMocksId]);
    });
    it('Se busca pelo id', async () => {
      const response  = await carsModel.readOne(carMocksId._id);
      expect(response ).to.be.deep.equal(carMocksId);
    });
  
  });

  describe('Update', () => {
    it('Se atuaçiza o carro', async () => {
      const response  = await carsModel.update(carMocksId._id, carUpdate);
      expect(response ).to.be.deep.equal(response );
    });
 
  });

  describe('Delete', () => {
    it('Se apaga um carro', async () => {
      const response  = await carsModel.delete(carMocksId._id);
      expect(response ).to.be.deep.equal(carMocksId);
    });
  
  });
});