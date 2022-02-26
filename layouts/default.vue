<template>
  <div>
    <SpotlightSearch v-if="spotlightVisible" @clear="spotlightVisible = false" />
    <Nav :spotlight="spotlightVisible" @spotlight="spotlightVisible = true" />
    <main>
      <Nuxt />
    </main>
    <footer>
      <b-container>
        Bokoblin &copy; 2021 |
        <nuxt-link to="/about">
          About
        </nuxt-link> |
        <nuxt-link to="/support">
          Support
        </nuxt-link> |
        <nuxt-link to="/api">
          API
        </nuxt-link> |
        <a href="https://discord.gg/bUjNJ9j">
          Discord
        </a>
      </b-container>
    </footer>
  </div>
</template>

<script>
import Nav from '../components/Nav'
import SpotlightSearch from '../components/SpotlightSearch'
export default {
  components: {
    Nav,
    SpotlightSearch
  },
  data () {
    return {
      spotlightVisible: false
    }
  },
  watch: {
    $route (to, from) {
      this.spotlightVisible = false
    }
  }
}
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.loading-zone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 30vh;
  height: 20vh;
  margin-bottom: 30vh;
  width: 100vw;
  overflow: hidden;
}

html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.unstyle {
  color: inherit;
}
.unstyle:hover {
  color: inherit;
}
.unstyle:active {
  color: inherit;
}
.unstyle:link {
  color: inherit;
}
.unstyle:visited {
  color: inherit;
}
.unstyledx {
  color: inherit;
  text-decoration: inherit;
}
.unstyledx:hover {
  color: inherit;
  text-decoration: inherit;
}
.unstyledx:active {
  color: inherit;
  text-decoration: inherit;
}
.unstyledx:link {
  color: inherit;
  text-decoration: inherit;
}
.unstyledx:visited {
  color: inherit;
  text-decoration: inherit;
}
</style>
