import React from 'react';

import {cleanup, render} from '../../../test-utils';
import Pagination from "../pagination";

describe('Pagination', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<Pagination itemsCount={100} pageSize={20} currentPage={2}
                           onPageChange={(page: number) => (page)}/>);
    });
});
