import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { systemReducer } from './system/reducers';
import { userListReducer } from './user/reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  system: systemReducer,
  users: userListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Ignore an error __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ property not found
// Enable redux dev tool on dev env.
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__! || compose
    : compose;

export const rootStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
