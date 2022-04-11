/* eslint-disable no-param-reassign */

// Core
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {InPeople, InPerson} from '../interfaces/Interfaces'
import {serverURL} from '../App'
import {relatives} from "../helpers/acquireFamily";

const initialState: InPeople = {
    status: 'idle',
    error: '',
    data: [
        {id: 1, relatives: [2], checked: false},
        {id: 2, relatives: [1, 3], checked: false},
        {id: 3, relatives: [2], checked: false},
        {id: 4, relatives: [5, 6], checked: false},
        {id: 5, relatives: [4, 7], checked: false},
        {id: 6, relatives: [4, 8], checked: false},
        {id: 7, relatives: [5, 9], checked: false},
        {id: 8, relatives: [6], checked: false},
        {id: 9, relatives: [7], checked: false},
        {id: 10, relatives: [11], checked: false},
        {id: 11, relatives: [10, 12], checked: false},
        {id: 12, relatives: [11, 13], checked: false},
        {id: 13, relatives: [12, 14], checked: false},
        {id: 14, relatives: [13, 15], checked: false},
        {id: 15, relatives: [14], checked: false},
    ],
    families: []
}

const getPeople = async (reqURL: string): Promise<InPerson[]> => {
    const response = await fetch(reqURL)
    if (!response.ok) {
        return getPeople(reqURL)
    }
    if (response.status === 404) {
        // можно добавить кодов ошибок, если знать, что может прилететь с бэка
        throw new Error(`${response.status}`)
    }
    const result = await response.json()
    if (result.stop === false) {
        return getPeople(reqURL)
    } else {
        return result.people
    }
}

export const peopleFetch = createAsyncThunk(
    'people/FetchingData',
    async () => {
        const tokenURL = `${serverURL}/search`
        const tokenResponse = await fetch(tokenURL)
        if (!tokenResponse.ok) {
            throw new Error(`request error: ${tokenURL}`)
        }
        const tokenResult = await tokenResponse.json()
        const token = tokenResult.searchId

        const ticketsURL = `${serverURL}/tickets?searchId=${token}`
        return await getPeople(ticketsURL)
    }
)

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        peopleErrorRemove: (state) => {
            state.error = ''
        },
        acquireFamilies: (state) => {
            state.families = relatives(state.data)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(peopleFetch.pending, (state) => {
            state.status = 'pending'
            state.error = ''
        })
        builder.addCase(
            peopleFetch.fulfilled,
            (state, action: PayloadAction<InPerson[]>) => {
                state.data = action.payload.map(el => ({...el, checked: false}))
                state.status = 'success'
            }
        )
        builder.addCase(peopleFetch.rejected, (state, action) => {
            state.status = 'error'
            state.error = String(action.error.message)
        })
    }
})

export const {peopleErrorRemove, acquireFamilies} = peopleSlice.actions

export const people = peopleSlice.reducer
