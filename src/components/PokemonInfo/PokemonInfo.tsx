import React from 'react';
import { AbilityInfo,  TypeInfo } from '../SearchCard/SearchCard';
import styles from './PokemonInfo.module.css';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

interface PokemonInfoProps {
  onClose: () => void;
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({  onClose }) => {
  const {  selectedPokemon } = useAppSelector((state: RootState) => state.pokemon);
  if (!selectedPokemon) return null;

  return (
    <div className={styles.pokemonInfo}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <div>
        <img src={selectedPokemon.sprites.front_default} alt="front_default" />
        <img src={selectedPokemon.sprites.front_shiny} alt="front_default" />
        <img src={selectedPokemon.sprites.back_default} alt="front_default" />
        <img src={selectedPokemon.sprites.back_shiny} alt="front_default" />
      </div>
      <h2>{selectedPokemon.name}</h2>
      <ul>
        <li>ID: {selectedPokemon.id}</li>
        <li>Height: {selectedPokemon.height}</li>
        <li>Weight: {selectedPokemon.weight}</li>
        <li>Base Experience: {selectedPokemon.base_experience}</li>
        <li>
          Type:{' '}
          {selectedPokemon.types
            .map((typeInfo: TypeInfo) => typeInfo.type.name)
            .join(', ')}
        </li>
        <li>
          Abilities:{' '}
          {selectedPokemon.abilities
            .map((abilityInfo: AbilityInfo) => abilityInfo.ability.name)
            .join(', ')}
        </li>
        <li>HP: {selectedPokemon.stats[0].base_stat}</li>
        <li>Attack: {selectedPokemon.stats[1].base_stat}</li>
        <li>Defense: {selectedPokemon.stats[2].base_stat}</li>
        <li>Special Attack: {selectedPokemon.stats[3].base_stat}</li>
        <li>Special Defense: {selectedPokemon.stats[4].base_stat}</li>
        <li>Speed: {selectedPokemon.stats[5].base_stat}</li>
      </ul>
    </div>
  );
};

export default PokemonInfo;
