import QuesionPage from "./QuesionPage";
import { render } from "@testing-library/react";
import * as React from 'react'
import store from "../app/store"
import { Provider } from 'react-redux';
import '@testing-library/jest-dom'
import {Route, Routes, MemoryRouter} from "react-router-dom"
import {handleInitialData} from '../actions/shared'

import Home from './Home'


describe('QuesionPage', () => {
    it('will display correct data if id is found', async () => {

        const route = '/poll/xj352vofupe1dqz9emx13r'
        await store.dispatch(handleInitialData())

        var { getByTestId, queryByTestId } = render(
            <MemoryRouter initialEntries={[route]}>
                <Provider store={store}>
                    <Routes>
                        <Route path='/poll/:id' element={<QuesionPage/>}/>
                    </Routes>
                </Provider>
            </MemoryRouter>

        )
        expect(queryByTestId('error')).toBeNull()
        expect(getByTestId('author')).toBeInTheDocument()
        expect(getByTestId('option-one')).toBeInTheDocument()
        expect(getByTestId('option-two')).toBeInTheDocument()

    })
})

describe('QuesionPage', () => {
    it('will display 404 message if id not found', async () => {

        const route = '/poll/undefined-id'
        await store.dispatch(handleInitialData())

        var { getByTestId, queryByTestId } = render(
            <MemoryRouter initialEntries={[route]}>
                <Provider store={store}>
                    <Routes>
                        <Route path='/poll/:id' element={<QuesionPage/>}/>
                    </Routes>
                </Provider>
            </MemoryRouter>

        )
        expect(getByTestId('error')).toBeInTheDocument()
        expect(queryByTestId('author')).toBeNull()
        expect(queryByTestId('option-one')).toBeNull()
        expect(queryByTestId('option-two')).toBeNull()

    })
})