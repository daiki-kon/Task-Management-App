import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import * as Action from '../actions/ProjectConstants';
import { getProjecct } from '../actions/Projects';
import { getProjectsFactory } from '../service/api/project';

function* runGetProjects(action: ReturnType<typeof getProjecct.start>) {
  const { userName } = action.payload;

  try {
    const api = getProjectsFactory();
    const projects = yield call(api, userName);

    yield put(getProjecct.succeed({ userName }, { projects }));
  } catch (error) {
    yield put(getProjecct.fail({ userName }, error));
  }
}

export function* watchGetProjects() {
  yield takeLatest(Action.GET_PROJECT_START, runGetProjects);
}

export default function* rootSaga() {
  yield all([fork(watchGetProjects)]);
}
