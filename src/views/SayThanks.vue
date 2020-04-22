<template>
    <div>
        <div class="inner-container">
            <div class="block">
                Maybe some kind words for our volunteers!
            </div>
            <vue-disqus shortname="translatefor-sg" identifier="translateforsg"
                        url="https://translatefor.sg"></vue-disqus>
        </div>
        <br>
    </div>
</template>

<script>
    // @ is an alias to /src
    import VueDisqus from "@/components/VueDisqus";

    export default {
        name: 'Home',
        components: {
            VueDisqus,
        }
    }
</script>

<style>
    .container {
        padding-top: 40px;
        margin: 0 20px !important;
    }

    .container {
        display: flex;
        justify-content: center;
    }
</style>