import React from "react"
export default class BurgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            burgers: [
                {name: "Double Cheeseburger", price: 2.4},
                {name: "Hamburger", price: 3},
                {name: "XL Bacon Burger", price: 4},
                {name: "Blue Cheeseburger", price: 4},
                {name: "New York Burger", price: 3.8},
                {name: "Double Hamburger", price: 4},
                {name: "Philly Cheeseburger", price: 4.8},
                {name: "Vegan Burger", price: 4},
            ]
        }
    }

    render() {
        const burgerItems = this.state.burgers.map(burger => <BurgerItem name={burger.name} price={burger.price}/>);
        return (
            <div className={"BurgerMenuContainer"}>
                <h3>Burger Menu</h3>
                <div className={"BurgerItemDiv"}>
                    {burgerItems}
                </div>
            </div>

        )
    }
}

const BurgerItem = props => {
    return (
        <div className={"BurgerItem"}>
            <h3>{props.name}</h3>
            <h3 className={"BurgerPrice"}>${props.price}</h3>
        </div>
    )
};