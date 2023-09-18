import {CLEAR_STATE} from '../actions/commonActions';

const initialState = {
  currentState: false,
};

const commonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CLEAR_STATE: {
      return initialState;
    }

    default:
      return state;
  }
};

export default commonReducer;
