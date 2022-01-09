import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mode: 0,
  value: 0,
  username: "",
};

const sleep = (msec) => {
  const start = new Date();
  while (new Date() - start < msec);
};

export const fetchDummy = createAsyncThunk("fetch/dummy", async (num) => {
  await sleep(2000);
  return num;
});

export const fetchJSON = createAsyncThunk("fetch/api", async (num) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
  const { username } = res.data;
  return username;
});

export const customCounterSlice = createSlice({
  name: "customCounter",
  initialState,
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += action.payload * 100;
          break;
        case 2:
          state.value += action.payload * 10000;
          break;
        default:
          break;
      }
    },
  },
  //   非同期関数の後処理の追加
  extraReducers: (builder) => {
    //   fetchDummyが正常終了した場合
    builder.addCase(fetchDummy.fulfilled, (state, action) => {
      state.value = 100 + action.payload;
    });
    //   fetchDummyが失敗で終了した場合
    builder.addCase(fetchDummy.rejected, (state, action) => {
      state.value = 100 - action.payload;
    });
    //   fetchJSONが正常終了した場合
    builder.addCase(fetchJSON.fulfilled, (state, action) => {
      state.username = action.payload;
    });
    builder.addCase(fetchJSON.rejected, (state, payload) => {
      state.username = "anonymous";
    });
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
} = customCounterSlice.actions;

export const selectCount = (state) => state.customCounter.value;
export const selectUsername = (state) => state.customCounter.username;

export default customCounterSlice.reducer;
