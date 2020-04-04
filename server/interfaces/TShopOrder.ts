import { TShopItem } from './TShopItem';

export interface TShopOrder {
    name: string;
    shopPhoto: string;
    items: TShopItem[];
    timestamp: number;
}
