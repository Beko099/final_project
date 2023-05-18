import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


const searchSlice = createSlice({
    name: 'search',
    initialState: {
        focus: null,
    },
    reducers: {

        setFocus(state, action) {
            state.focus = action.payload
        }

    }

})




export default searchSlice.reducer
export const {setFocus} =  searchSlice.actions



