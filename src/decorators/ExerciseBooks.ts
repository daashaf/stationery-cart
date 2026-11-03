import { ItemDecorator } from './ItemDecorator';

export class ExerciseBooks extends ItemDecorator {
  static readonly NAME = 'Exercise Book';
  static readonly UNIT_PRICE = 30; // $30 each

  // cost = cost of the thing inside me + my cost
  getCost(): number {
    return this.wrapped.getCost() + ExerciseBooks.UNIT_PRICE * this.quantity;
  }

  // description = description of the thing inside me + my description
  getDescription(): string {
    return `${this.wrapped.getDescription()}, ${ExerciseBooks.NAME} x${this.quantity}`;
  }
}