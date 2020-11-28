import React from 'react';
import {FormControl,InputGroup} from 'react-bootstrap';
export default (props) => {
    return (
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onKeyUp={props.filterList} />
        </InputGroup>
    )
}
