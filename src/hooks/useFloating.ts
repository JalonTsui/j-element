import { computePosition, arrow } from '@floating-ui/vue';
import type { ComputePositionConfig } from '@floating-ui/vue';
import { watchEffect, reactive, isRef, ref } from 'vue';
import { omit } from 'lodash-es';
import type { Ref } from 'vue';

type INodeType = Ref<HTMLElement | null>;

export interface IUseFloatConfig extends Partial<ComputePositionConfig> {
  arrowNode?: INodeType | HTMLElement | null;
  isShow?: boolean;
}

const STATIC_SIDE_MAP: Record<string, string> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

export function useFloating(triggerRef: INodeType,
  popperRef: INodeType,
  options: IUseFloatConfig = {}) {
  const isShow = ref(typeof options.isShow === 'boolean' ? options.isShow : false); // 控制默认是否显示
  const floatingConfig = omit(options, ['arrowNode', 'isShow']); // 过滤出floating-ui原生的配置
  const refOptions = reactive<IUseFloatConfig>(floatingConfig);
  const watchHandler = watchEffect(() => {
    const triggerNode = triggerRef.value; // 触发区dom
    const popperNode = popperRef.value; // 展示区dom
    const arrawNode = isRef(options.arrowNode) ? options.arrowNode.value : options.arrowNode; // 箭头

    if (arrawNode) {
      if (!Array.isArray(refOptions.middleware)) {
        refOptions.middleware = [];
      }
      refOptions.middleware.push(arrow({ element: arrawNode }));
    }

    if (!triggerNode || !popperNode) {
      return;
    }

    if (!isShow.value) {
      return;
    }

    computePosition(triggerNode, popperNode, refOptions)
      .then(({ x, y, placement, middlewareData }) => {
        Object.assign(popperNode.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        if (!arrawNode) {
          return;
        }
        const staticSide = STATIC_SIDE_MAP[placement.split('-')[0]] || '';
        const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
        Object.assign(arrawNode.style, {
          left: arrowX ? `${arrowX}px` : '',
          top: arrowY ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-4px',
        });
      });
  });
  return { ...watchHandler, options: refOptions, isShow };
}
