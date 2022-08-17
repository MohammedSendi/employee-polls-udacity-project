import { render, fireEvent } from "@testing-library/react";
import * as React from 'react'
import NewQuestion from "./NewQuestion";
import store from "../app/store"
import { Provider } from 'react-redux';
import '@testing-library/jest-dom'
import {BrowserRouter} from 'react-router-dom'

describe('NewQuestion', () => {
    it('will display an error if an option is messing', () => {
        var { getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewQuestion />
                </BrowserRouter>
            </Provider>
        )

        var submitButton = getByTestId('submit-button');
        fireEvent.click(submitButton)
        expect(getByTestId('error')).toBeInTheDocument()
    })
})