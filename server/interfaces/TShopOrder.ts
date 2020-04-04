import { OrderStatus } from './OrderStatus';
import { TShopItem } from './TShopItem';

export interface TShopOrder {
    id: string;
    name: string;
    items: TShopItem[];
    pickupTime: number;
    status: OrderStatus;
}
