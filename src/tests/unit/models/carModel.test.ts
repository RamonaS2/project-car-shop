import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import { Model } from 'mongoose';
import { carMock, carMockResolves, carUpdate, carUpdateResolves } from '../../mocks/carMocks';
const { expect } = chai;

describe('camada model', () => {

const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockResolves);
    sinon.stub(Model, 'find').resolves([carMockResolves]);
    sinon.stub(Model, 'findOne').resolves(carMockResolves);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carUpdateResolves);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockResolves);
  });

  after(()=>{
    sinon.restore();
  })

  it('Se cria um novo carro', async () => {
    const response = await carModel.create(carMock);
    expect(response).to.be.deep.equal(carMockResolves);
  });

  it('Se retorna uma lista de carros', async () => {
    const response = await carModel.read();
    expect(response[0]).to.be.deep.equal(carMockResolves);
  });

  it('Se retorna um carro pelo id', async () => {
    const response = await carModel.readOne('242114587');
    expect(response).to.be.deep.equal(carMockResolves);
  });

  it('Se a lista de carros atualiza', async () => {
    const response = await carModel.update('242114588', carUpdate);
    expect(response).to.be.deep.equal(carUpdateResolves);
  });

  it('Se deleta um carro', async () => {
    const response = await carModel.delete('242114587');
    expect(response).to.be.deep.equal(carMockResolves);
  });

});