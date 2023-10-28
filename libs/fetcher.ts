import axios from 'axios';

const fetcher = (endpoint: string) => axios.get(endpoint).then((res) => res.data.data);

export default fetcher;
