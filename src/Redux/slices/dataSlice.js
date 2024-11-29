import { createSlice } from '@reduxjs/toolkit';

    const dataSlice = createSlice({
        name: 'data',
        initialState: {
            items: [], // Здесь будут храниться ваши данные
            loading: false, // Для состояния загрузки
            error: null, // Для обработки ошибок
            bucketItems: [],
            filteredItems: [],
        },
        reducers: {
           setData(state, action) {
               state.items = action.payload;
           },
           setFilteredData (state, action) {
               state.filteredItems = action.payload;
           },
           setBucketData (state, action) {
               state.bucketItems = action.payload;
           }
        },
    });

export const { setData, setFilteredData , setBucketData} = dataSlice.actions;
export default dataSlice.reducer;