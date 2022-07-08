import React from 'react';
import styles from './Autocomplete.module.scss';

function Autocomplete({ country, region, name, handlerAutocomplete }) {
  return (
    <div
     className={styles.autocompleteItem}
    onClick={() => {
     handlerAutocomplete(name)
    }}
    >
     <li>{country}</li>
     <li>{region}</li>
	  <li>{name}</li>
    </div>
 )
}

export default Autocomplete;