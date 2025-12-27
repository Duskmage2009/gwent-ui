import axios from 'misc/requests';
import config from 'config';
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


const requestCardsList = () => ({
    type: REQUEST_CARDS_LIST,
});

const receiveCardsList = (data) => ({
    type: RECEIVE_CARDS_LIST,
    payload: data,
});

const errorCardsList = (errors) => ({
    type: ERROR_CARDS_LIST,
    payload: errors,
});

const getCardsList = ({deckId, type, minPower, page, size}) => {
    const {CARDS_SERVICE} = config;
    return axios.post(`${CARDS_SERVICE}/cards/_list`, {
        deckId,
        type,
        minPower,
        page,
        size,
    });
};

const fetchCardsList = (filters) => (dispatch) => {
    dispatch(requestCardsList());
    return getCardsList(filters)
        .then((data) => dispatch(receiveCardsList(data)))
        .catch((errors) => dispatch(errorCardsList(errors)));
};


const requestCardDetail = () => ({
    type: REQUEST_CARD_DETAIL,
});

const receiveCardDetail = (card) => ({
    type: RECEIVE_CARD_DETAIL,
    payload: card,
});

const errorCardDetail = (errors) => ({
    type: ERROR_CARD_DETAIL,
    payload: errors,
});

const getCardDetail = (id) => {
    const {CARDS_SERVICE} = config;
    return axios.get(`${CARDS_SERVICE}/cards/${id}`);
};

const fetchCardDetail = (id) => (dispatch) => {
    dispatch(requestCardDetail());
    return getCardDetail(id)
        .then((card) => dispatch(receiveCardDetail(card)))
        .catch((errors) => dispatch(errorCardDetail(errors)));
};


const requestCreateCard = () => ({
    type: REQUEST_CREATE_CARD,
});

const successCreateCard = (card) => ({
    type: SUCCESS_CREATE_CARD,
    payload: card,
});

const errorCreateCard = (errors) => ({
    type: ERROR_CREATE_CARD,
    payload: errors,
});

const createCard = (cardData) => {
    const {CARDS_SERVICE} = config;
    return axios.post(`${CARDS_SERVICE}/cards`, cardData);
};

const fetchCreateCard = (cardData) => (dispatch) => {
    dispatch(requestCreateCard());
    return createCard(cardData)
        .then((card) => {
            dispatch(successCreateCard(card));
            return card;
        })
        .catch((errors) => {
            dispatch(errorCreateCard(errors));
            throw errors;
        });
};


const requestUpdateCard = () => ({
    type: REQUEST_UPDATE_CARD,
});

const successUpdateCard = (card) => ({
    type: SUCCESS_UPDATE_CARD,
    payload: card,
});

const errorUpdateCard = (errors) => ({
    type: ERROR_UPDATE_CARD,
    payload: errors,
});

const updateCard = (id, cardData) => {
    const {CARDS_SERVICE} = config;
    return axios.put(`${CARDS_SERVICE}/cards/${id}`, cardData);
};

const fetchUpdateCard = (id, cardData) => (dispatch) => {
    dispatch(requestUpdateCard());
    return updateCard(id, cardData)
        .then((card) => {
            dispatch(successUpdateCard(card));
            return card;
        })
        .catch((errors) => {
            dispatch(errorUpdateCard(errors));
            throw errors;
        });
};


const requestDeleteCard = () => ({
    type: REQUEST_DELETE_CARD,
});

const successDeleteCard = (id) => ({
    type: SUCCESS_DELETE_CARD,
    payload: id,
});

const errorDeleteCard = (errors) => ({
    type: ERROR_DELETE_CARD,
    payload: errors,
});

const deleteCard = (id) => {
    const {CARDS_SERVICE} = config;
    return axios.delete(`${CARDS_SERVICE}/cards/${id}`);
};

const fetchDeleteCard = (id) => (dispatch) => {
    dispatch(requestDeleteCard());
    return deleteCard(id)
        .then(() => {
            dispatch(successDeleteCard(id));
        })
        .catch((errors) => {
            dispatch(errorDeleteCard(errors));
            throw errors;
        });
};


const requestDecksList = () => ({
    type: REQUEST_DECKS_LIST,
});

const receiveDecksList = (decks) => ({
    type: RECEIVE_DECKS_LIST,
    payload: decks,
});

const errorDecksList = (errors) => ({
    type: ERROR_DECKS_LIST,
    payload: errors,
});

const getDecksList = () => {
    const {CARDS_SERVICE} = config;
    return axios.get(`${CARDS_SERVICE}/decks`);
};

const fetchDecksList = () => (dispatch) => {
    dispatch(requestDecksList());
    return getDecksList()
        .then((decks) => dispatch(receiveDecksList(decks)))
        .catch((errors) => dispatch(errorDecksList(errors)));
};


const clearCardErrors = () => ({
    type: CLEAR_CARD_ERRORS,
});


const exportFunctions = {
    fetchCardsList,
    fetchCardDetail,
    fetchCreateCard,
    fetchUpdateCard,
    fetchDeleteCard,
    fetchDecksList,
    clearCardErrors,
};

export default exportFunctions;