import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const ExtraMoreItems = ({ extraFilter, selectExtraFilter, selectedFilter, countManyFilters = 8, classes }) => {
	const [isShowMoreFilters, setShowMoreFilters] = useState(false);

	if(isShowMoreFilters) {
		return (
			<React.Fragment>
				{extraFilter.values.map((item, key) => (
					<MenuItem
						className='subheader-menuitem'
						key={key}
						onClick={() => selectExtraFilter(extraFilter.verbose, extraFilter.name, item)}
					>
						<Checkbox
							label={item.title}
							checked={selectedFilter.extra.findIndex(r => r.id === item.id && r.key === extraFilter.name) > -1}
							value={item.id}
							color='primary'
						/>
						{item.title}
					</MenuItem>
				))}
				<Button 
					classes={{ root: classes.showMoreItemsBtn }} 
					onClick={() => setShowMoreFilters(false)}>
						SHOW LESS <KeyboardArrowUp />
				</Button>
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			{extraFilter.values.map((item, index) => {
				if(index > countManyFilters) return null;
				return (
					<MenuItem
						className='subheader-menuitem'
						key={index}
						onClick={() => selectExtraFilter(extraFilter.verbose, extraFilter.name, item)}
					>
						<Checkbox
							label={item.title}
							checked={selectedFilter.extra.findIndex(r => r.id === item.id && r.key === extraFilter.name) > -1}
							value={item.id}
							color='primary'
						/>
						{item.title}
					</MenuItem>
				)
			})}
			<Button 
				classes={{ root: classes.showMoreItemsBtn }} 
				onClick={() => setShowMoreFilters(true)}
			>
				SHOW MORE <KeyboardArrowDown />
			</Button>
		</React.Fragment>
	)
}

export default ExtraMoreItems;
