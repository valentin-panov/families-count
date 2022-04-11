import React, {ReactElement} from 'react'
import s from './SideBar.module.scss'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from "../../../store";


export default function SideBar(): ReactElement {
    const {data} = useSelector(
        (store: RootState) => store.people,
        shallowEqual
    )


    return (
        <section className={s.root}>
            <h2 className={s.sideFilters_title}>Входные данные</h2>
            {data.map(el => <div key={el.id}><span>ID: {el.id} </span><span
                key={el.id}>Relatives: [{el.relatives.join(', ')}]</span></div>)}
        </section>
    )
}
