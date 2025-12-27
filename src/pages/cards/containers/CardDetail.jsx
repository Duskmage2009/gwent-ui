import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    CircularProgress,
    Alert,
    Snackbar,
    IconButton,
    Grid,
    Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useIntl } from 'react-intl';
import PageContainer from 'pageProviders/components/PageContainer';
import actionsCards from 'app/actions/cards';
import { CARD_TYPES, FACTIONS } from '../constants/cardTypes';

function CardDetail({ isNew = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const {
        currentCard,
        isFetchingCardDetail,
        isFailedCardDetail,
        isCreating,
        isUpdating,
        isFailedCreate,
        isFailedUpdate,
        decksList,
        errors,
    } = useSelector(({ cards }) => cards);

    const [isEditMode, setIsEditMode] = useState(isNew);
    const [formData, setFormData] = useState({
        name: '',
        deckId: '',
        provision: '',
        power: '',
        type: '',
        faction: '',
        description: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        dispatch(actionsCards.fetchDecksList());

        if (!isNew && id) {
            dispatch(actionsCards.fetchCardDetail(id));
        }
    }, [dispatch, id, isNew]);

    useEffect(() => {
        if (currentCard && !isNew) {
            setFormData({
                name: currentCard.name || '',
                deckId: currentCard.deck?.id || '',
                provision: currentCard.provision || '',
                power: currentCard.power || '',
                type: currentCard.type || '',
                faction: currentCard.faction || '',
                description: currentCard.description || '',
            });
        }
    }, [currentCard, isNew]);

    const validateForm = () => {
        const errors = {};

        if (!formData.name || formData.name.trim() === '') {
            errors.name = intl.formatMessage({ id: 'card.validation.nameRequired' });
        } else if (formData.name.length < 2 || formData.name.length > 200) {
            errors.name = intl.formatMessage({ id: 'card.validation.nameLength' });
        }

        if (!formData.deckId) {
            errors.deckId = intl.formatMessage({ id: 'card.validation.deckRequired' });
        }

        if (formData.provision === '') {
            errors.provision = intl.formatMessage({ id: 'card.validation.provisionRequired' });
        } else {
            const provision = parseInt(formData.provision, 10);
            if (provision < 0 || provision > 20) {
                errors.provision = intl.formatMessage({ id: 'card.validation.provisionRange' });
            }
        }

        if (formData.power === '') {
            errors.power = intl.formatMessage({ id: 'card.validation.powerRequired' });
        } else {
            const power = parseInt(formData.power, 10);
            if (power < 0 || power > 50) {
                errors.power = intl.formatMessage({ id: 'card.validation.powerRange' });
            }
        }

        if (!formData.type) {
            errors.type = intl.formatMessage({ id: 'card.validation.typeRequired' });
        }

        if (!formData.faction) {
            errors.faction = intl.formatMessage({ id: 'card.validation.factionRequired' });
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
        if (validationErrors[field]) {
            setValidationErrors({
                ...validationErrors,
                [field]: undefined,
            });
        }
    };

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleCancel = () => {
        if (isNew) {
            handleBack();
        } else {
            setIsEditMode(false);
            if (currentCard) {
                setFormData({
                    name: currentCard.name || '',
                    deckId: currentCard.deck?.id || '',
                    provision: currentCard.provision || '',
                    power: currentCard.power || '',
                    type: currentCard.type || '',
                    faction: currentCard.faction || '',
                    description: currentCard.description || '',
                });
            }
            setValidationErrors({});
            dispatch(actionsCards.clearCardErrors());
        }
    };

    const handleSave = () => {
        if (!validateForm()) {
            return;
        }

        const cardData = {
            name: formData.name.trim(),
            deckId: parseInt(formData.deckId, 10),
            provision: parseInt(formData.provision, 10),
            power: parseInt(formData.power, 10),
            type: formData.type,
            faction: formData.faction,
            description: formData.description?.trim() || '',
        };

        const action = isNew
            ? actionsCards.fetchCreateCard(cardData)
            : actionsCards.fetchUpdateCard(id, cardData);

        dispatch(action)
            .then((savedCard) => {
                setSnackbar({
                    open: true,
                    message: intl.formatMessage({
                        id: isNew ? 'card.success.created' : 'card.success.updated',
                    }),
                    severity: 'success',
                });
                setIsEditMode(false);

                if (isNew) {
                    setTimeout(() => {
                        navigate(`/cards/${savedCard.id}`);
                    }, 1000);
                }
            })
            .catch(() => {
                setSnackbar({
                    open: true,
                    message: intl.formatMessage({
                        id: isNew ? 'card.error.create' : 'card.error.update',
                    }),
                    severity: 'error',
                });
            });
    };

    const handleBack = () => {
        const params = searchParams.toString();
        navigate(`/cards${params ? `?${params}` : ''}`);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const getDeckName = (deckId) => {
        const deck = decksList.find((d) => d.id === deckId);
        return deck ? deck.name : '';
    };

    if (isFetchingCardDetail && !isNew) {
        return (
            <PageContainer>
                <Box display="flex" justifyContent="center" py={8}>
                    <CircularProgress />
                </Box>
            </PageContainer>
        );
    }

    if (isFailedCardDetail && !isNew) {
        return (
            <PageContainer>
                <Container maxWidth="md" sx={{ py: 4 }}>
                    <Alert severity="error">
                        {intl.formatMessage({ id: 'card.error.load' })}
                    </Alert>
                    <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mt: 2 }}>
                        {intl.formatMessage({ id: 'cards.back' })}
                    </Button>
                </Container>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" component="h1">
                            {isNew
                                ? intl.formatMessage({ id: 'card.new.title' })
                                : intl.formatMessage({ id: 'card.detail.title' })}
                        </Typography>
                    </Box>

                    {!isNew && !isEditMode && (
                        <IconButton color="primary" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    )}
                </Box>

                <Paper sx={{ p: 3 }}>
                    {!isEditMode && currentCard && (
                        <Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom>
                                        {currentCard.name}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {intl.formatMessage({ id: 'card.field.deck' })}
                                    </Typography>
                                    <Typography variant="body1">
                                        {currentCard.deck?.name}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {intl.formatMessage({ id: 'card.field.provision' })}
                                    </Typography>
                                    <Chip label={currentCard.provision} color="primary" />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {intl.formatMessage({ id: 'card.field.power' })}
                                    </Typography>
                                    <Chip label={currentCard.power} color="secondary" />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {intl.formatMessage({ id: 'card.field.type' })}
                                    </Typography>
                                    <Typography variant="body1">{currentCard.type}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {intl.formatMessage({ id: 'card.field.faction' })}
                                    </Typography>
                                    <Typography variant="body1">{currentCard.faction}</Typography>
                                </Grid>

                                {currentCard.description && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {intl.formatMessage({ id: 'card.field.description' })}
                                        </Typography>
                                        <Typography variant="body1">{currentCard.description}</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    )}

                    {isEditMode && (
                        <Box component="form" noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        label={intl.formatMessage({ id: 'card.field.name' })}
                                        value={formData.name}
                                        onChange={handleChange('name')}
                                        error={!!validationErrors.name}
                                        helperText={validationErrors.name}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth required error={!!validationErrors.deckId}>
                                        <InputLabel>
                                            {intl.formatMessage({ id: 'card.field.deck' })}
                                        </InputLabel>
                                        <Select
                                            value={formData.deckId}
                                            label={intl.formatMessage({ id: 'card.field.deck' })}
                                            onChange={handleChange('deckId')}
                                        >
                                            {decksList.map((deck) => (
                                                <MenuItem key={deck.id} value={deck.id}>
                                                    {deck.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {validationErrors.deckId && (
                                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                                {validationErrors.deckId}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="number"
                                        label={intl.formatMessage({ id: 'card.field.provision' })}
                                        value={formData.provision}
                                        onChange={handleChange('provision')}
                                        error={!!validationErrors.provision}
                                        helperText={validationErrors.provision}
                                        inputProps={{ min: 0, max: 20 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="number"
                                        label={intl.formatMessage({ id: 'card.field.power' })}
                                        value={formData.power}
                                        onChange={handleChange('power')}
                                        error={!!validationErrors.power}
                                        helperText={validationErrors.power}
                                        inputProps={{ min: 0, max: 50 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required error={!!validationErrors.type}>
                                        <InputLabel>
                                            {intl.formatMessage({ id: 'card.field.type' })}
                                        </InputLabel>
                                        <Select
                                            value={formData.type}
                                            label={intl.formatMessage({ id: 'card.field.type' })}
                                            onChange={handleChange('type')}
                                        >
                                            {CARD_TYPES.map((type) => (
                                                <MenuItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {validationErrors.type && (
                                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                                {validationErrors.type}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required error={!!validationErrors.faction}>
                                        <InputLabel>
                                            {intl.formatMessage({ id: 'card.field.faction' })}
                                        </InputLabel>
                                        <Select
                                            value={formData.faction}
                                            label={intl.formatMessage({ id: 'card.field.faction' })}
                                            onChange={handleChange('faction')}
                                        >
                                            {FACTIONS.map((faction) => (
                                                <MenuItem key={faction.value} value={faction.value}>
                                                    {faction.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {validationErrors.faction && (
                                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                                {validationErrors.faction}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label={intl.formatMessage({ id: 'card.field.description' })}
                                        value={formData.description}
                                        onChange={handleChange('description')}
                                        inputProps={{ maxLength: 500 }}
                                    />
                                </Grid>

                                {(isFailedCreate || isFailedUpdate) && errors && (
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            {Array.isArray(errors)
                                                ? errors.map((err) => err.message || err.code).join(', ')
                                                : intl.formatMessage({
                                                    id: isNew ? 'card.error.create' : 'card.error.update',
                                                })}
                                        </Alert>
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Box display="flex" gap={2} justifyContent="flex-end">
                                        <Button onClick={handleCancel} disabled={isCreating || isUpdating}>
                                            {intl.formatMessage({ id: 'cards.cancel' })}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleSave}
                                            disabled={isCreating || isUpdating}
                                            startIcon={
                                                (isCreating || isUpdating) ? <CircularProgress size={20} /> : null
                                            }
                                        >
                                            {intl.formatMessage({
                                                id: isNew ? 'cards.create' : 'cards.save',
                                            })}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Paper>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </PageContainer>
    );
}

export default CardDetail;