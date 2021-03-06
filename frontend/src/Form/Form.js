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
            cardsDetails: {},
            totalCredit: 0
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
            if (response.status >= 400) {
                const body = await response.json()
                this.setState({
                    error: body.reason,
                    employment: '',
                    income: '',
                    eligibleCards: [],
                    cardsDetails: {},
                })
            } else {
                this.setState({
                    eligibleCards: (await response.json()).eligibles,
                    error: '',
                    cardsDetails: {},
                })
            }
        } catch (error) {
            console.log(error)
        }
        event.preventDefault()
    }

    async getDetails(event) {
        if (this.state.cardsDetails[event]) {
            const credit = this.state.cardsDetails[event].credit
            this.state.totalCredit = this.state.totalCredit - credit;
            delete this.state.cardsDetails[event];
            this.setState({
                cardDetails: this.state.cardsDetails,
                totalCredit: this.state.totalCredit
            })
        } else {
            try {
                let response = await fetch(`http://127.0.0.1:3001/cards/details?card=${event}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const body = await response.json()
                const details = body.details
                this.state.cardsDetails[details.name] = details
                const credit = this.state.cardsDetails[details.name].credit
                this.state.totalCredit = this.state.totalCredit + credit;
                this.setState({
                    cardsDetails: this.state.cardsDetails,
                    totalCredit: this.state.totalCredit
                })
            } catch (error) {
                console.log(error)
            }
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
                            this.state.error ?
                                <p className="error">{this.state.error}</p> : <p></p>
                        }
                        <button onClick={this.submit}
                                className="">Show me the cards
                        </button>
                    </div>
                    {this.state.eligibleCards.length > 0 ?
                        <div className="totalCredit">
                            <p>Your total amount of credit available is: <span
                                className="totalCredit-amount">£{this.state.totalCredit}</span></p>
                        </div> : <div></div>}
                    <div className="cards">
                        {this.state.eligibleCards.map(card => {
                            return <div key={card} className="cards-container">
                                <p className="cards-container-title">{card}</p>
                                <button onClick={() => this.getDetails(card)}
                                        className={(card in this.state.cardsDetails) ? "cards-container-button-selected" : "cards-container-button"}>{(card in this.state.cardsDetails)?"Selected":"Select"}</button>
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
                                                className="cards-container-details-item">{this.state.cardsDetails[card].balance} (month)</span>
                                            </div>
                                            <div>
                                                Purchase Offer Duration: <span
                                                className="cards-container-details-item">{this.state.cardsDetails[card].purchase} (month)</span>
                                            </div>
                                            <div>
                                                Credit Available: <span
                                                className="cards-container-details-item">£{this.state.cardsDetails[card].credit}</span>
                                            </div>
                                        </div>
                                    </div> : <p></p>
                                }
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