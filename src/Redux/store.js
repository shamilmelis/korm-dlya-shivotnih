import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';

const store = configureStore({
    reducer: {
        data: dataReducer, // Редуктор для данных
    },
});

export default store;