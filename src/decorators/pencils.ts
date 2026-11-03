import { ItemDecorator } from './ItemDecorator';

export class Pencils extends ItemDecorator {
  static readonly NAME = 'Pencils'; //Name of the item
  static readonly UNIT_PRICE = 10; // $10 each


  // cost = cost of the thing inside me + my cost
  getCost(): number {
    return this.wrapped.getCost() + Pencils.UNIT_PRICE * this.quantity;
  }

  // description = description of the thing inside me + my description
  getDescription(): string {
    return `${this.wrapped.getDescription()}, ${Pencils.NAME} x${this.quantity}`;
  }
}