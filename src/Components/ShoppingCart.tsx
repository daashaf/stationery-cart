import { Component, type ChangeEvent } from 'react';
import type { StationeryItem } from '../models/StationeryItems';
import { BaseCart } from '../models/BaseCart';
import { ExerciseBooks } from '../decorators/ExerciseBooks';
import { Pens } from '../decorators/pens';
import { Pencils } from '../decorators/pencils';
import { Sharpener } from '../decorators/sharpener';
import { GlueSticks } from '../decorators/GlueSticks';
import './ShoppingCart.css';

// ---------- Types ----------

// The 5 items in the shop
type ItemId = 'exerciseBooks' | 'pens' | 'pencils' | 'sharpener' | 'glueSticks';

// What the shop knows about each item
interface CatalogueEntry {
  id: ItemId;
  name: string;
  unitPrice: number;
  decorate: (cart: StationeryItem, quantity: number) => StationeryItem; // how to wrap it in a decorator
}

// What the user has selected for each item
interface ItemSelection {
  checked: boolean; // is the checkbox ticked? 
  quantity: number; // how many the user picked
}

// The state of the whole shopping cart
interface ShoppingCartState {
  selections: Record<ItemId, ItemSelection>;
  totalCost: number;
  showTotal: boolean;// has the user clicked "Display Total Cost" yet?
}

// ---------- Constants ----------

const MAX_QUANTITY = 10;

// dropdown options for quantity: 1, 2, 3, ..., MAX_QUANTITY
const QUANTITY_OPTIONS = Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1);

// catalogue of all items in the shop, with their name, price, and how to wrap them
const CATALOGUE: CatalogueEntry[] = [
  { id: 'exerciseBooks', name: ExerciseBooks.NAME, unitPrice: ExerciseBooks.UNIT_PRICE,
    decorate: (cart, qty) => new ExerciseBooks(cart, qty) },
  { id: 'pens', name: Pens.NAME, unitPrice: Pens.UNIT_PRICE,
    decorate: (cart, qty) => new Pens(cart, qty) },
  { id: 'pencils', name: Pencils.NAME, unitPrice: Pencils.UNIT_PRICE,
    decorate: (cart, qty) => new Pencils(cart, qty) },
  { id: 'sharpener', name: Sharpener.NAME, unitPrice: Sharpener.UNIT_PRICE,
    decorate: (cart, qty) => new Sharpener(cart, qty) },
  { id: 'glueSticks', name: GlueSticks.NAME, unitPrice: GlueSticks.UNIT_PRICE,
    decorate: (cart, qty) => new GlueSticks(cart, qty) },
];

// starting selections: all unchecked, quantity = 1
const createInitialSelections = (): Record<ItemId, ItemSelection> => ({
  exerciseBooks: { checked: false, quantity: 1 },
  pens: { checked: false, quantity: 1 },
  pencils: { checked: false, quantity: 1 },
  sharpener: { checked: false, quantity: 1 },
  glueSticks: { checked: false, quantity: 1 },
});


// ---------- ShoppingCart Component ----------
export class ShoppingCart extends Component<object, ShoppingCartState> {
  // starting state
  state: ShoppingCartState = {
    selections: createInitialSelections(),
    totalCost: 0,
    showTotal: false,
  };

  // LIFECYCLE 1: runs after first render
  componentDidMount(): void {
    document.title = 'Stationery Shopping Cart';
  }

  // LIFECYCLE 2: runs after every render (except the first)

  componentDidUpdate(_prevProps: object, prevState: ShoppingCartState): void {
    if (this.state.showTotal && prevState.selections !== this.state.selections) { 
      this.setState({ totalCost: this.calculateTotalCost() });
    }
    // if the user has clicked "Display Total Cost" and they change their selections, recalculate the total cost
  }

// build the cart by wrapping the base cart in decorators for each selected item
  private buildCart(): StationeryItem {
    let cart: StationeryItem = new BaseCart();
    for (const item of CATALOGUE) {
      const selection = this.state.selections[item.id];
      if (selection.checked) {
        cart = item.decorate(cart, selection.quantity); // wrap it
      }
    }
    return cart;
  }

 // calculate the total cost by building the cart and calling getCost()
  private calculateTotalCost(): number {
    return this.buildCart().getCost();
  }

  // update one item
  private updateSelection(id: ItemId, change: Partial<ItemSelection>): void {
    this.setState((prev) => ({
      selections: {
        ...prev.selections,
        [id]: { ...prev.selections[id], ...change },
      },
    }));
  }

  // checkbox ticked / unticked
  private handleCheckboxChange = (id: ItemId) => (event: ChangeEvent<HTMLInputElement>): void => {
    this.updateSelection(id, { checked: event.target.checked });
  };

  // dropdown changed
  private handleQuantityChange = (id: ItemId) => (event: ChangeEvent<HTMLSelectElement>): void => {
    this.updateSelection(id, { quantity: Number(event.target.value) });
  };

  // "Display Total Cost" button clicked
  private handleDisplayTotal = (): void => {
    this.setState({ totalCost: this.calculateTotalCost(), showTotal: true });
  };

  // what appears on screen
  render() {
    const { selections, totalCost, showTotal } = this.state;
    const selectedItems = CATALOGUE.filter((item) => selections[item.id].checked); // only ticked ones

    return (
      <div className="cart">
    
  
        <section className="cart__panel">
          <h2>Shopping Cart Example</h2>

          <button type="button" className="cart__button" onClick={this.handleDisplayTotal}>
            Display Total Cost
          </button>

          <ul className="cart__items">
            {CATALOGUE.map((item) => {
              const selection = selections[item.id];
              return (
                <li key={item.id} className="cart__item">
                  
                 
                  <label>
                    <input
                      type="checkbox"
                      checked={selection.checked}
                      onChange={this.handleCheckboxChange(item.id)}
                    />
                    {item.name}
                    <span className="cart__price">(${item.unitPrice})</span>
                  </label>
                  
                  
                  <select
                    aria-label={`${item.name} quantity`}
                    value={selection.quantity}
                    onChange={this.handleQuantityChange(item.id)}
                  >
                    {QUANTITY_OPTIONS.map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </li>
              );
            })}
          </ul>
        </section>


        {showTotal && (
          <section className="cart__panel">
            <h2>Selected Items:</h2>
            {selectedItems.length === 0 ? (
              <p>No items selected.</p>
            ) : (
              <ul className="cart__summary">
                {selectedItems.map((item) => (
                  <li key={item.id}>
                    {item.name} - Quantity: {selections[item.id].quantity}
                  </li>
                ))}
              </ul>
            )}
            <p className="cart__total">Total Cost is : {totalCost} NZD</p>
          </section>
        )}
      </div>
    );
  }
}