import React, {ReactElement} from 'react'
import s from './TopBar.module.scss'

export default function TopBar(): ReactElement {

    return (
        <div className={s.root}>Условие: у каждого персонажа дан массив ближайших родственников. Необходимо посчитать
            семьи </div>
    )
}
