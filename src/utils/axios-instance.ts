import axios from 'axios';
import { CONFIG } from 'core/config';

const axiosConfig = {
    baseURL: CONFIG.baseURL,
};

const instance = axios.create(axiosConfig);

export default instance;