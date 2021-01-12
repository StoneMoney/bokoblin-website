<template>
  <b-container class="mx-auto m-3">
    <b-jumbotron bg-variant="dark">
      <template #header>
        <b-container class="mx-auto m-3 text-center">
          <img src="~/static/bokoblin.svg" width="50%" alt="Logo">
        </b-container>
      </template>

      <template #lead>
        <h1 class="text-light text-center m-3">
          Kinstone Archives
        </h1>
        <b-container class="mx-auto text-center m-3">
          <nuxt-link to="/marathons">
            <b-button variant="danger" size="lg mb-1">
              Marathons
            </b-button>
          </nuxt-link>
          <nuxt-link to="/attendees">
            <b-button variant="danger" size="lg mb-1">
              Attendees
            </b-button>
          </nuxt-link>
          <nuxt-link to="/games">
            <b-button variant="danger" size="lg mb-1">
              Games
            </b-button>
          </nuxt-link>
          <nuxt-link to="/causes">
            <b-button variant="danger" size="lg mb-1">
              Causes
            </b-button>
          </nuxt-link>
        </b-container>
      </template>

      <hr class="my-4">

      <p class="text-light">
        Looking for the Google Sheet documents for the marathons?
      </p>

      <b-button variant="primary" href="https://docs.google.com/spreadsheets/d/1nT8vmOsvK4eLEaIJfeT-tU0cPVSQ1-Ue5JpFk5sMXS8/" class="mb-1">
        Current Doc
      </b-button>
      <b-button variant="primary" href="https://docs.google.com/spreadsheets/d/1mAhSDgMUySGB4rxwFX7DpGrnChZrUs58TbvKAX3fCto/" class="mb-1">
        Archive Doc
      </b-button>
      <b-button variant="secondary" href="https://docs.google.com/spreadsheets/d/1z2Y_unhykpD4jmpKgRrXagad42Jl7EFRNm7JfqtQQ7c/" class="mb-1">
        ZT Log Doc
      </b-button>
      <b-button variant="secondary" href="https://docs.google.com/spreadsheets/d/1IMKG7Zy0mcIVN1K7nMctboFg4Lr5csNlgtjqyfv9o7Y/" class="mb-1">
        PoH Log Docs
      </b-button>
      <b-button variant="secondary" href="https://docs.google.com/spreadsheets/d/1gTZwLgvd6H9ZCM-ZIieLYbkHX0jdXyglmisF2VtKpnE/" class="mb-1">
        SQ Log Docs
      </b-button>
      <b-button variant="secondary" href="https://docs.google.com/spreadsheets/d/13Zh1ovK_7zBIk_bCEMeTosv3jf9asegRTQyCTCC3O58/" class="mb-1">
        Graphs
      </b-button>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {
  head () {
    return {
      title: 'Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin, archived data of the last 11 years of Kinstone-operated charity marathons'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin, archived data of the last 11 years of Kinstone-operated charity marathons'
        }
      ]
    }
  }
}
</script>
