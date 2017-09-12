// es6 polyfill
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';

import Button from './components/button';
import Icon from './components/icon';
import Modal from './components/modal';

const iview = {
    Icon,
    Button,
    iButton: Button,
    ButtonGroup: Button.Group,
    Modal
}

const install = function (Vue, opts = {}) {
    // locale.use(opts.locale);
    // locale.i18n(opts.i18n);

    Object.keys(iview).forEach((key) => {
      Vue.component(key, iview[key]);
    });
}

if (window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(iview, {install}); // eslint-disable-line no-undef
