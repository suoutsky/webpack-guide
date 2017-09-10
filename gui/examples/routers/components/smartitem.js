var ImgItem = {
    props: ['data'],
    render: function(h) {
        return h('div', [
            h('p', '图片组件'),
            h('img', {
                attrs: {
                    src: this.data.url
                }    
            })
        ])
    }
};

var VideoItem = {
    props: ['data'],
    render: function (h) {
        return h('div', [
            h('p', '视频组件'),
            h('video', {
                attrs: {
                    src: this.data.url,
                    controls: 'controls',
                    autoplay: 'autoplay'
                }
            })
        ])
    }
};

var TextItem = {
    props: ['data'],
    render: function(h) {
        return h('div', [
            h('p', '纯文本组件'),
            h('p', this.data.content)
        ])
    }
}
export default {
    functional: true,
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    render: function(h, context) {
        function getComponent() {
            var data = context.props.data;
            if (data.type === 'img') return ImgItem;
            if (data.type === 'video') return VideoItem;
            return TextItem;
        }
        return h (
            getComponent(),
            {
                props: {
                    data: context.props.data
                }
            },
            context.children
        )
    }
}