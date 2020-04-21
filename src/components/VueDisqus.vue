<template>
    <div id="disqus_thread"></div>
</template>

<script>
    export default {
        name: 'VueDisqus',
        props: {
            shortname: {
                type: String,
                required: true
            },
            identifier: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: false
            },
            title: {
                type: String,
                required: false
            },
            remoteAuthS3: {
                type: String,
                required: false
            },
            apiKey: {
                type: String,
                required: false
            },
            ssoConfig: {
                type: Object,
                required: false
            },
            language: {
                type: String,
                required: false
            }
        },
        mounted() {
            if (window.DISQUS) {
                this.reset(window.DISQUS);
                return
            }
            this.init()
        },
        methods: {
            reset(dsq) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const self = this;
                dsq.reset({
                    reload: true,
                    config: function () {
                        self.setBaseConfig(this)
                    }
                })
            },
            init() {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const self = this;
                // eslint-disable-next-line @typescript-eslint/camelcase
                window.disqus_config = function () {
                    self.setBaseConfig(this)
                };
                setTimeout(() => {
                    const d = document;
                    const s = d.createElement('script');
                    s.setAttribute('id', 'embed-disqus');
                    s.setAttribute('data-timestamp', +new Date());
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = `//${this.shortname}.disqus.com/embed.js`;
                    (d.head || d.body).appendChild(s);
                }, 0)
            },
            setBaseConfig(disqusConfig) {
                disqusConfig.page.identifier = (this.identifier || this.$route.path || window.location.pathname)
                disqusConfig.page.url = (this.url || this.$el.baseURI)
                if (this.title) {
                    disqusConfig.page.title = this.title;
                }
                if (this.remoteAuthS3) {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    disqusConfig.page.remote_auth_s3 = this.remoteAuthS3;
                }
                if (this.apiKey) {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    disqusConfig.page.api_key = this.apiKey;
                }
                if (this.ssoConfig) {
                    disqusConfig.sso = this.ssoConfig;
                }
                if (this.language) {
                    disqusConfig.language = this.language;
                }

                disqusConfig.callbacks.onReady = [() => {
                    this.$emit('ready')
                }]

                disqusConfig.callbacks.onNewComment = [(comment) => {
                    this.$emit('new-comment', comment)
                }]
            }
        }
    }
</script>