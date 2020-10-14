import React from 'react';

import {cleanup, render} from '../../../test-utils';
import MultiSelect from '../multi-select';
import {InputElement, InputObj} from "../../../types";

describe('MultiSelect', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    const options = [
        {id: 1, value: 1},
        {id: 2, value: 2},
    ];

    it('renders without error', () => {
        render(<MultiSelect
            name={'name'} label={'name'} error={''} value={0}
            options={options}
            onChange={
                ({currentTarget}: InputObj | React.ChangeEvent<InputElement>) => (currentTarget)}/>);
    });
});
