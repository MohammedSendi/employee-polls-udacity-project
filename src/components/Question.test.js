import { render, fireEvent } from "@testing-library/react";
import * as React from 'react'
import Question from './Question'
import store from "../app/store"
import { Provider } from 'react-redux';
import {handleInitialData} from '../actions/shared'
import {Route, Routes, MemoryRouter} from "react-router-dom"

describe('Question', () => {
    it("matches the snapshot when an id is passed", async() => {
        await store.dispatch(handleInitialData())
        var component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <Question id={'vthrdm985a262al8qx3do'}/>            
                </Provider>
            </MemoryRouter>
        )
        expect(component).toMatchSnapshot();

    })
})