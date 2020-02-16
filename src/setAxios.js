import axios from 'axios';

export default function setAxios() {
  axios.interceptors.response.use(
    (response) => {
      const data = response.data;
      return data;
    },
  );
}
