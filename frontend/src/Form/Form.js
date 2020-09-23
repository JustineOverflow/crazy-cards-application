import React from 'react';
import Header from "../Header/Header";

class Form extends React.Component {

    constructor() {
        super();
        this.state = {
            employment: '',
            income: '',
            eligibleCards: [],
            error: ''
        }
        this.updateIncome = this.updateIncome.bind(this)
        this.updateEmployment = this.updateEmployment.bind(this)
        this.submit = this.submit.bind(this)
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
                })
            } else {
                this.setState({
                    eligibleCards: (await response.json()).eligibles,
                    error: ''
                })
                console.log(this.state)
            }
        } catch (error) {
            console.log(error)
        }
        event.preventDefault()
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
                                className="">Submit form
                        </button>
                    </div>
                    {this.state.eligibleCards.map(card =>
                        <p>
                            {card}
                        </p>)}
                </section>
            </div>
        );
    }
}

export default Form;