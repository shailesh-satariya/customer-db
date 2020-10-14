import React from 'react';

import {cleanup, render} from '../../../test-utils';
import Input from '../input';
import {InputElement, InputObj} from "../../../types";

describe('Input', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<Input
            name={'name'} label={'name'} error={''} value={0}
            onChange={
                ({currentTarget}: InputObj | React.ChangeEvent<InputElement>) => (currentTarget)}/>);
    });
});
