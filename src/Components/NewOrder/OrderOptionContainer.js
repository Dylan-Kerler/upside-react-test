import React from "react";
import PizzaStore from "../../Stores/Pizza";

export default class OrderOptionContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };

        this.changeSelected = this.changeSelected.bind(this);
    }

    changeSelected(item) {
        // If the  item already exists in the array then remove it, otherwise just push
        for (const index in this.state.selected) {
            if (this.state.selected[index].name === item.name) {
                this.setState(prevState => {
                    // Do a deep copy here since we have an array
                    const newState = JSON.parse(JSON.stringify(prevState));
                    newState.selected.splice(index, 1);
                    return newState;
                });
                return;
            }
        }

        // For toppings, there can be multiple selections, otherwise only one selection
        if (this.props.type === "Toppings") {
            this.setState(prevState => {
                // Do a deep copy here since we have an array
                const newState = JSON.parse(JSON.stringify(prevState));
                newState.selected.push(item);
                return newState;
            });
        } else {
            this.setState({selected: [item]});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
            PizzaStore.dispatch({type: this.props.action, data: this.state.selected});
        }
    }

    render() {
        const items = this.props.items.map(item => {
            let isSelected = false;
            for (const selectedItem of this.state.selected) {
                if (item.name === selectedItem.name) {
                    isSelected = true;
                }
            }

            return <OptionItem name={item.name}
                               changeSelected={this.changeSelected}
                               price={item.price} isSelected={isSelected}/>;
        });

        return (
            <div className={"OrderOptionDiv"}>
                <div className={"NewOrderTitles"}><h3>{this.props.type}</h3></div>

                <div className={"OrderOptions"}>
                    {items}
                </div>
            </div>
        )
    }
}

class OptionItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log({name: this.props.name, price: this.props.price});
        this.props.changeSelected({name: this.props.name, price: this.props.price});
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <p>{this.props.name} <b>(+${this.props.price.toFixed(2)})</b></p>
                <CircleSelector fill={this.props.isSelected ? "#17e861" : "none"}
                                stroke={this.props.isSelected ? "#17e861" : "lightgrey"}/>
            </div>
        )
    }
}

const CircleSelector = props => {
    return (
        <div className={"CircleContainer"}>
            <svg height="50" width="50">
                <circle cx="25" cy="26" r="7" stroke={props.stroke} strokeWidth="1" fill={props.fill} />
            </svg>
        </div>
    )
};