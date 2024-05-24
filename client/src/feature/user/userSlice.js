import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    list: [],
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { setUsers } = userSlice.actions;

export const register = (getUser, nav) => {
    return async () => {
        try {
          const response = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/register`,
                getUser
            );
            nav("/login");
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
            });
        } catch (error) {
            console.log(error);
            const errMsg = error.response.data.message;
            Swal.fire({
                title: "Error!",
                text: errMsg,
                icon: "error",
            });
        }
    };
};

export const login = (getUser, nav) => {
    return async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/login`,
                getUser
            );
            localStorage.access_token = response.access_token;
            console.log(response);
            if (nav) {
                nav("/");
            }
        } catch (error) {
            const errMsg = error.response.data.message;
            Swal.fire({
                title: "Error!",
                text: errMsg,
                icon: "error",
            });
        }
    };
};
export default userSlice.reducer;
