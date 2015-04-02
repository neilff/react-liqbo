import React from 'react';
import Router from 'react-router';
import routes from './routes';
import {i18nCursor} from './state';

const app = document.getElementById('root');

Router.run(routes, (Handler) => {
  React.render(<Handler {...i18nCursor().toJS()} />, app)
});

if (process.env.NODE_ENV === 'production') {
  // Dev only code.
  // TODO: Report app errors.
}
