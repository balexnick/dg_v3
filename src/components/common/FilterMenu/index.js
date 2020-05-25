import React from 'react'
import FormControl from '@material-ui/core/FormControl'

const FilterMenu = ({ items }) => {
  return (
    <div className='filters-col justify'>
        <FormControl fullWidth={true}>
            {items}
        </FormControl>
    </div>
  )
}

export default FilterMenu;

