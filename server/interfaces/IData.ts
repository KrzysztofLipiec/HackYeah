import { TSettings } from './TSettings';
import { TShopItem } from './TShopItem';
import { TShopOrder } from './TShopOrder';

export interface IData {
    shops: { [key: string]: TSettings };
    products: Array<TShopItem>;
    orders: Array<TShopOrder>;
}