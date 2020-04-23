<template>
    <div class="card">
        <div class="card-content">
            <div class="block has-text-centered">
                <h2 class="subtitle has-text-centered">Share {{ title }}</h2>
                <qrcode :value="url" :options="{ width: 250 }"></qrcode>
            </div>
            <div class="block has-text-centered">
                <b-input :value="url" readonly onclick="this.setSelectionRange(0, this.value.length)"></b-input>
            </div>
            <div class="block has-text-centered">
                <b-button icon-left="facebook" type="is-info" tag="a" target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u=' + this.encodedUrl">Facebook</b-button>&nbsp;
                <b-button icon-left="linkedin" type="is-info" tag="a" target="_blank" :href="'https://www.linkedin.com/shareArticle?mini=true&url=' + this.encodedUrl">LinkedIn</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import VueQrcode from '@chenfengyuan/vue-qrcode';

    export default {
        name: "ShareQR",
        props: ['url', 'title'],
        components: {
            'qrcode': VueQrcode
        },
        computed: {
            encodedUrl: function () {
                return encodeURIComponent(this.url);
            }
        }
    }
</script>

<style scoped>

</style>
