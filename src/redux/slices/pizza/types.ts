export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number [];
    raiting: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',

}

export interface PizzaSliceState {
    items: Pizza[] ;
    status: Status;
}

export const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, //loading | siccess | error
};