import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slice";

const myStore = configureStore({
    reducer:{
        events:reducer
    }
})

export default myStore