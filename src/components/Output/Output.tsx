import React, {memo} from 'react'
import cn from 'clsx'
import s from './Output.module.scss'
import SideBar from "./SideBar/SideBar";
import TopBar from "./TopBar/TopBar";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../../store";

export type Props = {
    className?: string
}

export const Output = memo<Props>(({className}) => {
    const {families} = useSelector(
        (store: RootState) => store.people,
        shallowEqual
    )

    return (
        <>
            <div className={cn(s.root, className)}>
                <div className={s.sideFilters}>
                    <SideBar/>
                </div>
                <div className={s.topFilters}>
                    <TopBar/>
                </div>
                <div className={s.tickets}>
                    {families.length > 0 && families.map(el => <div key={el[0].id}>FAMILY : {el.map(person => <div
                        key={person.id}>PERSON ID {person.id}</div>)}</div>)}
                </div>
            </div>
        </>
    )
})

Output.displayName = 'Output'
