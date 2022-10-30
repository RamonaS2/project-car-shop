import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
import { carMocksId, carMocks, carUpdateId, carUpdate } from '../../mocks/carMocks';
import { any } from 'joi';
const { expect } = chai;

describe('Car Service', () => {
  const carsModel = new CarModel();
  const carsService = new CarService(carsModel);

  before(async () => {
    sinon.stub(carsModel, 'create').resolves(carMocksId);
    sinon.stub(carsModel, 'read').resolves([carMocksId]);
    sinon.stub(carsModel, 'readOne').onCall(0).resolves(carMocksId).onCall(1).resolves(null);
    sinon.stub(carsModel, 'update').onCall(0).resolves(carUpdateId).onCall(1).resolves(null);
    sinon.stub(carsModel, 'delete').onCall(0).resolves(carMocksId).onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Create', () => {
    it('em caso de sucesso', async () => {
      const response  = await carsService.create(carMocks);
      expect(response ).to.be.deep.equal(carMocksId);
    });
    it('Em caso de erro', async () => {
      let error;
      try {
        await carsService.create({});
      } catch(err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Read', () => {
    describe('Lista os carros', () => {
      it('lista carros', async () => {
        const response  = await carsService.read();
        expect(response ).to.be.deep.equal([carMocksId])
      });
    });
    describe('lista pelo id', () => {
      it('se tiver sucesso', async () => {
        const response  = await carsService.readOne(carMocksId._id)
        expect(response ).to.be.deep.equal(carMocksId);
      });
      it('Em caso de error', async () => {
        let error;

        try {
          await carsService.readOne(carMocksId._id);
        } catch(err: any) {
          error = err;
        }
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      });
    });
  });

  describe('Update', () => {
    describe('Em caso de sucesso', () => {
      it('Se localiza pelo id', async () => {
        const response  = await carsService.update(carUpdateId._id, carUpdate);
        expect(response ).to.be.deep.equal(carUpdateId);
      });
      it('Em caso de error', async () => {
        let error;

        try {
          await carsService.update(carMocksId._id, carUpdate);
        } catch(err: any) {
          error = err;
        }
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      });
      it('Em caso de error', async () => {
        let error;
        try {
          await carsService.update(carUpdateId._id, {});
        } catch(err) {
          error = err;
        }
        expect(error).to.be.instanceOf(ZodError);
      });
    });
  });

  describe('Delete', () => {
    describe('Em caso de sucesso', () => {
      it('Apaga o carro pelo id', async () => {
        const response  = await carsService.delete(carMocksId._id);
        expect(response ).to.be.deep.equal(carMocksId);
      });
    });
    describe('Em caso de error', () => {
      it('Caso o id informado não esteja cadastrado no BD retorna uma mensagem de erro', async () => {
        let error;

        try {
          await carsService.delete(carMocksId._id);
        } catch(err: any) {
          error = err;
        }
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      });
    })
  });
});