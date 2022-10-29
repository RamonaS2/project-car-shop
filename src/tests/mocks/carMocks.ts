import { ICar } from "../../interfaces/ICar";

export const carMock: ICar = {
    model: 'MClaren',
    year: 1964,
    color: 'red',
    buyValue: 44448000200,
    doorsQty: 2,
    seatsQty: 2,
}

export const carMockResolves: ICar & { _Id: string } = {
    _Id: '242114587',
    ...carMock
}

export const carUpdate: ICar = {
    model: 'maserati mc20',
    year: 2022,
    color: 'yellow',
    buyValue: 240000000,
    doorsQty: 2,
    seatsQty: 2,
}

export const carUpdateResolves: ICar & { _Id: string } = {
    _Id: '242114588',
    ...carUpdate,
}