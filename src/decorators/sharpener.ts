import { ItemDecorator } from './ItemDecorator';

export class Sharpener extends ItemDecorator {
  static readonly NAME = 'Sharpener'; //Name of the item
  static readonly UNIT_PRICE = 18; // $18 each

    // cost = cost of the thing inside me + my cost
  getCost(): number {
    return this.wrapped.getCost() + Sharpener.UNIT_PRICE * this.quantity;
  }

  // description = description of the thing inside me + my description
  getDescription(): string {
    return `${this.wrapped.getDescription()}, ${Sharpener.NAME} x${this.quantity}`;
  }
}