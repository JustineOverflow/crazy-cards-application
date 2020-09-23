import React from 'react';
import {ReactComponent as ReactAssess} from "../Welcome/search.svg";

class Welcome extends React.Component {

    render() {
        return (
            <section className="welcome">
                <div className="welcome-description">
                    <p className="welcome-description-text">Fill up a quick form and discover which credit cards are available to you, instantly</p>
                    <button
                        className="welcome-container-button">Check my eligible credit cards
                    </button>
                </div>
                <div className="welcome-img">
                    <ReactAssess/>
                </div>
            </section>
        );
    }
}

export default Welcome;