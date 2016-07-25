import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import ImplicitInput from './ImplicitInput';

const initialValue = 'hello';
const wrapper = shallow(
  <ImplicitInput
    value={initialValue}
    handleChange={sinon.spy()}
    allowEmptyValue={false}
  />
);
const input = wrapper.find('input');

describe('<ImplicitInput />', () => {

  it('should render input tag', () => {
    expect(input).to.have.length(1);
    expect(wrapper.prop('value')).to.equal(initialValue);
    expect(wrapper.state().value).to.equal(initialValue);
    expect(wrapper.state().defaultValue).to.equal(initialValue);
  });

  it('should update input value on change', () => {
    let nextValue = 'update 1';
    input.simulate('change', {target: {value: nextValue}});
    expect(wrapper.prop('value')).to.equal(nextValue);
  });

  it('should update component state on change', () => {
    let nextValue = 'update 2';
    input.simulate('change', {target: {value: nextValue}});
    expect(wrapper.state().value).to.equal(nextValue);
  });

  it('should update defaultValue onBlur', () => {
    let currentValue = wrapper.state().defaultValue;
    let nextValue = 'update 3';

    input.simulate('change', {target: {value: nextValue}});
    expect(wrapper.state().defaultValue).to.equal(currentValue);
    input.simulate('blur');
    expect(wrapper.state().defaultValue).to.equal(nextValue);
  });

  it('should not be empty if allowEmptyValue=false', () => {
    input.simulate('change', {target: {value: ''}});
    expect(wrapper.state().value).to.equal('');
    input.simulate('blur');
    expect(wrapper.state().value).to.equal(wrapper.state().defaultValue);
  });
});
