import type { StationeryItem } from "../models/StationeryItems";

// Parent class for all the items.
export abstract class ItemDecorator implements StationeryItem {
  protected readonly wrapped: StationeryItem; // the thing inside me
  protected readonly quantity: number;        // how many the user picked

  constructor(wrapped: StationeryItem, quantity: number) {
    // quantity must be 1, 2, 3...
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Quantity must be a positive whole number, got ${quantity}`);
    }
    this.wrapped = wrapped;
    this.quantity = quantity;
  }

  // Each item class must write these itself
  abstract getCost(): number;
  abstract getDescription(): string;
}