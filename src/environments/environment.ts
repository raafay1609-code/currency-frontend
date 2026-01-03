import pkg from '../../package.json';

export const environment = {
    production: false,
    VERSION: pkg.version,
    // BASE_URL: 'http://localhost:3000/api/',
    BASE_URL: 'https://currency-converter-mu-green.vercel.app/api/'
}
