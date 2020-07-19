import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import * as Action from '../actions/ProjectConstants';
import { getProjecct, postProject } from '../actions/Projects';
import { getProjectsFactory, postProjectFactory } from '../service/api/project';
import { CreateProject } from '../DefineInfo';

function* runGetProjects(action: ReturnType<typeof getProjecct.start>) {
  const { userName } = action.payload;

  if( userName == "" ){
    return
  }

  try {
    const api = getProjectsFactory();
    const projects = yield call(api, userName);

    yield put(getProjecct.succeed({ userName }, { projects }));
  } catch (error) {
    yield put(getProjecct.fail({ userName }, error));
  }
}

function* runPostProjects(action: ReturnType<typeof postProject.start>) {
  const createProject = action.payload;
  const callBack = action.payload.callBack;

  try {
    const api = postProjectFactory();
    const project: CreateProject = yield call(api, createProject.params);


    yield put(postProject.succeed({ ...project  }, { ...project }));

    // move to project list
    callBack();
  } catch (error) {
    yield put(postProject.fail({ ...createProject.params}, error));
  }
}

export function* watchGetProjects() {
  yield takeLatest(Action.GET_PROJECT_START, runGetProjects);
}

export function* watchPostProject() {
  yield takeLatest(Action.POST_PROJECT_STASRT, runPostProjects);
}

export default function* rootSaga() {
  yield all([fork(watchGetProjects),fork(watchPostProject)]);
}
