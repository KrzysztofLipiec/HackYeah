import { Availability } from './Availability';
import { Measure } from './Measure';

export interface TShopItem {
    id: string;
    name: string;
    shopName: string;
    count: number;
    price: number;
    availability: Availability;
    photo: string;
    measure: Measure;
}
