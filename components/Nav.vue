<template>
  <client-only placeholder="Loading...">
    <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
      <b-navbar-brand href="#">
        <nuxt-link to="/" class="unstyle">
          <img src="~/static/bokoskull.svg" height="32px" alt="Boko Skull"> Bokoblin
        </nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <nuxt-link to="/marathons" class="unstyle">
            <div class="nav-link">
              Marathons
            </div>
          </nuxt-link>
          <nuxt-link to="/attendees" class="unstyle">
            <div class="nav-link">
              Attendees
            </div>
          </nuxt-link>
          <nuxt-link to="/games" class="unstyle">
            <div class="nav-link">
              Games
            </div>
          </nuxt-link>
          <nuxt-link to="/causes" class="unstyle">
            <div class="nav-link">
              Causes
            </div>
          </nuxt-link>
          <b-nav-item-dropdown text="Tools" right>
            <b-dropdown-item>
              <nuxt-link to="/tools/time-converter" class="unstyle">
                Time Converter
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
      <!-- <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
          />
          <b-button
            size="sm"
            class="my-2 my-sm-0"
            type="submit"
          >
            Search
          </b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">
            Profile
          </b-dropdown-item>
          <b-dropdown-item href="#">
            Sign Out
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
  </client-only>
</template>
