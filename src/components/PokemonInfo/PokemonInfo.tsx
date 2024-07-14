import React from 'react';
import { AbilityInfo, PokemonDetail, TypeInfo } from '../SearchCard/SearchCard';
import styles from './PokemonInfo.module.css';

interface PokemonInfoProps {
  pokemon: PokemonDetail;
  onClose: () => void;
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className={styles.pokemonInfo}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <div>
        <img src={pokemon.sprites.front_default} alt="front_default" />
        <img src={pokemon.sprites.front_shiny} alt="front_default" />
        <img src={pokemon.sprites.back_default} alt="front_default" />
        <img src={pokemon.sprites.back_shiny} alt="front_default" />
      </div>
      <h2>{pokemon.name}</h2>
      <ul>
        <li>ID: {pokemon.id}</li>
        <li>Height: {pokemon.height}</li>
        <li>Weight: {pokemon.weight}</li>
        <li>Base Experience: {pokemon.base_experience}</li>
        <li>
          Type:{' '}
          {pokemon.types
            .map((typeInfo: TypeInfo) => typeInfo.type.name)
            .join(', ')}
        </li>
        <li>
          Abilities:{' '}
          {pokemon.abilities
            .map((abilityInfo: AbilityInfo) => abilityInfo.ability.name)
            .join(', ')}
        </li>
        <li>HP: {pokemon.stats[0].base_stat}</li>
        <li>Attack: {pokemon.stats[1].base_stat}</li>
        <li>Defense: {pokemon.stats[2].base_stat}</li>
        <li>Special Attack: {pokemon.stats[3].base_stat}</li>
        <li>Special Defense: {pokemon.stats[4].base_stat}</li>
        <li>Speed: {pokemon.stats[5].base_stat}</li>
      </ul>
    </div>
  );
};

export default PokemonInfo;
