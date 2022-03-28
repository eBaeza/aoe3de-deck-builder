export const selectedCardsInitialState = {
    total: 0,
    age1: [],
    age1Count: 0,
    age2: [],
    age2Count: 0,
    age3: [],
    age3Count: 0,
    age4: [],
    age4Count: 0,
}


export const selectedCardsReducer = (draft, action) => {
    switch (action.type) {
        case 'addCard':
            const { card } = action
            draft.total++
            draft[card.ageKey].push(card)
            draft[`${card.ageKey}Count`]++
            draft[card.ageKey] = draft[card.ageKey].sort((a, b) => {
                const [,,valA] = a.id.split('-')
                const [,,valB] = b.id.split('-')
            
                return +valA - +valB
              })

            return
        case 'removeCard':
            const { id, ageKey } = action
            const idx = draft[ageKey].findIndex(item => item.id === id)
            draft.total--
            draft[`${ageKey}Count`]--
            draft[ageKey].splice(idx, 1)

            return
        case 'reset':
            return selectedCardsInitialState
        default:
            return draft
    }
}