import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import './visibility-filter.scss';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    return < Form.Control className="filter-input"
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="search movies"

    />;
}

export default connect(null, { setFilter })(VisibilityFilterInput);

