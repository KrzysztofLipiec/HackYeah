import { TShopItem } from './TShopItem';

export interface TCart {
    items: TShopItem[];
    pickupTime: number;
}