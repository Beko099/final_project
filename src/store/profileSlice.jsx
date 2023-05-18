import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        useranme : null,
        password: null,
        token: null,
    },
    reducers: {
        setUsername: (state, action) => {

        },
        setPassword: (state, action) => {

        },

    }

})

export default profileSlice.reducer
export const {setPassword, setUsername} = profileSlice.actions