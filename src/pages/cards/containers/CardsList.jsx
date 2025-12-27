import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Pagination,
    CircularProgress,
    Alert,
    Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useIntl } from 'react-intl';
import PageContainer from 'pageProviders/components/PageContainer';
import actionsCards from 'app/actions/cards';
import CardItem from '../components/CardItem';
import FilterDialog from '../components/FilterDialog';
import DeleteDialog from '../components/DeleteDialog';

function CardsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        cardsList,
        totalPages,
        totalElements,
        currentPage,
        isFetchingCardsList,
        isFailedCardsList,
        decksList,
        isFetchingDecks,
        isDeleting,
        isFailedDelete,
    } = useSelector(({ cards }) => cards);

    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const getFiltersFromURL = () => ({
        deckId: searchParams.get('deckId') || '',
        type: searchParams.get('type') || '',
        minPower: searchParams.get('minPower') || '',
        page: parseInt(searchParams.get('page') || '1', 10),
        size: parseInt(searchParams.get('size') || '20', 10),
    });

    const [filters, setFilters] = useState(getFiltersFromURL());

    useEffect(() => {
        dispatch(actionsCards.fetchDecksList());
    }, [dispatch]);

    useEffect(() => {
        const filtersFromURL = getFiltersFromURL();
        setFilters(filtersFromURL);
        loadCards(filtersFromURL);
    }, [searchParams]);

    const loadCards = (filterParams) => {
        const params = {
            deckId: filterParams.deckId ? parseInt(filterParams.deckId, 10) : null,
            type: filterParams.type || null,
            minPower: filterParams.minPower ? parseInt(filterParams.minPower, 10) : null,
            page: filterParams.page,
            size: filterParams.size,
        };
        dispatch(actionsCards.fetchCardsList(params));
    };

    const updateURLWithFilters = (newFilters) => {
        const params = new URLSearchParams();

        if (newFilters.deckId) params.set('deckId', newFilters.deckId);
        if (newFilters.type) params.set('type', newFilters.type);
        if (newFilters.minPower) params.set('minPower', newFilters.minPower);
        params.set('page', newFilters.page.toString());
        params.set('size', newFilters.size.toString());

        setSearchParams(params);
    };

    const handleApplyFilters = (newFilters) => {
        const updatedFilters = {
            ...newFilters,
            page: 1,
            size: filters.size,
        };
        updateURLWithFilters(updatedFilters);
    };

    const handlePageChange = (event, value) => {
        const updatedFilters = {
            ...filters,
            page: value,
        };
        updateURLWithFilters(updatedFilters);
    };

    const handleDeleteClick = (card) => {
        setCardToDelete(card);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (cardToDelete) {
            dispatch(actionsCards.fetchDeleteCard(cardToDelete.id))
                .then(() => {
                    setDeleteDialogOpen(false);
                    setCardToDelete(null);
                    setSnackbar({
                        open: true,
                        message: intl.formatMessage({ id: 'cards.delete.success' }),
                        severity: 'success',
                    });
                    loadCards(filters);
                })
                .catch(() => {
                });
        }
    };

    const handleCloseDeleteDialog = () => {
        if (!isDeleting) {
            setDeleteDialogOpen(false);
            setCardToDelete(null);
            dispatch(actionsCards.clearCardErrors());
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleAddNew = () => {
        navigate('/cards/new');
    };

    return (
        <PageContainer>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1">
                        {intl.formatMessage({ id: 'cards.title' })}
                    </Typography>

                    <Box display="flex" gap={2}>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            onClick={() => setFilterDialogOpen(true)}
                        >
                            {intl.formatMessage({ id: 'cards.filter' })}
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddNew}
                        >
                            {intl.formatMessage({ id: 'cards.addNew' })}
                        </Button>
                    </Box>
                </Box>

                {!isFetchingCardsList && cardsList.length > 0 && (
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Знайдено карт: {totalElements}
                    </Typography>
                )}

                {isFetchingCardsList && (
                    <Box display="flex" justifyContent="center" py={8}>
                        <CircularProgress />
                    </Box>
                )}

                {isFailedCardsList && !isFetchingCardsList && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {intl.formatMessage({ id: 'card.error.load' })}
                    </Alert>
                )}

                {!isFetchingCardsList && cardsList.length > 0 && (
                    <>
                        <Grid container spacing={2}>
                            {cardsList.map((card) => (
                                <Grid item xs={12} sm={6} md={4} key={card.id}>
                                    <CardItem card={card} onDelete={handleDeleteClick} />
                                </Grid>
                            ))}
                        </Grid>

                        {totalPages > 1 && (
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                />
                            </Box>
                        )}
                    </>
                )}

                {!isFetchingCardsList && cardsList.length === 0 && (
                    <Box display="flex" justifyContent="center" py={8}>
                        <Typography variant="h6" color="text.secondary">
                            {intl.formatMessage({ id: 'cards.noCards' })}
                        </Typography>
                    </Box>
                )}

                <FilterDialog
                    open={filterDialogOpen}
                    onClose={() => setFilterDialogOpen(false)}
                    onApply={handleApplyFilters}
                    initialFilters={{
                        deckId: filters.deckId,
                        type: filters.type,
                        minPower: filters.minPower,
                    }}
                    decks={decksList}
                />

                <DeleteDialog
                    open={deleteDialogOpen}
                    onClose={handleCloseDeleteDialog}
                    onConfirm={handleConfirmDelete}
                    card={cardToDelete}
                    isDeleting={isDeleting}
                    error={isFailedDelete}
                />

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

export default CardsList;