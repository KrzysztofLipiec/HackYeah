import { OrderStatus } from './OrderStatus';
import { TShopItem } from './TShopItem';

export interface TShopOrder {
    id: string;
    name: string;
    shopPhoto: string;
    items: TShopItem[];
    timestamp: number;
    status: OrderStatus;
}
