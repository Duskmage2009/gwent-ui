import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { CARD_TYPES } from '../constants/cardTypes';

function FilterDialog({ open, onClose, onApply, initialFilters, decks }) {
    const intl = useIntl();
    const [filters, setFilters] = useState({
        deckId: '',
        type: '',
        minPower: '',
    });

    useEffect(() => {
        if (open) {
            setFilters(initialFilters);
        }
    }, [open, initialFilters]);

    const handleChange = (field) => (event) => {
        setFilters({
            ...filters,
            [field]: event.target.value,
        });
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters = {
            deckId: '',
            type: '',
            minPower: '',
        };
        setFilters(resetFilters);
        onApply(resetFilters);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {intl.formatMessage({ id: 'cards.filter' })}
            </DialogTitle>

            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <FormControl fullWidth>
                        <InputLabel>
                            {intl.formatMessage({ id: 'cards.filter.deck' })}
                        </InputLabel>
                        <Select
                            value={filters.deckId}
                            label={intl.formatMessage({ id: 'cards.filter.deck' })}
                            onChange={handleChange('deckId')}
                        >
                            <MenuItem value="">
                                {intl.formatMessage({ id: 'cards.filter.allDecks' })}
                            </MenuItem>
                            {decks.map((deck) => (
                                <MenuItem key={deck.id} value={deck.id}>
                                    {deck.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>
                            {intl.formatMessage({ id: 'cards.filter.type' })}
                        </InputLabel>
                        <Select
                            value={filters.type}
                            label={intl.formatMessage({ id: 'cards.filter.type' })}
                            onChange={handleChange('type')}
                        >
                            <MenuItem value="">
                                {intl.formatMessage({ id: 'cards.filter.allTypes' })}
                            </MenuItem>
                            {CARD_TYPES.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        type="number"
                        label={intl.formatMessage({ id: 'cards.filter.minPower' })}
                        value={filters.minPower}
                        onChange={handleChange('minPower')}
                        inputProps={{ min: 0, max: 50 }}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleReset}>
                    {intl.formatMessage({ id: 'cards.filter.reset' })}
                </Button>
                <Button onClick={onClose}>
                    {intl.formatMessage({ id: 'cards.cancel' })}
                </Button>
                <Button onClick={handleApply} variant="contained">
                    {intl.formatMessage({ id: 'cards.filter.apply' })}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FilterDialog;