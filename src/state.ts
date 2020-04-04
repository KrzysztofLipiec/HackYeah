import { TCart } from './interfaces/TCart';

interface State {
    apiUrl: string;
    userName: string;
    shopName: string;
    cart: TCart;
}

let stateDefault: State = {
    userName: '',
    shopName: '',
    apiUrl: 'http://localhost:9123/',
    cart: {
        pickupTime: 0,
        items: []
    }
}
let state: State | null = null;
export default state = state || stateDefault;
