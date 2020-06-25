import * as types from '../actions/types';


const itemsState = {
  items: []
};

const itemsReducer = (state = itemsState, action) => {
  switch (action.type) {
    case types.RESET_ITEMS: {
      return {
        items: []
      }
    }
    case types.SET_ITEMS: {
      return {
        items: [...state.items, ...action.items]
      }
    }
    case types.DELETE_ITEM: {
      const newState = { ...state };
      const deletedItemIndex = state.items.findIndex(item => item.id == action.deletedItem.id);
      newState.items.splice(deletedItemIndex, 1);
      return newState;
    }
    default:
      return state
  }
}

export default itemsReducer;