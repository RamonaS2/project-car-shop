import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
import CarController from '../../../controllers/carController';
import { Request, Response } from 'express';
import { carMocksId,carMocks, carUpdate, carUpdateId } from '../../mocks/carMocks';
const { expect } = chai;

describe('Cars Controller', () => {
  const carsModel = new CarModel();
  const carsService = new CarService(carsModel);
  const carsController = new CarController(carsService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Create', () => {
    beforeEach(() => {
      sinon.stub(carsService, 'create').resolves(carMocksId);
    });

    it('Se cria um carro', async () => {
      req.body =carMocks
      await carsController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMocksId)).to.be.true;
    });
  });

  describe('Se lista os carros', () => {
    beforeEach(() => {
      sinon.stub(carsService, 'read').resolves([carMocksId]);
      sinon.stub(carsService, 'readOne').resolves(carMocksId);
    });

    describe('Read', () => {
      it('Se lista os caarros', async () => {
        await carsController.read(req, res);

        const statusStub = res.status as sinon.SinonStub;
        expect(statusStub.calledWith(200)).to.be.true;

        const jsonStub = res.json as sinon.SinonStub;
        expect(jsonStub.calledWith([carMocksId])).to.be.true;
      });
    });
    describe('Se lista pelo id', () => {
      it('Se retorna um carro pelo id', async () => {
        req.params = { id: carMocksId._id }
        await carsController.readOne(req, res);

        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carMocksId)).to.be.true;
      });
    });
  });
  describe('Update', () => {
    beforeEach(() => {
      sinon.stub(carsService, 'update').resolves(carUpdateId);
    });

    it('Se atualiza os carros', async () => {
      req.params = { id: carMocksId._id };
      req.body = carUpdate;
      await carsController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carUpdateId)).to.be.true;
    });
  });

  describe('Delete', () => {
    beforeEach(() => {
      sinon.stub(carsService, 'delete').resolves(carUpdateId);
    });
    it('Se apaga um carro pelo', async () => {
      req.params = { id: carMocksId._id }
      await carsController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });
});