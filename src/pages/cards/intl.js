import languages from "../../misc/constants/languages";

const uk = {
    'cards.title': 'Карти Gwent',
    'cards.addNew': 'Додати карту',
    'cards.filter': 'Фільтр',
    'cards.search': 'Пошук',
    'cards.noCards': 'Карт не знайдено',
    'cards.loading': 'Завантаження...',
    'cards.delete': 'Видалити',
    'cards.edit': 'Редагувати',
    'cards.back': 'Назад',
    'cards.save': 'Зберегти',
    'cards.cancel': 'Скасувати',
    'cards.create': 'Створити',

    'cards.filter.deck': 'Колода',
    'cards.filter.type': 'Тип',
    'cards.filter.minPower': 'Мінімальна сила',
    'cards.filter.apply': 'Застосувати',
    'cards.filter.reset': 'Скинути',
    'cards.filter.allDecks': 'Всі колоди',
    'cards.filter.allTypes': 'Всі типи',

    'cards.delete.title': 'Підтвердження видалення',
    'cards.delete.message': 'Ви впевнені, що хочете видалити цю карту?',
    'cards.delete.confirm': 'Видалити',
    'cards.delete.cancel': 'Скасувати',
    'cards.delete.success': 'Карту успішно видалено',
    'cards.delete.error': 'Помилка при видаленні карти',

    'card.detail.title': 'Деталі карти',
    'card.detail.viewMode': 'Режим перегляду',
    'card.detail.editMode': 'Режим редагування',
    'card.new.title': 'Створення нової карти',

    'card.field.name': 'Назва',
    'card.field.deck': 'Колода',
    'card.field.provision': 'Провізія',
    'card.field.power': 'Сила',
    'card.field.type': 'Тип',
    'card.field.faction': 'Фракція',
    'card.field.description': 'Опис',

    'card.validation.nameRequired': 'Назва обов\'язкова',
    'card.validation.nameLength': 'Назва має бути від 2 до 200 символів',
    'card.validation.deckRequired': 'Колода обов\'язкова',
    'card.validation.provisionRequired': 'Провізія обов\'язкова',
    'card.validation.provisionRange': 'Провізія має бути від 0 до 20',
    'card.validation.powerRequired': 'Сила обов\'язкова',
    'card.validation.powerRange': 'Сила має бути від 0 до 50',
    'card.validation.typeRequired': 'Тип обов\'язковий',
    'card.validation.factionRequired': 'Фракція обов\'язкова',

    'card.success.created': 'Карту успішно створено',
    'card.success.updated': 'Карту успішно оновлено',

    'card.error.create': 'Помилка при створенні карти',
    'card.error.update': 'Помилка при оновленні карти',
    'card.error.load': 'Помилка при завантаженні карти',
};

const en = {
    'cards.title': 'Gwent Cards',
    'cards.addNew': 'Add Card',
    'cards.filter': 'Filter',
    'cards.search': 'Search',
    'cards.noCards': 'No cards found',
    'cards.loading': 'Loading...',
    'cards.delete': 'Delete',
    'cards.edit': 'Edit',
    'cards.back': 'Back',
    'cards.save': 'Save',
    'cards.cancel': 'Cancel',
    'cards.create': 'Create',

    'cards.filter.deck': 'Deck',
    'cards.filter.type': 'Type',
    'cards.filter.minPower': 'Min Power',
    'cards.filter.apply': 'Apply',
    'cards.filter.reset': 'Reset',
    'cards.filter.allDecks': 'All Decks',
    'cards.filter.allTypes': 'All Types',

    'cards.delete.title': 'Confirm Deletion',
    'cards.delete.message': 'Are you sure you want to delete this card?',
    'cards.delete.confirm': 'Delete',
    'cards.delete.cancel': 'Cancel',
    'cards.delete.success': 'Card successfully deleted',
    'cards.delete.error': 'Error deleting card',

    'card.detail.title': 'Card Details',
    'card.detail.viewMode': 'View Mode',
    'card.detail.editMode': 'Edit Mode',
    'card.new.title': 'Create New Card',

    'card.field.name': 'Name',
    'card.field.deck': 'Deck',
    'card.field.provision': 'Provision',
    'card.field.power': 'Power',
    'card.field.type': 'Type',
    'card.field.faction': 'Faction',
    'card.field.description': 'Description',

    'card.validation.nameRequired': 'Name is required',
    'card.validation.nameLength': 'Name must be between 2 and 200 characters',
    'card.validation.deckRequired': 'Deck is required',
    'card.validation.provisionRequired': 'Provision is required',
    'card.validation.provisionRange': 'Provision must be between 0 and 20',
    'card.validation.powerRequired': 'Power is required',
    'card.validation.powerRange': 'Power must be between 0 and 50',
    'card.validation.typeRequired': 'Type is required',
    'card.validation.factionRequired': 'Faction is required',

    'card.success.created': 'Card successfully created',
    'card.success.updated': 'Card successfully updated',

    'card.error.create': 'Error creating card',
    'card.error.update': 'Error updating card',
    'card.error.load': 'Error loading card',
};

const getMessages = (locale) => {
    switch (locale) {
        case languages.en:
            return en;
        case languages.ua:
            return uk;
        default:
            return uk;
    }
};

export default getMessages;