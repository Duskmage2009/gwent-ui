import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useIntl } from 'react-intl';

function CardItem({ card, onDelete }) {
    const navigate = useNavigate();
    const intl = useIntl();
    const [isHovered, setIsHovered] = useState(false);

    const handleCardClick = () => {
        navigate(`/cards/${card.id}`);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(card);
    };

    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
            sx={{
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                },
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                        <Typography variant="h6" component="div" gutterBottom>
                            {card.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {card.deckName}
                        </Typography>

                        <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                            <Chip
                                label={`Provision: ${card.provision}`}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                label={`Power: ${card.power}`}
                                size="small"
                                color="secondary"
                                variant="outlined"
                            />
                            <Chip
                                label={card.type}
                                size="small"
                                variant="outlined"
                            />
                            <Chip
                                label={card.faction}
                                size="small"
                                variant="outlined"
                            />
                        </Box>
                    </Box>

                    {isHovered && (
                        <IconButton
                            color="error"
                            onClick={handleDeleteClick}
                            sx={{
                                ml: 1,
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

export default CardItem;