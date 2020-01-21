import {createStore} from "redux";

const OrdersActions = {
    ADD_ORDER: "ADD_ORDER",
    UPDATE_ORDER_STATUS: "UPDATE_ORDER_STATUS"
};

const initialState = {
    orders: []
};

const OrdersReducer = (prevState, action) => {
    const newState = JSON.parse(JSON.stringify(prevState));

    switch (action.type) {
        case OrdersActions.ADD_ORDER:
            newState.orders.push(action.order);
            break;
        case OrdersActions.UPDATE_ORDER_STATUS:
            for (const index in newState.orders) {
                if (newState.orders[index].id === action.id) {
                    newState.orders[index].status = action.status;
                    break;
                }
            }
            break;
    }

    console.log("order", newState)
    return newState;
};

const OrdersStore = createStore(OrdersReducer, initialState);
export default OrdersStore;
export {OrdersActions};
