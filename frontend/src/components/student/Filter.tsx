import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, Select, MenuItem, Typography, Stack} from '@mui/material';
import axios from 'axios';

interface FilterValues {
    locations: string[];
    fields: string[];
    salary: boolean | null;
}

interface FilterProps {
    onFilterChange: (filterValues: FilterValues) => void;
}

const Filter: React.FC<FilterProps> = ({onFilterChange}) => {
    const [availableLocations, setAvailableLocations] = useState<string[]>([]);
    const [availableFields, setAvailableFields] = useState<string[]>([]);
    const [filterValues, setFilterValues] = useState<FilterValues>({
        locations: [],
        fields: [],
        salary: null,
    });

    useEffect(() => {
        // Fetch locations
        axios.get('http://localhost:8080/api/internships/locations')
            .then(response => setAvailableLocations(response.data))
            .catch(error => console.error('Error fetching locations', error));

        // Fetch fields
        axios.get('http://localhost:8080/api/internships/fields')
            .then(response => setAvailableFields(response.data))
            .catch(error => console.error('Error fetching fields', error));
    }, []);

    // Handlers for filter changes
    const handleLocationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newFilters = {...filterValues, locations: event.target.value as string[]};
        setFilterValues(newFilters);
        onFilterChange(newFilters);
    };

    const handleFieldChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newFilters = {...filterValues, fields: event.target.value as string[]};
        setFilterValues(newFilters);
        onFilterChange(newFilters);
    };

    const handleSalaryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const salaryOption = event.target.value as string;
        const newFilters = {
            ...filterValues,
            salary: salaryOption === 'both' ? null : salaryOption === 'paid',
        };
        setFilterValues(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Filters</Typography>
            <FormControl variant="outlined" sx={{minWidth: 120}}>
                <InputLabel id="location-select-label">Location</InputLabel>
                <Select
                    labelId="location-select-label"
                    id="location-select"
                    multiple
                    value={filterValues.locations}
                    // @ts-ignore
                    onChange={handleLocationChange}
                    renderValue={(selected) => selected.join(', ')}
                    label="Location"
                >
                    {availableLocations.map((location) => (
                        <MenuItem key={location} value={location}>
                            {location}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{minWidth: 120}}>
                <InputLabel id="field-select-label">Field</InputLabel>
                <Select
                    labelId="field-select-label"
                    id="field-select"
                    multiple
                    value={filterValues.fields}
                    // @ts-ignore
                    onChange={handleFieldChange}
                    renderValue={(selected) => selected.join(', ')}
                    label="Field"
                >
                    {availableFields.map((field) => (
                        <MenuItem key={field} value={field}>
                            {field}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{minWidth: 120}}>
                <InputLabel id="salary-select-label">Salary</InputLabel>
                <Select
                    labelId="salary-select-label"
                    id="salary-select"
                    value={filterValues.salary === null ? 'both' : filterValues.salary ? 'paid' : 'unpaid'}
                    // @ts-ignore
                    onChange={handleSalaryChange}
                    label="Salary"
                >
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="unpaid">Unpaid</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
};

export default Filter;