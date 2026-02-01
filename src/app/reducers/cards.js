import {
    REQUEST_CARDS_LIST,
    RECEIVE_CARDS_LIST,
    ERROR_CARDS_LIST,
    REQUEST_CARD_DETAIL,
    RECEIVE_CARD_DETAIL,
    ERROR_CARD_DETAIL,
    REQUEST_CREATE_CARD,
    SUCCESS_CREATE_CARD,
    ERROR_CREATE_CARD,
    REQUEST_UPDATE_CARD,
    SUCCESS_UPDATE_CARD,
    ERROR_UPDATE_CARD,
    REQUEST_DELETE_CARD,
    SUCCESS_DELETE_CARD,
    ERROR_DELETE_CARD,
    REQUEST_DECKS_LIST,
    RECEIVE_DECKS_LIST,
    ERROR_DECKS_LIST,
    CLEAR_CARD_ERRORS,
} from '../constants/actionTypes';

const initialState = {
    // Cards List
    cardsList: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    pageSize: 20,
    isFetchingCardsList: false,
    isFailedCardsList: false,

    // Card Detail
    currentCard: null,
    isFetchingCardDetail: false,
    isFailedCardDetail: false,

    // Create/Update/Delete
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isFailedCreate: false,
    isFailedUpdate: false,
    isFailedDelete: false,

    // Decks (для фільтрів)
    decksList: [],
    isFetchingDecks: false,

    // Errors
    errors: null,
};

const cards = (state = initialState, action) => {
    switch (action.type) {
        // Cards List
        case REQUEST_CARDS_LIST:
            return {
                ...state,
                isFetchingCardsList: true,
                isFailedCardsList: false,
                errors: null,
            };
        case RECEIVE_CARDS_LIST:
            return {
                ...state,
                cardsList: action.payload.list,
                totalPages: action.payload.totalPages,
                totalElements: action.payload.totalElements,
                currentPage: action.payload.currentPage,
                pageSize: action.payload.pageSize,
                isFetchingCardsList: false,
                isFailedCardsList: false,
            };
        case ERROR_CARDS_LIST:
            return {
                ...state,
                isFetchingCardsList: false,
                isFailedCardsList: true,
                errors: action.payload,
            };

        // Card Detail
        case REQUEST_CARD_DETAIL:
            return {
                ...state,
                isFetchingCardDetail: true,
                isFailedCardDetail: false,
                errors: null,
            };
        case RECEIVE_CARD_DETAIL:
            return {
                ...state,
                currentCard: action.payload,
                isFetchingCardDetail: false,
                isFailedCardDetail: false,
            };
        case ERROR_CARD_DETAIL:
            return {
                ...state,
                isFetchingCardDetail: false,
                isFailedCardDetail: true,
                errors: action.payload,
            };

        // Create Card
        case REQUEST_CREATE_CARD:
            return {
                ...state,
                isCreating: true,
                isFailedCreate: false,
                errors: null,
            };
        case SUCCESS_CREATE_CARD:
            return {
                ...state,
                currentCard: action.payload,
                isCreating: false,
                isFailedCreate: false,
            };
        case ERROR_CREATE_CARD:
            return {
                ...state,
                isCreating: false,
                isFailedCreate: true,
                errors: action.payload,
            };

        // Update Card
        case REQUEST_UPDATE_CARD:
            return {
                ...state,
                isUpdating: true,
                isFailedUpdate: false,
                errors: null,
            };
        case SUCCESS_UPDATE_CARD:
            return {
                ...state,
                currentCard: action.payload,
                isUpdating: false,
                isFailedUpdate: false,
            };
        case ERROR_UPDATE_CARD:
            return {
                ...state,
                isUpdating: false,
                isFailedUpdate: true,
                errors: action.payload,
            };

        // Delete Card
        case REQUEST_DELETE_CARD:
            return {
                ...state,
                isDeleting: true,
                isFailedDelete: false,
                errors: null,
            };
        case SUCCESS_DELETE_CARD:
            return {
                ...state,
                cardsList: state.cardsList.filter(card => card.id !== action.payload),
                isDeleting: false,
                isFailedDelete: false,
            };
        case ERROR_DELETE_CARD:
            return {
                ...state,
                isDeleting: false,
                isFailedDelete: true,
                errors: action.payload,
            };

        // Decks List
        case REQUEST_DECKS_LIST:
            return {
                ...state,
                isFetchingDecks: true,
            };
        case RECEIVE_DECKS_LIST:
            return {
                ...state,
                decksList: action.payload,
                isFetchingDecks: false,
            };
        case ERROR_DECKS_LIST:
            return {
                ...state,
                isFetchingDecks: false,
            };

        // Clear Errors
        case CLEAR_CARD_ERRORS:
            return {
                ...state,
                errors: null,
                isFailedCardsList: false,
                isFailedCardDetail: false,
                isFailedCreate: false,
                isFailedUpdate: false,
                isFailedDelete: false,
            };

        default:
            return state;
    }
};

export default cards;