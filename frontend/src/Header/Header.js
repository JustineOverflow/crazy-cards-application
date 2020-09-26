import React from 'react';
import {withRouter} from 'react-router-dom';

class Header extends React.Component {

    goTo() {
        this.props.history.push('/')
    }

    render() {
        return (
            <section className="header">
                <h1 className="header-title"><i onClick={() => this.goTo()} className="icon far fa-credit-card"></i>Cards Eligibility</h1>
            </section>
        );
    }
}

export default withRouter(Header);