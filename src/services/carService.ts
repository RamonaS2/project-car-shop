import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  private _model:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._model = model;
  }

  public async create(obj: unknown):Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    return this._model.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._model.read();
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._model.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const updated = await this._model.update(_id, parsed.data);
    if (!updated) throw new Error(ErrorTypes.EntityNotFound);

    return updated;
  }

  public async delete(_id: string): Promise<ICar> {
    const deleted = await this._model.delete(_id);
    if (!deleted) throw new Error(ErrorTypes.EntityNotFound);

    return deleted;
  }
}
