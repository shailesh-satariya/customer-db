import React from 'react';

import {cleanup, render} from '../../../test-utils';
import Paginator from "../paginator";

describe('Paginator', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(
            <Paginator count={100} page={1} pageSize={20} pageSizes={[20, 50]} currentPage={2}
                       onPageChange={(page: number) => (page)}
                       onPageSizeChange={(size: number) => (size)}
            />);
    });
});
