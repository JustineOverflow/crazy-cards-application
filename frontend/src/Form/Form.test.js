import React from 'react';
import {fireEvent, render, waitForElement} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Form from "./Form";
import fetchMock from 'fetch-mock';
import * as dom from "@testing-library/dom";

describe('Test Form', () => {
    afterEach(() => fetchMock.restore());

    it('It retrieves eligible cards on button click (mock fetch API)', async () => {
        const card = ["Mock Card"]
        fetchMock.mock('http://127.0.0.1:3001/cards?employment=student&income=0', {
            eligibles: card,
            status: 202
        });
        const {getByText} = render(<Router>
            <Form/>
        </Router>);
        const button = getByText('Show me the cards');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        const card1 = await waitForElement(
            () => getByText('Mock Card')
        );
        expect(card1).toBeInTheDocument();
    });

    it('It returns an error message missing income (mock fetch API)', async () => {
        const error = "Mock Error"
        fetchMock.mock('http://127.0.0.1:3001/cards?employment=student&income=0', {
            status: 400,
            body: {
                eligibleCards: [],
                reason: error,
            },
        });
        const {getByText} = render(<Router>
            <Form/>
        </Router>);
        const button = dom.getByText('Show me the cards');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        const errorDisplayed = await waitForElement(
            () => getByText(error)
        );
        expect(errorDisplayed).toBeInTheDocument();
    });
})                                       
