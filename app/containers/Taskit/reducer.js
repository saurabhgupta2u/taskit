/*
 *
 * Taskit reducer
 *
 */
import moment from 'moment';
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  priorities: {
    1: 'Today',
    2: 'Tomorrow',
    // 3: 'Later',
    // 4: 'Someday',
  },
  tasks: [
    { status: false, task: 'Task 1', timestamp: moment.now(), priority: 1 },
    { status: false, task: 'Task 2', timestamp: moment.now(), priority: 1 },
    { status: false, task: 'Task 3', timestamp: moment.now(), priority: 2 },
    { status: false, task: 'Task 4', timestamp: moment.now(), priority: 2 },
    { status: false, task: 'Task 5', timestamp: moment.now(), priority: 3 },
    { status: false, task: 'Task 6', timestamp: moment.now(), priority: 3 },
    { status: false, task: 'Task 7', timestamp: moment.now(), priority: 4 },
    { status: false, task: 'Task 8', timestamp: moment.now(), priority: 4 },
  ],
};

/* eslint-disable default-case, no-param-reassign */
const taskitReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default taskitReducer;
