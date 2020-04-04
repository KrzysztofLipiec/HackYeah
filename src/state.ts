interface State {
    apiUrl: string;
    userName: string;
}

let stateDefault: State = {
    userName: '',
    apiUrl: 'http://localhost:9123/'
}
let state: State | null = null;
export default state = state || stateDefault;
