import { Availability } from './Availability';
import { Measure } from './Measure';

export interface TShopItem {
    name: string;
    count: number;
    price: number;
    availability: Availability;
    photo: string;
    measure: Measure;
}
