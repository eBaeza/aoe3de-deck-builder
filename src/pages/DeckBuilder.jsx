import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useImmerReducer } from 'use-immer';
import Box from '@mui/material/Box'
import { cardsReducer, cardsInitialState } from "../reducers/cards.reducer";
import { selectedCardsReducer, selectedCardsInitialState } from "../reducers/selectedCards.reducer";
import { DeckBoard } from "../components/DeckBoard";
import { MainDeck } from "../components/MainDeck";
import { getHomeCityData } from "../services/getHomeCityData";
import { translate } from '../utils/translator';

export const DeckBuilder = ({ civ }) => {
    const [maxCards, setMaxCards] = useState(25)
    const [cards, dispatchCards] = useImmerReducer(cardsReducer, cardsInitialState)
    const [selectedCards, dispatchSelectedCards] = useImmerReducer(selectedCardsReducer, selectedCardsInitialState)
    const maxCardsRef = useRef(maxCards)
    const selectedCardsRef = useRef(selectedCards)

    useEffect(() => {
        dispatchSelectedCards({ type: 'reset' })

        if (civ) {
            getHomeCityData(civ.homecityfilename).then(data => {
                dispatchCards({ type: 'update', data: data.cards })
                setMaxCards(() => data.maxcardsperdeck)
            })
        } else {
            dispatchCards({ type: 'reset' })
        }
    }, [civ])

    useEffect(() => {
        maxCardsRef.current = maxCards
        selectedCardsRef.current = selectedCards
    }, [maxCards, selectedCards])


    const handleOnClickCard = useCallback((card) => {
        const { id, ageKey } = card
        const ageCount = selectedCardsRef.current[`${ageKey}Count`]
        const total = selectedCardsRef.current.total

        if (!card.isSelected && ageCount < 10 && total < maxCardsRef.current) {
            dispatchSelectedCards({ type: 'addCard', card })
        } else if (card.isSelected) {
            dispatchSelectedCards({ type: 'removeCard', id, ageKey })
        }

        if ((!card.isSelected && ageCount < 10 && total < maxCardsRef.current) || card.isSelected) {
            dispatchCards({ type: 'toggleSelected', id, ageKey })
        }
    }, [])

    const handleOnClickDeckCard = (card) => {
        const { id, ageKey } = card
        dispatchSelectedCards({ type: 'removeCard', id, ageKey })
        dispatchCards({ type: 'toggleSelected', id, ageKey })
    }

    return (
        <Box>
            {civ &&
                <DeckBoard
                    civName={translate(civ.displaynameid)}
                    maxCards={maxCards}
                    selectedCards={selectedCards}
                    onClickCard={handleOnClickDeckCard}
                ></DeckBoard>
            }
            {civ ?
                <MainDeck cards={cards} onClickCard={handleOnClickCard} /> :
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <img className='flag-random' src='/resources/images/icons/flags/Flag_Random.png' alt="flag random" />
                </Box>
            }
        </Box>
    )
}