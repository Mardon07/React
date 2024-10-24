import { useEffect, useState } from 'react';
import { fetchPokemonByType, getPokemonType } from '../../services/requests';
import styles from './Filter.module.css'; // Импортируйте модуль стилей
import { PokemonTypeInfo } from '../SearchCard/SearchCard';
import { PakemonItem, SearchComponentState } from '../SearchComponent/SearchComponent';

interface FilterComponentProps {
    setState: React.Dispatch<React.SetStateAction<SearchComponentState>>; // Пропс для setState
  }


  
 export interface PokemonSlot {
    pokemon: PakemonItem;
    slot: number;
  }
  
export  interface FilteredPokemonResponse {
    pokemon: PokemonSlot[];
  }

function FilterComponent({ setState }: FilterComponentProps) {
  const [types, setTypes] = useState<PokemonTypeInfo[]>([]);
  const [selectedType, setSelectedType] = useState<string>(''); 

  useEffect(() => {
    getPokemonType()
      .then((data) => {
        if (data && Array.isArray(data)) {
          setTypes(data);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching types:', error);
      });
  }, []);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);

    // Отправляем запрос с выбранным типом
    fetchPokemonByType(selectedValue, setState)
  };

  return (
    <div className={styles.container}>
      <select name="filter" className={styles.select} value={selectedType}
        onChange={handleTypeChange} >
        {Array.isArray(types) && types.map((type, index) => (
          <option key={index} value={type.name} className={styles.option}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterComponent;
