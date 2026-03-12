import {UseState} from 'react'
import { creaRicettaVuota } from '../data/models' // Importo la funzione per creare una ricetta vuota

export default function RecipeForm({ onSave}) {
    const [ricetta, setRicetta] = UseState(creaRicettaVuota()) // Inizializzo lo stato con una ricetta vuota

    const handleCampo = (campo, valore) => {
        setRicetta(prev => ({ ...prev, [campo]: valore })) // Aggiorno il campo specificato nella ricetta
    }

    const handleIngrediente = (index, campo, valore) => {
        const nuovi = [...ricetta.ingredienti] // Creo una copia dell'array degli ingredienti
        nuovi[index][campo] = valore // Aggiorno il campo specifico dell'ingrediente
        setRicetta(prev => ({ ...prev, ingredienti: nuovi })) // Aggiorno lo stato con i nuovi ingredienti
    }   

    const aggiungiIngrediente = () => {
        setRicetta(prev => ({ ...prev, ingredienti: [...prev.ingredienti, { nome: '', quantita: '' }] })) // Aggiungo un nuovo ingrediente vuoto alla ricetta
    }

    const rimuoviIngrediente = (index) => {
        if (ricetta.ingredienti.length === 1) return // Non permetto di rimuovere l'ultimo ingrediente
        const nuovi=ricetta.ingredienti.filter((_, i) => i !== index) // Rimuovo l'ingrediente all'indice specificato
        setRicetta(prev => ({ ...prev, ingredienti: nuovi })) // Aggiorno lo stato con i nuovi ingredienti
    }

    const handleSubmit = () => {
        if (!ricetta.nome.trim()) return alert('Il nome della ricetta è obbligatorio') // Verifico che il nome della ricetta non sia vuoto
        onSave(ricetta) // Chiamo la funzione onSave passata come prop con la ricetta da salvare
        setRicetta(creaRicettaVuota()) // Resetto il form a una ricetta vuota dopo il salvataggio
    }

    return (
        <div>
            <input className="input-base"
            placeholder='Nome ricetta'
            value={ricetta.nome}
            onChange={e => handleCampo('nome', e.target.value)}
             />
            
            <h3>Ingredienti</h3>
            {ricetta.ingredienti.map((ing, index) => (
                <div key={index} >
                    <input className="input-base"
                    placeholder='Nome ingrediente'
                    value={ing.nome}
                    onChange={e => handleIngrediente(index, 'nome', e.target.value)}
                        />
                    <input className="input-base w-28"
                    placeholder='Quantità'
                    value={ing.quantita}
                    onChange={e => handleIngrediente(index, 'quantita', e.target.value)}
                    />
                    <button className="btn-danger" onClick={() => rimuoviIngrediente(index)}>Rimuovi</button>
                    </div>
            ))}
            <button className="btn-secondary" onClick={aggiungiIngrediente}>Aggiungi ingrediente</button>

            <textarea
            className="input-base"
            placeholder='Istruzioni'
            value={ricetta.istruzioni}
            onChange={e => handleCampo('istruzioni', e.target.value)}
             />

            <input className="input-base w-28"
            type="number"
            placeholder='Calorie'
            value={ricetta.calorie}
            onChange={e => handleCampo('calorie', e.target.value)}
             />
        </div>
    )
}