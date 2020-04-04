import { IShop } from './IShop';
import { IUser } from './IUser';
import { TShopItem } from './TShopItem';
import { TShopOrder } from './TShopOrder';

export interface IData {
    shops: Array<IShop>;
    users: Array<IUser>;
    products: Array<TShopItem>;
    orders: Array<TShopOrder>;
}