import type {WritableComputedRef,InjectionKey} from "vue";

export interface CollapseType {
    modelValue:string[]; // 激活的Collapse的name
    accordion?:boolean; // 是否开启手风琴模式，开启一个另一个隐藏
}

export interface CollapseEmits {
    (e:'update:modelValue',values:string[]):void,
    (e:'change',values:string[]):void
}

export interface CollapseProvideType {
    activeList:WritableComputedRef<string[]>;
    changeActiveList:(activeName:string)=>void
}

export const collapseInjectKey:InjectionKey<CollapseProvideType> = Symbol('collapseProvideSymbol');