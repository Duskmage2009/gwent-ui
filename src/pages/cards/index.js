import React, { useMemo } from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';
import { Routes, Route } from 'react-router-dom';
import getMessages from './intl';
import CardsList from './containers/CardsList';
import CardDetail from './containers/CardDetail';

function Index(props) {
    const { lang } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);

    return (
        <IntlProvider messages={messages}>
            <Routes>
                <Route path="/" element={<CardsList {...props} />} />

                <Route path="/new" element={<CardDetail {...props} isNew />} />

                <Route path="/:id" element={<CardDetail {...props} />} />
            </Routes>
        </IntlProvider>
    );
}

export default Index;