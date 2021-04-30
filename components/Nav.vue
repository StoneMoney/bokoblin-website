<template>
  <client-only placeholder="Loading...">
    <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
      <b-navbar-brand href="#">
        <nuxt-link to="/" class="unstyle">
          <img src="~/static/bokoskull.svg" height="32px" alt="Boko Skull"><span class="d-none d-sm-inline"> Bokoblin</span>
        </nuxt-link>
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li>
            <nuxt-link to="/marathons" class="unstyle">
              <div class="nav-link">
                Marathons
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/attendees" class="unstyle">
              <div class="nav-link">
                Attendees
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/games" class="unstyle">
              <div class="nav-link">
                Games
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/causes" class="unstyle">
              <div class="nav-link">
                Causes
              </div>
            </nuxt-link>
          </li>
          <b-nav-item-dropdown text="Tools" right>
            <b-dropdown-item>
              <nuxt-link to="/tools/extension" class="unstyle">
                Extension
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link to="/tools/calc" class="unstyle">
                Calculator
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link to="/tools/search" class="unstyle">
                Advanced Search
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link to="/tools/time-converter" class="unstyle">
                Time Converter
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <nuxt-link to="/api" class="unstyle">
                BokoAPI
              </nuxt-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Docs" right>
            <b-dropdown-item target="_blank" href="https://docs.google.com/spreadsheets/d/1nT8vmOsvK4eLEaIJfeT-tU0cPVSQ1-Ue5JpFk5sMXS8/edit#gid=1571767325">
              Current
            </b-dropdown-item>
            <b-dropdown-item target="_blank" href="https://docs.google.com/spreadsheets/d/1mAhSDgMUySGB4rxwFX7DpGrnChZrUs58TbvKAX3fCto/edit#gid=608172957">
              Archives
            </b-dropdown-item>
            <b-dropdown-item target="_blank" href="https://docs.google.com/spreadsheets/d/1z2Y_unhykpD4jmpKgRrXagad42Jl7EFRNm7JfqtQQ7c/edit#gid=964693497">
              Logs
            </b-dropdown-item>
            <b-dropdown-item target="_blank" href="https://docs.google.com/spreadsheets/d/13Zh1ovK_7zBIk_bCEMeTosv3jf9asegRTQyCTCC3O58/edit#gid=333803068">
              Graphs
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <li>
          <b-button
            variant="primary"
            class="mr-sm-2"
            placeholder="Search"
            :disabled="spotlight"
            @click="search()"
          >
            <b-icon-search /> Search
          </b-button>
        </li>

        <!-- <b-nav-item-dropdown right>
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">
            Profile
          </b-dropdown-item>
          <b-dropdown-item href="#">
            Sign Out
          </b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse" class="ml-2" />
    </b-navbar>
  </client-only>
</template>
<script>
import { BIconSearch } from 'bootstrap-vue'

export default {
  components: {
    BIconSearch
  },
  props: {
    spotlight: Boolean
  },
  methods: {
    search () {
      this.$emit('spotlight', true)
    }
  }
}
</script>
