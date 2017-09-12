function broadcast(componentName, eventName, params) {
    this.$children.forEach((child) => {
        const name = child.$options.name;

        if (name === componentName) {
           child.$emit.apply(child, [eventName].concat(params));
        } else {
            // @todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [eventName].concat(params));
        }
    });
}

export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || ths.$root;
            let name = par
        }
    }
}