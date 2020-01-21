import React from "react";
import OrderOptionContainer from "./OrderOptionContainer";
import PizzaStore, {PizzaActions} from "../../Stores/Pizza";
import OrdersStore, {OrdersActions} from "../../Stores/Orders";

export default class NewOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            toppings: [
                {name: "Pepperoni", price: 0.8},
                {name: "Sausage", price: 1.25},
                {name: "Sweetcorn", price: 0.8},
                {name: "Chicken", price: 1},
                {name: "Salami", price: 0.8},
                {name: "Ham", price: 1},
                {name: "Pineapple", price: 0.8},
                {name: "Pulled Pork", price: 1.25},
                {name: "Pepper", price: 0.8},
            ],
            bases: [
                {name: "New York Style", price: 5},
                {name: "Neapolitan", price: 4.5},
                {name: "Double Dough", price: 4},
                {name: "Sicilian Style", price: 4.75},
                {name: "Thin", price: 3.50},
                {name: "Gluten-Free", price: 5.6},
                {name: "Flat Bread", price: 4.8},
            ],
            sizes: [
                {name: "4\"", price: 1},
                {name: "5\"", price: 1.5},
                {name: "6\"", price: 2},
                {name: "8\"", price: 2.7},
                {name: "12\"", price: 4},
                {name: "16\"", price: 6},
            ],

            unsubscribe: null
        };

        this.submitOrder = this.submitOrder.bind(this);
    }

    componentDidMount() {
        const unsubscribe = PizzaStore.subscribe(() => {
            this.setState({total: PizzaStore.getState().total});
        });
        this.setState({unsubscribe});
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    submitOrder() {
        OrdersStore.dispatch({type: OrdersActions.ADD_ORDER, order: PizzaStore.getState()});
    }

    render() {
        return (
            <div className={"NewOrder"}>
                <div className={"TopNewOrder"}>
                    <button onClick={this.submitOrder}>Checkout</button>
                    <p>Total: ${this.state.total.toFixed(2)}</p>
                </div>

                <div className={"NewOrderDivs"}>
                    <OrderOptionContainer type={"Toppings"} action={PizzaActions.UPDATE_TOPPING}
                                          items={this.state.toppings}/>
                    <OrderOptionContainer type={"Base"} action={PizzaActions.CHANGE_BASE}
                                          items={this.state.bases}/>
                    <OrderOptionContainer type={"Size"} action={PizzaActions.CHANGE_SIZE}
                                          items={this.state.sizes}/>
                </div>
            </div>
        )
    }
}

