import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './MasterSelect.css';

const MasterSelect = ({ masters, selectedMaster, onChange }) => {
	return (
		<FormControl fullWidth>
			<InputLabel id="master-select-label">Выберите мастера</InputLabel>
			<Select
				labelId="master-select-label"
				label="Выберите мастера"
				value={selectedMaster?.id || ''}
				onChange={(e) => onChange(masters.find(m => m.id === e.target.value))}
			>

				{masters.map((master) => (
					<MenuItem key={master.id} value={master.id}>
						{master.name} ({master.specialization})
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default MasterSelect;