import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
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
  types: TypeInfo[];
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
export interface PokemonTypeInfo {
  name: string;
  url: string;
}
export interface AbilityInfo {
  ability: {
    name: string;
  };
}
function SearchCard({
  onShowDetails,
}: {
  onShowDetails: (pokemon: string) => void;
}) {
  const {
    pokemonDetails
  } = useAppSelector((state: RootState) => state.pokemon);
  return (
    <>
      <div className={styles.searchResults}>
        {Array.isArray(pokemonDetails) && pokemonDetails.map((result: PokemonDetail, index: number) => (
          <div
            className={styles.card}
            key={index}
            style={{ listStyleType: 'none' }}
          >
            <div>
              <strong>{result.name}</strong>
            </div>
            <div>
              Type: {result.types.map((type) => type.type.name).join(', ')}
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
