import React from 'react';

import {cleanup, render} from '../../../test-utils';
import SearchBox from '../search-box';

describe('SearchBox', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<SearchBox
            value={''}
            onChange={
                (value: string) => (value)}/>);
    });
});
