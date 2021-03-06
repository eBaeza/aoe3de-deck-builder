import './Card.css'
import React from 'react'
import { CardCosts } from "./CardCosts";
import { getStorageURL } from '../../utils/getStorageURL';

export const Card = React.memo(({
    name, icon, maxcount, displayunitcount, isSelected, costs 
}) => {
    const src = getStorageURL(icon, true)

    return (
        <div className='card'>
            <img loading='lazy' className='card__img' src={src} alt={name} />
            {maxcount === -1 &&
                <div className='card__maxcount'>∞</div>}
            {maxcount > 1 &&
                <div className='card__maxcount'>x{maxcount}</div>}
            {!!+displayunitcount &&
                <div className='card__unit-count'>{displayunitcount}</div>}
            {<CardCosts costs={costs}></CardCosts>}

            {isSelected && <img loading='lazy' className='card__check-icon' src={'/assets/hp_cp_check.png'} alt="check card"></img>}
        </div>
    )
})