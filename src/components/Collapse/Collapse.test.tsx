import Collapse from './Collapse.vue';
import CollapseItem from './CollapseItem/CollapseItem.vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { ref, nextTick } from 'vue';

let headers: DOMWrapper<Element>[];
let contents: DOMWrapper<Element>[];
let aHeader: DOMWrapper<Element>;
let bHeader: DOMWrapper<Element>;
let cHeader: DOMWrapper<Element>;
let aCtx: DOMWrapper<Element>;
let bCtx: DOMWrapper<Element>;
let cCtx: DOMWrapper<Element>;
let wrapper: VueWrapper;

/**
 * 1. 重置每个单元测试的值,beforeAll在执行总体测试的时候只会执行一次
 * 2. 可以定义一个自己的测试组件，然后把外层当作一个作用域，定义响应式变量进行测试，这个测试就是一个例子
 */
const list = ref(['a']);
const accordionValue = ref(false);
const onChange = vi.fn().mockImplementation(v => list.value = v);

async function init() {
  list.value = ['a'];
  accordionValue.value = false;
  onChange.mockClear(); // 重置mock function的计数
  await nextTick();
}

describe('Collapse Com Test', () => {
  beforeAll(async () => {
    wrapper = mount(() => (
      <Collapse modelValue={list.value} onUpdate:modelValue={onChange} accordion={accordionValue.value}>
        <CollapseItem name="a" title="aTitle">
          aText
        </CollapseItem>
        <CollapseItem name="b" title="bTitle">
          bText
        </CollapseItem>
        <CollapseItem name="c" title="cTitle" disable>
          cText
        </CollapseItem>
      </Collapse>
    ), {
      global: {
        stubs: ['Icon'],
      },
      attachTo: document.body,
    });

    headers = wrapper.findAll('.jt-collapse-item__header');
    contents = wrapper.findAll('.jt-collapse-item__wrapper');
    aHeader = headers[0];
    bHeader = headers[1];
    cHeader = headers[2];
    aCtx = contents[0];
    bCtx = contents[1];
    cCtx = contents[2];
  });

  test('test collapse ctx show', async () => {
    await init();

    expect(aCtx.isVisible()).toBe(true);
    expect(bCtx.isVisible()).toBe(false);
    expect(cCtx.isVisible()).toBe(false);

    list.value = ['b'];
    await nextTick();

    expect(bCtx.isVisible()).toBe(true);
    expect(aCtx.isVisible()).toBe(false);
  });

  test('test ctx', async () => {
    await init();

    expect(aHeader.text()).contain('aTitle');
    expect(bHeader.text()).contain('bTitle');
    expect(cHeader.text()).contain('cTitle');
    expect(aCtx.text()).contain('aText');
    expect(bCtx.isVisible()).toBe(false);
  });

  test('test normal click', async () => {
    await init();

    expect(aCtx.isVisible()).toBeTruthy();
    expect(bCtx.isVisible()).toBeFalsy();
    expect(cCtx.isVisible()).toBeFalsy();

    await bHeader.trigger('click');

    expect(onChange).toBeCalledTimes(1);
    expect(aCtx.isVisible()).toBeTruthy();
    expect(bCtx.isVisible()).toBeTruthy();
    expect(cCtx.isVisible()).toBeFalsy();
  });

  test('test disable click', async () => {
    await init();

    expect(aCtx.isVisible()).toBeTruthy();
    expect(bCtx.isVisible()).toBeFalsy();
    expect(cCtx.isVisible()).toBeFalsy();

    await cHeader.trigger('click');

    expect(onChange).toBeCalledTimes(0);
    expect(aCtx.isVisible()).toBeTruthy();
    expect(bCtx.isVisible()).toBeFalsy();
    expect(cCtx.isVisible()).toBeFalsy();
  });

  test('test accordion model', async () => {
    await init();
    accordionValue.value = true;
    await nextTick();

    expect(aCtx.isVisible()).toBeTruthy();
    expect(bCtx.isVisible()).toBeFalsy();
    expect(cCtx.isVisible()).toBeFalsy();

    await bHeader.trigger('click');

    expect(onChange).toBeCalledTimes(1);
    expect(aCtx.isVisible()).toBeFalsy();
    expect(bCtx.isVisible()).toBeTruthy();
    expect(cCtx.isVisible()).toBeFalsy();
  });
});
