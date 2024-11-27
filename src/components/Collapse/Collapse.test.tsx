import Collapse from './Collapse.vue';
import CollapseItem from './CollapseItem/CollapseItem.vue';
// import React from 'react';
import { mount } from '@vue/test-utils';

// const cl = Collapse;

// const a = () => <Collapse></Collapse>;

describe('Collapse Com Test', () => {
  test('test collapse props', () => {
    const wrapper = mount(() => (
      <Collapse modelValue={['a']}>
        <CollapseItem name="a"></CollapseItem>
      </Collapse>
    ), {
      props: {
        modelValue: ['1', '2'],
        accordion: true,
      },
      global: {
        stubs: ['Icon'],
      },
    });

    console.log(wrapper.html());
  });
});
