import { mount } from "@vue/test-utils";
import Button from "./Button.vue";
import { nextTick } from "vue";

describe('test button component',()=>{
  test('test button slot',()=>{
    const wrapper = mount(Button,{
      slots:{
        default:"hello"
      }
    });    
    expect(wrapper.text()).include("hello");
  });

  test('test button props',()=>{
    const wrapper = mount(Button,{
      props:{
        disabled:true,
        type:'success'
      },
      slots:{
        default:"hello"
      }
    });

    const btn = wrapper.find('button');

    expect(btn.attributes()).haveOwnProperty('disabled');
    expect(btn.classes()).include('is-disabled');
    expect(btn.classes()).include('jt-button--success');
  });

  test('test button click',async ()=>{
    const wrapper = mount(Button,{
      props:{
        disabled:false,
        type:'success'
      },
      slots:{
        default:"hello"
      }
    });

    // wrapper.emitted() 会记录每个事件的调用次数
    // 当disabled为false，点击生效
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');

    // disable为true的时候点击不生效
    wrapper.setProps({disabled:true});
    await nextTick();
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted().click).length(1);
  });
});