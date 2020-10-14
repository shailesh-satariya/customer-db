import React from 'react';
import NavBar from './components/nav-bar';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import {expect} from 'chai';
import App from "./App";
import {MemoryRouter} from 'react-router';

configure({adapter: new Adapter()});


describe("Customer Library Testing", () => {
    it('renders react app', () => {
        const wrapper = shallow(
            <App/>
        );
        expect(wrapper.find(NavBar)).to.have.lengthOf(1);
    });

    it('renders an `.navbar-brand', () => {
        const wrapper = mount(
            <MemoryRouter>
                <NavBar user={null}/>
            </MemoryRouter>
        );
        expect(wrapper.find('.navbar-brand')).to.have.lengthOf(1);
    });
});
