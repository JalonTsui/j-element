import { mount, VueWrapper, DOMWrapper } from '@vue/test-utils';
import Dropdown from './Dropdown.vue';

let wrapper: VueWrapper;
let list: DOMWrapper<Element>;
let triggerZoom: DOMWrapper<Element>;
let tooltipPopper: DOMWrapper<Element>;

describe('Dropdown test', () => {
  beforeAll(() => {
    // dropdown内部使用tooltip实现，有防抖设置，测试时，需要等待定时器执行完毕
    vi.useFakeTimers();
    wrapper = mount(Dropdown, {
      props: {
        menuOptions: [{
          label: 'test1',
          key: 1,
          disabled: true,
        }, {
          label: <div>test2</div>,
          key: 2,
          disabled: false,
        }],
        placement: 'left',
        hideAfterClick: true,
      },
      slots: {
        default: () => <button>click me</button>,
      },
      // 如果需要使用isVisable进行判断，一定要加上
      // https://test-utils.vuejs.org/api/#isVisible
      attachTo: document.body,
    });

    list = wrapper.find('.jt-dropdown__menu');
    triggerZoom = wrapper.find('button');
    tooltipPopper = wrapper.find('.jt-tooltip__popper');
  });

  test('属性传递是否正常', async () => {
    expect(tooltipPopper.attributes()['data-popper-placement']).toBe('bottom');
  });

  test('slot展示是否正常', () => {
    expect(triggerZoom.exists()).toBe(true);
    expect(triggerZoom.text()).toBe('click me');
  });

  test('显示列表是否正常', async () => {
    expect(list.text()).contain('test1');
    expect(list.text()).contain('test2');
    expect(list.exists()).toBeTruthy();
    expect(list.isVisible()).toBeFalsy();

    await triggerZoom.trigger('click');
    await vi.runAllTimers();

    expect(list.isVisible()).toBeTruthy();
  });
});
