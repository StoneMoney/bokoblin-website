<template>
  <div>
    <b-container class="m-3 mx-auto">
      <h1>
        Bokoblin Extension
      </h1>
      <p>
        A browser extension for use during Zeldathon &amp; SideQuest marathons!
      </p>
      <p>
        Get it on your browser of choice here:
        <br>
        <b-button variant="secondary" style="background-color:#26a69a" href="https://chrome.google.com/webstore/detail/zeldathon-donation-compan/lpkoibgmidgpjhnlhnnccgekdiikpggi?hl=en&authuser=0" class="mb-1">
          Google Chrome &amp; Edge
        </b-button>
        <!-- <b-button variant="secondary" style="background-color:#2196F3" href="https://microsoftedge.microsoft.com/addons/detail/zeldathon-donation-compan/lngfpaiknggifchneemndkianjkdlpaa" class="mb-1">
          Microsoft Edge
        </b-button> -->
        <b-button variant="secondary" style="background-color:#ff9800" href="https://addons.mozilla.org/en-US/firefox/addon/bokoblin/" class="mb-1">
          Mozilla Firefox
        </b-button>
      </p>
      <h2>
        Features
      </h2>
      <b-col>
        <b-row>
          <b-card
            title="Quick View"
            style="max-width: 20rem;"
            class="m-2"
          >
            <b-card-text>
              Check your donation contribution, and the marathon total by clicking the bokoblin skull
            </b-card-text>
          </b-card>
          <b-card
            title="Budget Alerts"
            style="max-width: 20rem;"
            class="m-2"
          >
            <b-card-text>
              See an on-page alert with budget reminders.
            </b-card-text>
          </b-card>
          <b-card
            title="Autofill Amounts"
            style="max-width: 20rem;"
            class="m-2"
          >
            <b-card-text>
              Get autofill donation amounts for secret sounds, palindromes, fixers, and more.
            </b-card-text>
          </b-card>
        </b-row>
        <b-row>
          <b-card
            title="Tier Checking"
            style="max-width: 20rem;"
            class="m-2"
          >
            <b-card-text>
              Track your donations (per name) and see progress twoard the next donor tier
            </b-card-text>
          </b-card>
          <b-card
            title="BLESS Blocker"
            style="max-width: 20rem;"
            class="m-2"
          >
            <b-card-text>
              Adds an option to hide messages containing solely the word/emote "BLESS"
            </b-card-text>
          </b-card>
          <b-card
            title="Attendie Chat Badges"
            style="max-width: 20rem;"
            class="m-2"
          >
            <b-card-text>
              Highlight Kinstone team members in chat with a special triforce badge next to their username.
            </b-card-text>
          </b-card>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Bokoblin Extension',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'A tool for Kinstone Donations, autofill secret sounds, set a budget, and more. Available as an extension for firefox, edge, and chrome.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Bokoblin Extension'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'A tool for Kinstone Donations, autofill secret sounds, set a budget, and more. Available as an extension for firefox, edge, and chrome.'
        },
        { name: 'theme-color', content: '#ff5959' }

      ]
    }
  }
}
</script>
