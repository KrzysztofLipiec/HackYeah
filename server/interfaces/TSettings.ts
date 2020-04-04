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
    location: {
        lat: number,
        lng: number
    }
    size: ShopSize;
    logo: string;
}