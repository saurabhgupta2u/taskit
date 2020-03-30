import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the taskit state domain
 */

const selectTaskitDomain = state => state.taskit || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Taskit
 */

const makeSelectTaskit = () =>
  createSelector(
    selectTaskitDomain,
    substate => substate,
  );

const makeSelectTasks = () =>
  createSelector(
    selectTaskitDomain,
    substate => substate.tasks,
  );

const makeSelectPriorities = () =>
  createSelector(
    selectTaskitDomain,
    substate => substate.priorities,
  );

export default makeSelectTaskit;
export { selectTaskitDomain, makeSelectTasks, makeSelectPriorities };
