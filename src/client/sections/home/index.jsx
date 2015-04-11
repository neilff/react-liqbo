import React from 'react';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router';

export default React.createClass({

  render() {
    return (
      <DocumentTitle title='Liqbo - Home'>
        <div>
          <p>
            Home
          </p>
        </div>
      </DocumentTitle>
    );
  }
});
