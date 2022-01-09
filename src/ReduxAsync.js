import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCount,
  selectUsername,
  fetchJSON,
  fetchDummy,
} from "./features/customCounter/customCounterSlice";

export const ReduxAsync = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const username = useSelector(selectUsername);
  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => dispatch(fetchDummy(5))}>FetchDummy</button>
      {username && <h3>{username}</h3>}
      <button onClick={() => dispatch(fetchJSON())}>FetchJSON</button>
    </div>
  );
};

export default ReduxAsync;
