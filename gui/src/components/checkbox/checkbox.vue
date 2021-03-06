<template>
    <label :class="wrapClasses">
        <span :class="checkboxClasses">
           <span :class="innnerClasses"></span>
           <input 
             v-if="group"
             type="checkbox"
             :class="inputClasses"
             :disabled="disable"
             :value="label"
             v-model="model"
             @change="change">
           >
           <input 
             v-if="!group"
             type="checkbox"
             :class="inputClasses"
             :disabled="disable"
             :checked="currentValue"
             @change="change">
           >
        </span>
        <slot><span v-if="showSlot"> {{ label }} </span></slot>
    </label>
</template>
<script>
    import { findComponentUpward, oneOf } from '../../utils/assist';
    import Emitter from '../../mixins/emitter';

    const prefixCls = 'ivu-checkbox';

    export default {
        name: 'Checkbox',
        mixins: [ Emitter ],
        props: {
          disabled: {
              type: Boolean,
              default: false
          },
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
          },
          label: {
              type: [String, Number, Boolean]
          },
          indeterminate: {
              type: Boolean,
              default: false
          },
          size: {
              validator (value) {
                  return oneOf(value, ['small', 'large', 'default']);
              }
          }
        },
        data () {
            return {
                model: [],
                currentValue: this.value,
                group: false,
                showSlot: true,
                parent: findComponentUpward(this, 'CheckboxGroup')
            };
        },
        computed: {
            warpClasses () {
                return [
                    `${prefixCls}-wrapper`,
                    {
                        [`${prefixCls}-group-item`]: this.group,
                        [`${prefixCls}-wrapper-checked`]: this.currentValue,
                        [`${prefixCls}-wrapper-disable`]: this.disabled,
                        [`${prefixCls}-${this.size}`]: !!this.size
                    }
                ];
            },
            checkboxClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-checked`]: this.currentValue,
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-indeterminate`]: this.indeterminate
                    }
                ];
            },
            innerClasses () {
                return `${prefixCls}-inner`;
            },
            inputClasses () {
                return `${prefixCls}-input`;
            }
        },
        mounted () {
            this.parent = findComponentUpward(this, 'CheckboxGroup');
            if(this.parent) this.group = true;
            if (!this.group) {
                this.updateModel();
                this.showSlot = this.$slots.default !== undefined;
            } else {
                this.parent.updateModel(true);
            }
        },
        methods: {
            change (event) {
                if (this.disable) {
                    return false;
                }

                const checked = event.target.checked;
                this.currentValue = checked;
                let value = checked ? this.trueValue : this.falseValue;
                this.$emit('input', value);

                if (this.group) {
                    this.parent.change(this.model);
                } else {
                    this.$emit('on-change', value);
                    this.dispatch('FromItem', 'on-form-change', value);
                }
            },
            updateModel () {
                this.currentValue = this.value === this.trueValue;
            }
        },
        watch: {
            value (val) {
                if (val !== this.trueValue && val !== this.falseValue) {
                    throw 'Value should be trueValue or falseValue.';
                }
                this.updatedModel();
            } 
        }
    }
</script>