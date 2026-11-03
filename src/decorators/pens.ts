import { ItemDecorator } from './ItemDecorator';

export class Pens extends ItemDecorator {
  static readonly NAME = 'Pens'; //name of the item
  static readonly UNIT_PRICE = 12; // $12 each 

  // cost = cost of the thing inside me + my cost
  getCost(): number {
    return this.wrapped.getCost() + Pens.UNIT_PRICE * this.quantity;
  }

  // description = description of the thing inside me + my description
  getDescription(): string {
    return `${this.wrapped.getDescription()}, ${Pens.NAME} x${this.quantity}`;
  }
}