<template>
  <div class="full-width">
    <article style="text-align: left">
      <div>
        <h2 class="is-3 subtitle">The Story</h2>
      </div>
      <br />
      <div>
        <h3 class="subtitle is-4">Beginnings</h3>
        <p>
          This web app started from the work of Sudesna Roy Chowdhury's Website. The website had been a
          treasure trove of translations from the Singaporean Bengali community.
          <a href="https://meditranslate.org/?thanksFrom=TranslateForSG"
          >Medi-translate</a>
          and other communities stepped up to drive the efforts to many languages.
        </p>
        <br>
        <h3 class="subtitle is-4">Engineering Sprint</h3>
        <p>Ani joins the efforts. He starts building up TranslateForSG to cater to a wider and more diverse community of Singapore residents;
            speaking different langauges and dialects. AI-enabled translations and speech was used before volunteers jumped in. The web app 
            was made mobile-friendly and easy-to-use. Translations were centralized.</p>
        <br />
        <h3 class="subtitle is-4">Real Heroes</h3>
        <p>The app would be of no value without the contributions of our valued volunteer translators. <router-link to="/contributors">Many have worked</router-link>
         and contributed to this project, we thank you all for coming forward for Singapore! 🇸🇬 The valuable feedback from UX Researchers, 
         Healthcare Workers have been imperative in building TranslateForSG.</p>
        <br />
        <h3 class="is-4 subtitle">Open Source</h3>
        <p>
          Source code available on
          <a
            href="https://github.com/aniruddha-adhikary/translateforsg-frontend"
          >GitHub</a>.
        </p>
        <br>
        <h3 class="is-4 subtitle">Affiliations</h3>
        <p>This spontaneous volunteer-driven project is not affiliated to any organization.</p>
        <br />
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "TheStory"
};
</script>

<style scoped>
    .full-width {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    article {
        max-width: 640px;
    }
</style>