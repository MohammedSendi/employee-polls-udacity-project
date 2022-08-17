import { render, fireEvent } from "@testing-library/react";
import * as React from 'react'
import Login from "./Login";
import store from "../app/store"
import { Provider } from 'react-redux';
import '@testing-library/jest-dom'

describe('Login', () => {
    it('will display an error if a credential is messing', () => {
        var { getByTestId } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        var submitButton = getByTestId('submit-button');
        fireEvent.click(submitButton)
        expect(getByTestId('error')).toBeInTheDocument()
    })
})