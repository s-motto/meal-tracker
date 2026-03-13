import { useState } from 'react'
import { useProfile } from '../hooks/useProfile'
import { creaMisurazioneVuota } from '../data/models'
import Toast from '../components/Toast'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts'

const MISURE = ['braccia', 'cosce', 'petto', 'vita', 'fianchi']
const MISURE_CON_PESO = ['peso', ...MISURE]

const UNITA = {
  peso: 'kg',
  braccia: 'cm',
  cosce: 'cm',
  petto: 'cm',
  vita: 'cm',
  fianchi: 'cm'
}

const COLORI = {
  peso: '#89023E',
  braccia: '#89023E',
  cosce: '#CC7178',
  petto: '#C7D9B7',
  vita: '#89023E',
  fianchi: '#CC7178'
}

function formatData(data) {
  return new Date(data).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })
}

export default function Profile() {
  const { profilo, misurazioni, aggiornaProfilo, aggiungiMisurazione, eliminaMisurazione, calcolaEta } = useProfile()
  const [modificaProfilo, setModificaProfilo] = useState(false)
  const [bozzaProfilo, setBozzaProfilo] = useState(profilo)
  const [nuovaMisurazione, setNuovaMisurazione] = useState(creaMisurazioneVuota())
  const [toast, setToast] = useState('')
  const [toastId, setToastId] = useState(0)
  const [mostraPeso, setMostraPeso] = useState(false)
  const [bozzaPeso, setBozzaPeso] = useState({ data: new Date().toISOString().split('T')[0], valore: '' })

  const mostraToast = (msg) => {
    setToast(msg)
    setToastId(id => id + 1)
  }

  const handleSalvaProfilo = () => {
    aggiornaProfilo(bozzaProfilo)
    setModificaProfilo(false)
    mostraToast('Profilo aggiornato')
  }

  const handleAggiornaCampo = (campo, valore) => {
    setBozzaProfilo(prev => ({ ...prev, [campo]: valore }))
  }

  const handleAggiornaMisurazione = (campo, valore) => {
    setNuovaMisurazione(prev => ({ ...prev, [campo]: valore }))
  }

  const handleSalvaMisurazione = () => {
    const haValori = MISURE.some(m => nuovaMisurazione[m] !== '')
    if (!haValori) return mostraToast('Inserisci almeno una misurazione')
    aggiungiMisurazione(nuovaMisurazione)
    setNuovaMisurazione(creaMisurazioneVuota())
    mostraToast('Misurazione salvata')
  }

  const eta = calcolaEta()

  // include peso nei dati grafico
  const datiGrafico = misurazioni.map(m => ({
    data: formatData(m.data),
    ...Object.fromEntries(MISURE_CON_PESO.map(k => [k, m[k] ? Number(m[k]) : null]))
  }))

  // ultimo peso salvato nelle misurazioni
  const ultimoPeso = [...misurazioni].reverse().find(m => m.peso)

  return (
    <div className="max-w-xl mx-auto px-4 py-6 flex flex-col gap-8">

      {/* Dati personali */}
      <div className="card shadow-sm flex flex-col gap-4">

        <div className="flex justify-between items-center flex-wrap gap-2">
          <h1 className="text-2xl">Profilo</h1>
          <div className="flex gap-2">
           <button
  className="btn-secondary"
  onClick={() => {
    setMostraPeso(v => !v)
    setModificaProfilo(false)  // ← chiude modifica
  }}
>
  {mostraPeso ? 'Annulla' : '⚖️ Peso'}
</button>

<button
  className="btn-secondary"
  onClick={() => {
    setBozzaProfilo(profilo)
    setModificaProfilo(v => !v)
    setMostraPeso(false)  // ← chiude peso
  }}
>
  {modificaProfilo ? 'Annulla' : 'Modifica'}
</button>
          </div>
        </div>

        {mostraPeso && (
          <div className="flex flex-col gap-3 border-t border-blush pt-3">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm text-gray-500">Data</label>
                <input
                  className="input-base"
                  type="date"
                  value={bozzaPeso.data}
                  onChange={e => setBozzaPeso(p => ({ ...p, data: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm text-gray-500">Peso (kg)</label>
                <input
                  className="input-base"
                  type="number"
                  placeholder="es. 65"
                  value={bozzaPeso.valore}
                  onChange={e => setBozzaPeso(p => ({ ...p, valore: e.target.value }))}
                />
              </div>
            </div>
            <button
              className="btn-primary w-full"
              onClick={() => {
                if (!bozzaPeso.valore) return mostraToast('Inserisci il peso')
                aggiungiMisurazione({ ...creaMisurazioneVuota(), id: crypto.randomUUID(), data: bozzaPeso.data, peso: bozzaPeso.valore })
                setBozzaPeso({ data: new Date().toISOString().split('T')[0], valore: '' })
                setMostraPeso(false)
                mostraToast('Peso aggiornato')
              }}
            >
              Salva peso
            </button>
          </div>
        )}

        {modificaProfilo ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500">Nome</label>
              <input
                className="input-base"
                value={bozzaProfilo.nome}
                onChange={e => handleAggiornaCampo('nome', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500">Data di nascita</label>
              <input
                className="input-base"
                type="date"
                value={bozzaProfilo.dataNascita}
                onChange={e => handleAggiornaCampo('dataNascita', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500">Altezza (cm)</label>
              <input
                className="input-base"
                type="number"
                value={bozzaProfilo.altezza}
                onChange={e => handleAggiornaCampo('altezza', e.target.value)}
              />
            </div>
            <button className="btn-primary w-full" onClick={handleSalvaProfilo}>
              Salva
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-sm">
            {profilo.nome && <p className="text-lg font-medium">{profilo.nome}</p>}
            {eta !== null && <p className="text-gray-500">{eta} anni</p>}
            <div className="flex gap-6 mt-1">
              {(ultimoPeso || profilo.peso) && (
                <p className="text-gray-600">⚖️ {ultimoPeso ? ultimoPeso.peso : profilo.peso} kg</p>
              )}
              {profilo.altezza && <p className="text-gray-600">📏 {profilo.altezza} cm</p>}
            </div>
            {!profilo.nome && !profilo.altezza && !ultimoPeso && !profilo.peso && (
              <p className="text-gray-400">Nessun dato ancora. Clicca Modifica per iniziare.</p>
            )}
          </div>
        )}

      </div>

      {/* Nuova misurazione */}
      <div className="card shadow-sm flex flex-col gap-4">
        <h2 className="text-xl">Nuova misurazione</h2>
        <p className="text-xs text-gray-400">Data: {nuovaMisurazione.data}</p>
        <div className="grid grid-cols-2 gap-3">
          {MISURE.map(misura => (
            <div key={misura} className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 capitalize">{misura} (cm)</label>
              <input
                className="input-base"
                type="number"
                placeholder="es. 65"
                value={nuovaMisurazione[misura]}
                onChange={e => handleAggiornaMisurazione(misura, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="btn-primary w-full" onClick={handleSalvaMisurazione}>
          Salva misurazione
        </button>
      </div>

      {/* Grafici */}
      {misurazioni.length > 1 && (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl">Andamento</h2>
          {MISURE_CON_PESO.map(misura => {
            const haValori = datiGrafico.some(d => d[misura] !== null)
            if (!haValori) return null
            const unita = UNITA[misura]
            return (
              <div key={misura} className="card shadow-sm flex flex-col gap-3">
                <h3 className="text-sm font-medium capitalize text-gray-600">{misura}</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={datiGrafico}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#FFD9DA" />
                    <XAxis dataKey="data" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} unit={` ${unita}`} />
                    <Tooltip formatter={(v) => [`${v} ${unita}`, misura]} />
                    <Line
                      type="monotone"
                      dataKey={misura}
                      stroke={COLORI[misura]}
                      strokeWidth={2}
                      dot={{ fill: COLORI[misura] }}
                      connectNulls
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )
          })}
        </div>
      )}

      {misurazioni.length === 1 && (
        <p className="text-gray-400 text-center text-sm">
          Aggiungi almeno due misurazioni per vedere il grafico.
        </p>
      )}

      {/* Storico misurazioni */}
      {misurazioni.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-xl">Storico</h2>
          {[...misurazioni].reverse().map(m => (
            <div key={m.id} className="card shadow-sm flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600">{formatData(m.data)}</p>
                <button className="btn-danger" onClick={() => eliminaMisurazione(m.id)}>✕</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {m.peso && (
                  <span className="text-sm text-gray-600">
                    peso: <span className="text-primary font-medium">{m.peso} kg</span>
                  </span>
                )}
                {MISURE.map(misura => m[misura] && (
                  <span key={misura} className="text-sm text-gray-600 capitalize">
                    {misura}: <span className="text-primary font-medium">{m[misura]} cm</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Toast key={toastId} messaggio={toast} onClose={() => setToast('')} />
    </div>
  )
}