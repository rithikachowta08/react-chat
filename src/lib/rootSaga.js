import { all, takeEvery } from "redux-saga/effects";
import ACTIONS from "./actions.constants";
import { updateChatState, fetchChat } from "./Chat.saga";

const rootSaga = () =>
  all([
    takeEvery(ACTIONS.FETCH_CHAT, fetchChat),
    takeEvery(ACTIONS.UPDATE_CHAT, updateChatState),
  ]);

export default rootSaga;
