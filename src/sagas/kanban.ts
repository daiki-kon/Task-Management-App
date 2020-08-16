import { call, put, takeLatest } from 'redux-saga/effects';

import * as Action from '../actions/kanbanConstants';
import { postKanban, getKanbans, deleteKanban, postTaskCard, putTaskCard } from '../actions/kanban';
import { postKanbanFactory, getKanbansFactory, deleteKanbanFactory, postTaskCardFactory, putTaskCardFactory } from '../service/api/kanban';
import { KanbanInfo, DeleteKanban, TaskCardInfo } from '../DefineInfo';

function* runPostKanban(action: ReturnType<typeof postKanban.start>) {
  const createKanban = action.payload.params;

  try {
    const api = postKanbanFactory();
    const kanban: KanbanInfo = yield call(api, createKanban);

    yield put(postKanban.succeed({ ...kanban  }, { ...kanban }));

  } catch (error) {
    yield put(postKanban.fail( error ));
  }
}

function* runGetKanbans(action: ReturnType<typeof getKanbans.start>) {
  const { userName, parentProjectID } = action.payload.params;

  if( userName == "" ){
    return
  }

  try {
    const api = getKanbansFactory();
    const kanbans: KanbanInfo[] = yield call(api, { userName: userName, parentProjectID: parentProjectID });

    yield put(getKanbans.succeed( kanbans ));
  } catch (error) {
    yield put(getKanbans.fail( error));
  }
}

function* runDeleteKanbans(action: ReturnType<typeof deleteKanban.start>) {
  const deleteItems: DeleteKanban = action.payload.params;

  try {
    const api = deleteKanbanFactory();
    const deletedKanbans: string[] = yield call(api, deleteItems);

    yield put(deleteKanban.succeed( deletedKanbans ));
  } catch (error) {
    yield put(deleteKanban.fail( error ));
  }
}

export function* watchPostKanban() {
  yield takeLatest(Action.POST_KANBAN_START, runPostKanban);
}

export function* watchGetKanbans() {
  yield takeLatest(Action.GET_KANBAN_START, runGetKanbans);
}

export function* watchDeleteKanban() {
  yield takeLatest(Action.DELETE_KANBAN_START, runDeleteKanbans);
}

function* runPostTaskCard(action: ReturnType<typeof postTaskCard.start>) {
  const createTaskCard = action.payload.params;

  try {
    const api = postTaskCardFactory();
    const taskCard: TaskCardInfo  = yield call(api, createTaskCard);

    yield put(postTaskCard.succeed({ ...taskCard }));

  } catch (error) {
    yield put(postTaskCard.fail( error ));
  }
}

function* runPutTaskCard(action: ReturnType<typeof putTaskCard.start>) {
  const updateTaskCard = action.payload.params;

  try {
    const api = putTaskCardFactory();
    const taskCard: TaskCardInfo  = yield call(api, updateTaskCard);

    yield put(putTaskCard.succeed({ ...taskCard }));

  } catch (error) {
    yield put(putTaskCard.fail( error ));
  }
}

export function* watchPostTaskCard() {
  yield takeLatest(Action.POST_TASKCARD_START, runPostTaskCard);
}

export function* watchPutTaskCard() {
  yield takeLatest(Action.PUT_TASKCARD_START, runPutTaskCard);
}
