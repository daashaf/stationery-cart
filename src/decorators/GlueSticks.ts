import { ItemDecorator } from './ItemDecorator';

export class GlueSticks extends ItemDecorator {
  static readonly NAME = 'Glue Sticks'; //Name of the item
  static readonly UNIT_PRICE = 25; // $25 each

    // cost = cost of the thing inside me + my cost
  getCost(): number {
    return this.wrapped.getCost() + GlueSticks.UNIT_PRICE * this.quantity;
  }

  // description = description of the thing inside me + my description
  getDescription(): string {
    return `${this.wrapped.getDescription()}, ${GlueSticks.NAME} x${this.quantity}`;
  }
}