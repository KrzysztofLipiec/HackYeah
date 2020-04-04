import { TShopItem } from '@/interfaces/TShopItem';

import { OrderStatus } from './OrderStatus';

export interface TShopOrder {
    status: OrderStatus;
    id: string;
    name: string;
    shopPhoto: string;
    items: TShopItem[];
    pickupTime: number;
}
