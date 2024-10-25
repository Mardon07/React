import React from 'react';
import {  setSelectedType } from '../../store/features/pokemonSlice';
import styles from './Filter.module.css';
import { RootState } from '../../store/store';
import { PakemonItem } from '../../types/search';
import { useGetPokemonByTypeQuery, useGetPokemonTypesQuery } from '../../store/services/pokemon';
import { useAppDispatch, useAppSelector } from '../../store/hooks';




  
 export interface PokemonSlot {
    pokemon: PakemonItem;
    slot: number;
  }
  
export  interface FilteredPokemonResponse {
    pokemon: PokemonSlot[];
  }

function FilterComponent() {
  const dispatch = useAppDispatch();
  const { types, selectedType, isLoading, error } = useAppSelector((state: RootState) => state.pokemon);
   useGetPokemonTypesQuery()
   useGetPokemonByTypeQuery(selectedType)

//   useEffect(() => {
//     dispatch(setSelectedType(''));
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    dispatch(setSelectedType(selectedValue)); 
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <select
        name="filter"
        className={styles.select}
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="" disabled>Select Type</option>
        {types!.map((type, index) => (
          <option key={index} value={type.name} className={styles.option}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterComponent;
