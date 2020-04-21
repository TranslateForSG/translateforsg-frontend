<template>
    <div>
        <Navbar/>
        <div class="container">
            <div class="inner-container">
                <div class="block">
                    Maybe some kind words for our volunteers!
                </div>
                <vue-disqus shortname="translatefor-sg" identifier="translateforsg" url="https://translatefor.sg"></vue-disqus>
            </div>
        </div>
        <br>
        <Footer></Footer>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Navbar from "@/components/Navbar";
    import VueDisqus from "@/components/VueDisqus";
    import Footer from "@/components/Footer";

    export default {
        name: 'Home',
        components: {
            Footer,
            VueDisqus,
            Navbar
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