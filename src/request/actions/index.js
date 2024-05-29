
import request from '@/request/service';
import {
    indexStatisticsApi,
    indexLineApi,
    indexBarApi,
    listMeterApi,
    listLineApi,
    listBarApi
} from '../api';

export const indexStatisticsAction = params => request.get(indexStatisticsApi, { params });

export const indexLineAction = params => request.get(indexLineApi, { params });

export const indexBarAction = params => request.get(indexBarApi, { params });

export const listMeterAction = params => request.get(listMeterApi, { params });

export const listLineAction = params => request.get(listLineApi, { params });

export const listBarAction = params => request.get(listBarApi, { params });
