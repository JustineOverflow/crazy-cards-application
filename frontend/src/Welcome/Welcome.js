import React from 'react';
import {ReactComponent as ReactAssess} from "../Welcome/search.svg";
import {withRouter} from 'react-router-dom';
import Header from "../Header/Header";

class Welcome extends React.Component {

    changeRoute() {
        this.props.history.push('/form')
    }

    render() {
        return (
            <div>
                <Header/>
                <section className="welcome">
                    <div className="welcome-description">
                        <p className="welcome-description-text">Fill up a quick form and discover which credit cards are
                            available to you, instantly</p>
                        <button
                            onClick={() => this.changeRoute()}
                            className="welcome-container-button">Check my eligible credit cards
                        </button>
                    </div>
                    <div className="welcome-img">
                        <ReactAssess/>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Welcome);