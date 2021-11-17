import Axios, {AxiosInstance} from 'axios';

interface IConfig {
    axios: AxiosInstance,
    baseURL: string,
}

const config:IConfig= {
    baseURL: 'https://pokeapi.co/api/v2/',
    axios: Axios.create({
        baseURL: 'https://pokeapi.co/api/v2/',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }),
}


export default config;

