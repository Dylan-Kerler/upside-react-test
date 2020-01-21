import React from "react";
import OrdersStore from "../../Stores/Orders";

export default class PastOrdersContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pastOrders: OrdersStore.getState().orders,
            storeSubscription: null
        }
    }

    componentDidMount() {
        const subscription = OrdersStore.subscribe(() => {
            this.setState({pastOrders: OrdersStore.getState().orders});
        });

        this.setState({
            storeSubscription: subscription
        });
    }

    componentWillUnmount() {
        this.state.storeSubscription();
    }

    render() {
        // reverse the array here because we want the newest orders at the top not the oldest
        const orders = this.state.pastOrders.map((order, index) => <PastOrder key={index} order={order}/>).reverse();
        return (
            <div className={"PastOrdersContainer"}>
                <h3>Past Orders</h3>
                <div className={"PastOrdersDiv"}>
                    {orders.length > 0 ? orders : "Hmm... Looks like you haven't made any orders yet" }
                </div>
            </div>
        )
    }
}

class PastOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false,
            status: <h3 style={{color: "magenta"}}>Preparing...</h3>,
            ingredients: []
        };

        //Put all the ingredients into a single array regardless of their type
        Object.keys(this.props.order).forEach(key => {
            if (key !== "total") {
                this.state.ingredients.push(...this.props.order[key]);
            }
        });

        this.toggleShowMore = this.toggleShowMore.bind(this);
    }

    componentDidMount() {
        /* This is just simulation of actual delivering etc. */
        setTimeout(() =>
            this.setState({status: <h3 style={{color: "orange"}}>Delivering...</h3>}),
            30 * 1000);
        setTimeout(() =>
                this.setState({status: <h3 style={{color: "blue"}}>Delivered</h3>}),
            90 * 1000);
    }

    toggleShowMore() {
        this.setState(prevState => ({showMore: !prevState.showMore}))
    }

    render() {
        return (
            <div className={"PastOrderData"}>
                <div className={"BasicInfo"}>
                    <h3 className={"PastOrderTotal"}>Total: ${this.props.order.total}</h3>
                    <h3 className={"PastOrderDate"}>{this.props.order.date}</h3>
                </div>

                <div className={"DynamicInfo"}>
                    {this.state.status}
                    <button onClick={this.toggleShowMore} className={"Show"}>
                        {this.state.showMore ? "Show Less" : "Show More"}
                    </button>
                </div>
                {
                    this.state.showMore ? <FullOrderInfo ingredients={this.state.ingredients}/> : null
                }
            </div>
        )
    }
}

class FullOrderInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ingredients = this.props.ingredients.map(ingredient => <h3>{ingredient.name} - ${ingredient.price}</h3>);
        return (
            <div className={"FullInfo"}>
                <div>
                    {ingredients}
                </div>
            </div>
        )
    }
}