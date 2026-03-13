import { useState, useMemo } from 'react'

export  function useRecipeFilter(ricette) {
    const [testo, setTesto] = useState('')
    const [tagAttivi, setTagAttivi] = useState([])

    const toggleTag = (tag) => {
        setTagAttivi(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }

    const ricetteFiltrate = useMemo(() => {
        return ricette.filter(ricetta => {
            const matchTesto = ricetta.nome.toLowerCase().includes(testo.toLowerCase())
            const matchTag = tagAttivi.length === 0 || tagAttivi.every(t => ricetta.tags.includes(t))
            return matchTesto && matchTag
        })
    }, [ricette, testo, tagAttivi])

    return { testo, setTesto, tagAttivi, toggleTag, ricetteFiltrate }
}