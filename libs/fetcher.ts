import axios from 'axios';

const fetcher = (endpoint: string) =>
  axios.get(endpoint).then((res) => {
    if (res.status > 200) {
      const error: any = new Error('An error occurred while fetching the data.');

      error.info = res.data.message;
      error.status = res.status;

      throw error;
    }

    return res.data.data;
  });

export default fetcher;
