import React from 'react';
import {ReactComponent as ReactAssess} from "../Form/cards.svg";
import Header from "../Header/Header";

class Form extends React.Component {

    constructor() {
        super();
        this.state = {
            employment: 'student',
            income: '0',
            eligibleCards: [],
            error: '',
            isSelected: false,
            cardsDetails: {}
        }
        this.updateIncome = this.updateIncome.bind(this)
        this.updateEmployment = this.updateEmployment.bind(this)
        this.submit = this.submit.bind(this)
        this.getDetails = this.getDetails.bind(this)
    }

    updateIncome(event) {
        this.setState({
            income: event.target.value
        });
    }

    updateEmployment(event) {
        this.setState({
            employment: event.target.value
        });
    }

    async submit(event) {
        try {
            let response = await fetch(`http://127.0.0.1:3001/cards?employment=${this.state.employment}&income=${this.state.income}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.status !== 202) {
                this.setState({
                    error: (await response.json()).reason,
                    employment: '',
                    income: '',
                    eligibleCards: [],
                    isSelected: false,
                })
            } else {
                this.setState({
                    eligibleCards: (await response.json()).eligibles,
                    error: '',
                    isSelected: false,
                })
            }
        } catch (error) {
            console.log(error)
        }
        event.preventDefault()
    }

    async getDetails(event) {
        let card = event.toLowerCase().replace(/ /g, "-");
        this.setState({
            isSelected: true,
        })
        try {
            let response = await fetch(`http://127.0.0.1:3001/cards/details?card=${card}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const body = await response.json()
            const details = body.details
            this.state.cardsDetails[details.name] = details
            this.setState({
                cardsDetails: this.state.cardsDetails,
            })

        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return (
            <div>
                <Header/>
                <section className="form">
                    <p className="form-subtitle">Please fill in the form to find out which credit cards you are eligible
                        for</p>
                    <div>
                        <div className="">
                            <div>
                                <label>Employment status</label>
                                <select name="employment" id="employment" value={this.state.employment}
                                        onChange={event => this.updateEmployment(event)}>
                                    <option value=""></option>
                                    <option value="student">Student</option>
                                    <option value="unemployed">Unemployed</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="full-time">Full-time</option>
                                </select>
                            </div>
                            <div>
                                <label>Yearly income (£)</label>
                                <input
                                    type="number"
                                    value={this.state.income}
                                    onChange={event => this.updateIncome(event)}
                                />

                            </div>
                        </div>
                        {
                            this.state.error.length > 0 ?
                                <p className="error">{this.state.error}</p> : <p></p>
                        }
                        <button onClick={this.submit}
                                className="">Show me the cards
                        </button>
                    </div>
                    <div className="cards">
                        {this.state.eligibleCards.map(card => {
                            return <div key={card} className="cards-container">
                                <p className="cards-container-title">{card}</p>
                                {(card in this.state.cardsDetails) ?
                                    <div>
                                        <div><i className="cards-container-details-icon icon fas fa-info-circle"></i>
                                        </div>
                                        <div key={card} className="cards-container-details">
                                            <div>
                                                Apr: <span
                                                className="cards-container-details-item">{this.state.cardsDetails[card].apr} %</span>
                                            </div>
                                            <div>
                                                Balance Transfer Offer Duration: <span
                                                className="cards-container-details-item">{this.state.cardsDetails[card].balance} months</span>
                                            </div>
                                            <div>
                                                Purchase Offer Duration: <span
                                                className="cards-container-details-item">{this.state.cardsDetails[card].purchase} months</span>
                                            </div>
                                            <div>
                                                Credit Available: <span
                                                className="cards-container-details-item">£{this.state.cardsDetails[card].credit}</span>
                                            </div>
                                        </div>
                                    </div> : <p></p>
                                }
                                    <button onClick={() => this.getDetails(card)}
                                                     className="cards-container-button">Select
                                    </button>
                            </div>
                        })}
                    </div>
                    <ReactAssess/>
                </section>
            </div>
        );
    }
}

export default Form;