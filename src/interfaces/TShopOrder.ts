import {TShopItem} from "@/interfaces/TShopItem";

export interface TShopOrder {
    name: string;
    shopPhoto: string;
    items: TShopItem[]
}
