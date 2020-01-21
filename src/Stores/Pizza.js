import {createStore} from "redux";

const PizzaActions = {
    UPDATE_TOPPING: "UPDATE_TOPPING",
    CHANGE_BASE: "CHANGE_BASE",
    CHANGE_SIZE: "CHANGE_SIZE",
};

const initialState = {
    toppings: [],
    base: [],
    size: [],
    total: 0
};

const pizzaReducer = (prevState, action) => {
    const newState = JSON.parse(JSON.stringify(prevState));
    switch (action.type) {
        case PizzaActions.UPDATE_TOPPING:
            console.log(newState.toppings)
            newState.toppings = action.data;
            break;
        case PizzaActions.CHANGE_BASE:
            newState.base = action.data;
            break;
        case PizzaActions.CHANGE_SIZE:
            newState.size = action.data;
            break;
    }

    // Keep it all seperated here for readability
    // Tally the prices up
    let newTotal = 0;
    Object.keys(prevState).forEach(key => {
        if (Array.isArray(newState[key])) {
            newTotal += newState[key].reduce((total, item) => total + item.price, 0)
        }
    });
    return {...newState, total: newTotal};
};

const PizzaStore = createStore(pizzaReducer, initialState);
export default PizzaStore;
export {PizzaActions};