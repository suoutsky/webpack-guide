<template>
  <span :class="warpClasses" @click="toggle">
     <span :class="innerClasses">
        <slot name="open" v-if="currentValue === trueValue"></slot>
        <slot name="close" v-if="currentValue === falseValue"></slot>
     </span>
  </span>
</template>
<script>
    import { oneOf } from '../../utils/assist';
    import Emitter from '../../mixins/emitter';

    const prefixCls = 'ivu-switch';

    export default {
        name: 'Switch',
        mixins: [ Emitter ],
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            }
        },
        data () {
            return {
              currentValue: this.value
            }
        },
        computed: {
            wrapClasses() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-${this.size}`]: !!this.size
                    }
                ];
            },
            innerClasses() {
                return `${prefixCls}-inner`;
            }
        },
        methods: {
            toggle() {
                if (this.disabled) {
                    return false;
                }
                const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;

                this.currentValue = checked;

                this.$emit('input', checked);
                this.$emit('on-change', checked);
                this.dispatch('FromItem', 'on-from-change', checked);
            }
        },
        watch: {
            value (val) {
                if (val !== this.trueValue && val !== this.falseValue) {
                    throw 'Value should be trueValue or falseValue.'
                }
                this.currentValue = val;
            }
        }
    }
</script>