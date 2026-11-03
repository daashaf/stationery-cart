import type { StationeryItem} from "./StationeryItems";

//empty cart = starting point 
export class BaseCart implements StationeryItem {
    getCost(): number {
        return 0; //nothing init yet.
    }

    getDescription(): string { //returns the description of the cart
        return "Shopping Cart: "; 
    }
}

