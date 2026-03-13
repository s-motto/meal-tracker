const TAGS = ['vegetariano', 'vegano', 'veloce', 'dolce', 'senza glutine']

export default function RecipeSearch({ testo, onTesto, tagAttivi, onTag }) {
      return (
    <div className="flex flex-col gap-3">
      <input
        className="input-base"
        placeholder="Cerca ricetta..."
        value={testo}
        onChange={e => onTesto(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => onTag(tag)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors capitalize
              ${tagAttivi.includes(tag)
                ? 'bg-primary text-white border-primary'
                : 'border-blush hover:border-primary-light hover:text-primary'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}