/*eslint-env node */
export const RAILSRoot = process.env.NODE_ENV === 'production' ? 'https://coffeeslots-server.herokuapp.com': 'http://127.0.0.1:5000';
export const HAPIRoot = process.env.NODE_ENV === 'production' ? 'https://coffeeslots.herokuapp.com': 'http://127.0.0.1:3700';
export const MAPBOX_KEY = 'pk.eyJ1IjoicGhvZW5pYm94IiwiYSI6ImNpZWo3bTcydzAwdHRza2tnY3h6azBtbjEifQ.G-HmM7UmDxu8fLPTVRYCQA';
