<template>
  <div>
    <b-container class="m-3 mx-auto">
      <h1>
        BokoblinBOT
      </h1>
      <p>
        Twitch bot information
      </p>
      <h2>
        Commands
      </h2>
      <b-col>
        <b-card
          title="?now"
          style="max-width: 50vw;"
          class="m-2"
        >
          <b-card-text>
            <b-badge variant="warning">
              sub
            </b-badge>  Displays information about the current segment. If you follow up with a <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA timecode</a> ex: <tt>?now Europe/Paris</tt> you can get the times in a specific timezone.
            <hr>
            <h6>Example Output:</h6>
            <p>On now: Pre-Marathon (Countdown) with The Kinstone Team, ending at 2:00 PM (EDT) (in ~48h0m)</p>
          </b-card-text>
        </b-card>
        <b-card
          title="?next"
          style="max-width: 50vw;"
          class="m-2"
        >
          <b-card-text>
            <b-badge variant="warning">
              sub
            </b-badge> Displays information about the upcoming segment. If you follow up with a <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA timecode</a> ex: <tt>?now Europe/Paris</tt> you can get the times in a specific timezone.
            <hr>
            <h6>Example Output:</h6>
            <p>Up next: Pre-Marathon (Countdown) with The Kinstone Team, starting at 1:00 PM (EDT) (in ~47h0m)</p>
          </b-card-text>
        </b-card>
        <b-card
          title="?shoutout"
          style="max-width: 50vw;"
          class="m-2"
        >
          <b-card-text>
            <b-badge variant="success">
              mod/vip
            </b-badge> Lists who is hosting the current segment and provides a link to their twitch channel. Only twitch channels are supported for automatic shoutouts.
            <hr>
            <h6>Example Output:</h6>
            <p>Check out Starrlett @ https://twitch.tv/starrlett20</p>
          </b-card-text>
        </b-card>
        <b-card
          title="?unheard"
          style="max-width: 50vw;"
          class="m-2"
        >
          <b-card-text>
            <b-badge variant="warning">
              sub
            </b-badge> Posts the lowest unheard secret sound, as well as the percentage of sounds heard. Updates live with the community document
            <hr>
            <h6>Example Output:</h6>
            <p>The lowest unheard sound is 'Golden Lute (Cadence of Hyrule)' ($4.40) Out of 228 sounds, 1 have been heard [~0.44%]</p>
          </b-card-text>
        </b-card>
        <b-card
          title="?matching"
          style="max-width: 50vw;"
          class="m-2"
        >
          <b-card-text>
            <b-badge variant="warning">
              sub
            </b-badge> Posts the 3 lowest unmatched secret sounds, as well as the percentage of sounds matched. Updates live with the community document. Used for the secret sound donation matching events
            <hr>
            <h6>Example Output:</h6>
            <p>The lowest unmatched sounds: $4.40, $5.11, $6.00 | Out of 228 sounds, 0 have been matched [~0.00%]</p>
          </b-card-text>
        </b-card>
        <b-card
          title="?whatsound"
          style="max-width: 50vw;"
          class="m-2"
        >
          <b-card-text>
            <b-badge variant="warning">
              sub
            </b-badge> Grabs the closest matching sound to your query. Can be done via the sound's amount: <tt>?whatsound 33.33</tt> OR the sound's name: <tt>?whatsound Oh baby</tt>
            <hr>
            <h6>Example Output:</h6>
            <p>The secret sound @ $33.33 is Oh baby a triple!</p>
            <p>Closest match found: Oh baby a triple! ($33.33)</p>
          </b-card-text>
        </b-card>
        <b-card
          title="?scores"
          style="max-width: 50vw;"
          class="m-2"
        >
          <b-card-text>
            <b-badge variant="success">
              mod/vip
            </b-badge> Grabs the current points standing in the SideQuest class house challenge
            <hr>
            <h6>Example Output:</h6>
            <p>Current standings: Fighter 0 | Cleric 0 | Mage 0 | Rogue 0</p>
          </b-card-text>
        </b-card>
      </b-col>
    </b-container>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Bokoblin Bot',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Information about the BokoblinBOT Twitch Bot'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Bokoblin Bot'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Information about the BokoblinBOT Twitch Bot'
        },
        { name: 'theme-color', content: '#ff5959' }

      ]
    }
  }
}
</script>
