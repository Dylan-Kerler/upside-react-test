import React from 'react';
import NavBar from "./NavBar/NavBar";
import NewOrder from "./NewOrder/NewOrder";
import PastOrdersContainer from "./PastOrdersContainer/PastOrdersContainer";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import '../CSS/App.css';
import "../CSS/NavBar.css";
import "../CSS/index.css";
import "../CSS/NewOrder.css"
import "../CSS/PastOrders.css"
import "../CSS/BurgerMenu.css"

import MenuSelectStore, {MenuSelections} from "../Stores/MenuSelect";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: MenuSelections.NEW_ORDER
        };
    }

    componentDidMount() {
        MenuSelectStore.subscribe(() => {
            this.setState({selection: MenuSelectStore.getState().selection});
        });
    }

    render() {
        const Selection = (() => {
            switch(this.state.selection) {
                case MenuSelections.NEW_ORDER:
                    return <NewOrder/>;
                case MenuSelections.PAST_ORDERS:
                    return <PastOrdersContainer/>;
                case MenuSelections.BURGER_MENU:
                    return <BurgerMenu/>
            }
        })();

        return (
            <div className="App">
                <NavBar/>
                {Selection}
            </div>
            )
    }
}