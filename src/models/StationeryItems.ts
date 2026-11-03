

export interface StationeryItem {
    /* calculates the total cost of this object, including every object it wraps. */ 

    getCost(): number; 
    
    getDescription(): string;
    
}
