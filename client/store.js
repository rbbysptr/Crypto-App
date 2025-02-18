import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/feature/user/userSlice";

export default configureStore({
    reducer: {
        users: userReducer,
    },
});
