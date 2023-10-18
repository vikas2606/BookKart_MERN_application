const initialTableState = {
  numRows: 0, 
};

export const tableReducer = (state = initialTableState, action) => {
  switch (action.type) {
    case "UPDATE_NUM_ROWS":
      return {
        ...state,
        numRows: action.payload,
      };
    default:
      return state;
  }
};
