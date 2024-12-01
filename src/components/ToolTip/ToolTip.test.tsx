import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import ToolTip from './ToolTip.vue';
import { Placement } from '@floating-ui/vue';

let wrapper: VueWrapper;
let popperNode: DOMWrapper<HTMLElement>;
let buttonNode: DOMWrapper<HTMLElement>;
let toolTipInstance: VueWrapper<InstanceType<typeof ToolTip>>;
let outsideNode: DOMWrapper<HTMLElement>;

const placement = ref<Placement>('bottom');
const manual = ref(false);
const onVisibleChange = vi.fn();

describe('ToolTip test', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    wrapper = mount(() => (
      <>
        <div class="outside">outside</div>
        <ToolTip placement={placement.value} manual={manual.value} onVisible-change={onVisibleChange}>
          {{
            default: () => <button>click</button>,
            content: () => <span>content slot</span>,
          }}
        </ToolTip>
      </>
    ), {
      attachTo: document.body,
    });

    popperNode = wrapper.find('.jt-tooltip__popper');
    buttonNode = wrapper.find('button');
    toolTipInstance = wrapper.findComponent(ToolTip);
    outsideNode = wrapper.find('.outside');
  });
  test('内容显示是否正确', () => {
    expect(wrapper.text()).contains('click');
    expect(wrapper.text()).contains('content slot');
  });

  test('点击事件能否正常触发', async () => {
    expect(popperNode.isVisible()).toBeFalsy();

    await buttonNode.trigger('click');
    await vi.runAllTimers(); // 等待所有定时器执行完，debounce含有定时器

    expect(popperNode.isVisible()).toBeTruthy();
  });

  test('点击外层能否收起popper', async () => {
    if (!popperNode.isVisible()) {
      toolTipInstance.vm.show();
      await vi.runAllTimers();
    }
    expect(popperNode.isVisible()).toBeTruthy();

    await outsideNode.trigger('click');
    await vi.runAllTimers();

    expect(popperNode.isVisible()).toBeFalsy();
  });

  test('placement能否正常生效', async () => {
    expect(popperNode.attributes()['data-popper-placement']).toBe('bottom');

    placement.value = 'top';
    await nextTick();

    expect(popperNode.attributes()['data-popper-placement']).toBe('top');
  });

  test('manual能否正常生效', async () => {
    onVisibleChange.mockClear();

    await buttonNode.trigger('click');
    await vi.runAllTimers();

    expect(onVisibleChange).toBeCalledTimes(1);

    manual.value = true;
    await nextTick();

    onVisibleChange.mockClear();

    await buttonNode.trigger('click');
    await vi.runAllTimers();

    expect(onVisibleChange).toBeCalledTimes(0);
  });
});
