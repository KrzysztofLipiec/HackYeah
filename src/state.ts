interface State {
    apiUrl: string;
}

let stateDefault: State = {
    apiUrl: 'http://localhost:9123/'
}

let state: State | null = null;
export default state = state || stateDefault;
