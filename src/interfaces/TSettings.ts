import { ShopSize } from './ShopSize';

export interface TSettings {
    shopName: string;
    accountNumber: string;
    address: string;
    nip: string;
    openHours: {
        from: string;
        to: string;
    };
    size: ShopSize;
    logo: string;
}