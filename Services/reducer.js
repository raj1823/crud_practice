import {DATA_SUCCESS, TOGGLE, UPDATE_RECORD} from './constant';

const initialState = {
  employeeData: [],
  visible: false,
  //isPopupVisible: true,
 
};

const data_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_SUCCESS:
      return {...state, employeeData: action.data};

    case TOGGLE:
      return {...state, visible: action.visible};

  
    default:
      return {...state};
  }
};

export default data_Reducer;
