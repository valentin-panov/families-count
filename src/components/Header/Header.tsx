import React, {memo} from 'react'
import cn from 'clsx'
import s from './Header.module.scss'
import plane from '../../../src/img/btnPlane.png'
import {useDispatch} from "react-redux";
import {acquireFamilies} from "../../reducers/people";

export type Props = {
    className?: string
}


export const Header = memo<Props>(({className}) => {
    const dispatch = useDispatch()

    const activate = () => {
        dispatch(acquireFamilies())
    }

    return (
        <header className={cn(s.root, className)}>
            <button type={'button'} onClick={activate} className={s.btn} style={{backgroundImage: `url(${plane})`}}>
            </button>
        </header>
    )
})

Header.displayName = 'Header'
