import React from 'react';
import {
    IntlProvider as ReactIntlProvider,
} from 'react-intl';

import useLocationSearch from 'misc/hooks/useLocationSearch';
import {DEFAULT_LANGUAGE, locales} from 'misc/constants/languages';

function IntlProvider({
                          children,
                          messages,
                      }) {
    const {
        lang,
    } = useLocationSearch();
    const finalLocale = locales[lang] || locales[DEFAULT_LANGUAGE];
    return (
        <ReactIntlProvider
            defaultLocale={locales[DEFAULT_LANGUAGE]}
            locale={finalLocale}
            messages={messages}
        >
            {children}
        </ReactIntlProvider>
    );
}

export default IntlProvider;
