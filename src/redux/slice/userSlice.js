import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    isAdmin: false,
    city: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', access_token = '', address = '', avatar = '', phone = '', _id = '', isAdmin, city = '' } = action.payload
            state.name = name;
            state.email = email;
            state.address = address;
            state.avatar = avatar;
            state.phone = phone;
            state.id = _id;
            state.isAdmin = isAdmin;
            state.access_token = access_token;
            state.city = city;

        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.avatar = '';
            state.phone = '';
            state.id = '';
            state.isAdmin = false;
            state.access_token = '';
            state.city = '';

        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer