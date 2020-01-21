import {createStore} from 'redux';

const MenuSelections = {
    BURGER_MENU: "BURGER_MENU",
    PAST_ORDERS: "PAST_ORDERS",
    NEW_ORDER: "NEW_ORDER",
};

// No need to do a full fledged reducer here since there is only one type of action (setting a new selection)
// So why use a redux store then?
// a) It looks cleaner
// b) Easier to organise as oppose to bubbling state up
// c) Modularity in case I want to add more actions later
const menuReducer = (prevState, action) => {
    const newState = Object.assign({}, prevState); // Shallow copy here
    newState.selection = action.selection;
    return newState;
};

const initialState = {
    selection: MenuSelections.NEW_ORDER
};

const MenuSelectStore = createStore(menuReducer, initialState);
export default MenuSelectStore;
export {MenuSelections};