import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,

  [pages.cardsList]: `${config.UI_URL_PREFIX}/cards`,
  [pages.cardDetail]: `${config.UI_URL_PREFIX}/cards/:id`,
  [pages.cardNew]: `${config.UI_URL_PREFIX}/cards/new`,
};

export default result;
