import React from 'react';
import MenuSelectStore, {MenuSelections} from "../../Stores/MenuSelect";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [
                {value: MenuSelections.PAST_ORDERS,  text: "Past Orders"},
                {value: MenuSelections.BURGER_MENU,  text: "Burger Menu"},
                {value: MenuSelections.NEW_ORDER,    text: "New Order"}
            ]
        };
        this.updateMenuSelection = this.updateMenuSelection.bind(this);
    }

    updateMenuSelection(event) {
        MenuSelectStore.dispatch({selection: event.target.value, type: ""})
    }

    render() {
        const menuItems = this.state.menuItems.map(item => <button value={item.value}
                                                                   onClick={this.updateMenuSelection}>{item.text}
                                                            </button>);

        return (
                <div id={"NavBar"}>
                    <div id={"NavTitle"}><p>Pizzaria</p></div>

                    <div id={"NavMenuItems"}>
                        {menuItems}
                    </div>
                </div>
            )
    }
}