interface State {
    apiUrl: string;
    userName: string;
    shopName: string;
}

let stateDefault: State = {
    userName: '',
    shopName: '',
    apiUrl: 'http://localhost:9123/'
}
let state: State | null = null;
export default state = state || stateDefault;
