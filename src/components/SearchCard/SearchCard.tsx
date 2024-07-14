import styles from './SearchCard.module.css';

export interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    back_shiny: string;
    front_shiny: string;
  };
  id: string;
  height: string;
  weight: string;
  base_experience: string;
  types: [];
  abilities: [];
  stats: BaseStats[];
}
interface BaseStats {
  base_stat: string;
}
export interface TypeInfo {
  type: {
    name: string;
  };
}
export interface AbilityInfo {
  ability: {
    name: string;
  };
}
function SearchCard({
  pokemonDetails,
  onShowDetails,
}: {
  pokemonDetails: PokemonDetail[];
  onShowDetails: (pokemon: string) => void;
}) {
  return (
    <>
      <div className={styles.searchResults}>
        {pokemonDetails.map((result: PokemonDetail, index: number) => (
          <div
            className={styles.card}
            key={index}
            style={{ listStyleType: 'none' }}
          >
            <div>
              <strong>{result.name}</strong>
            </div>
            <div>
              {' '}
              <img src={result.sprites.front_default} alt="foto" />
            </div>
            <button onClick={async () => onShowDetails(result.name)}>
              more...
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchCard;
