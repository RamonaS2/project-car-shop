import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  private _service: IService<ICar>;

  constructor(service: IService<ICar>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<ICar>) {
    const created = await this._service.create(req.body);
    res.status(201).json(created);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const response = await this._service.read(); 
    res.status(200).json(response);
  }

  public async readOne(req: Request, res: Response) {
    const response = await this._service.readOne(req.params.id);
    return res.status(200).json(response);
  }

  public async update(req: Request, res: Response) {
    const response = await this._service.update(req.params.id, req.body);
    return res.status(200).json(response);
  }

  public async delete(req: Request, res: Response<ICar>) {
    await this._service.delete(req.params.id);
    res.status(204).json();
  }
}