import React from 'react';

import {cleanup, render} from '../../../test-utils';
import {Customer} from "../../../types/graphql/customer";
import {Column} from "../../../types";
import {convertMinutesToDuration} from "../../../utils/helper";
import TableHeader from "../table-header";

const columns: Column[] = [
    {
        path: "firstname",
        label: "First name",
        sortable: true
    },
    {
        path: "lastname",
        label: "Last name",
        sortable: true
    }
];

describe('TableHeader', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(
            <table>
                <TableHeader
                    columns={columns}
                    onSort={((sort: string) => sort)}
                    sort={'firstname'}
                />
            </table>
        );
    });
});
