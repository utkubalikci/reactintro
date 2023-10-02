import React, { Component } from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
    NavLink,
    Badge
} from 'reactstrap';

class CartSummary extends Component {
    renderCart() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Cart
                </DropdownToggle>
                <DropdownMenu >
                    {
                        this.props.cart.map(cartItem => (
                            <DropdownItem key={cartItem.product.id}>
                                <Badge
                                    onClick={() => this.props.removeFromCart(cartItem.product)}
                                    color="danger"
                                    pill
                                >
                                    x
                                </Badge>
                                <Badge
                                    color="success"
                                    pill
                                >
                                    {cartItem.quantity}
                                </Badge>
                                {cartItem.product.productName}
                            </DropdownItem>
                        ))
                    }
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
    renderEmptyCart() {
        return (
            <NavItem>
                <NavLink>
                    Empty Cart
                </NavLink>
            </NavItem>
        );
    }
    render() {
        return (
            <div>  {this.props.cart.length > 0 ? this.renderCart() : this.renderEmptyCart()} </div>
        );
    }
}

export default CartSummary;