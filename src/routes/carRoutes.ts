import { Router } from 'express';
import CarController from '../controllers/carController';
import CarService from '../services/carService';
import CarModel from '../models/carModel';

const carRouter = Router();
const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRouter.post('/cars', (req, res) => carController.create(req, res));

carRouter.get('/cars', (req, res) => carController.read(req, res));

carRouter.get('/cars/:id', (req, res) => carController.readOne(req, res));

carRouter.put('/cars/:id', (req, res) => carController.update(req, res));

carRouter.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default carRouter;