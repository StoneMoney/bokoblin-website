<template>
  <div>
    <b-container class="m-3 mx-auto">
      <h1>Support Bokoblin</h1>
      <h3>Patron</h3>
      <p>
        Bokoblin is hosted out-of-pocket by StoneMoney, if you wish to support the project by chipping in for hosting, domain, and server costs you can do so on their Patreon page. Some goals have been set up as well, should they be met, Bokoblin can expand to accomodate even more!
      </p>
      <p>
        We also have a merch store available, get your very own Bokoskull shirt or hoodie! Approximately $2 from each sale goes to server costs (the remainder is manufacturing costs, and streamlabs' cut)
      </p>
      <b-container class="row">
        <b-button variant="warning" href="https://www.patreon.com/stonemoney" class="mr-1">
          Support on Patreon
        </b-button>
        <b-button variant="danger" href="https://streamlabs.com/bokoblinbot/merch" class="mr-1">
          Purchase Merch
        </b-button>
      </b-container>
      <h3 class="mt-3">
        Archiver
      </h3>
      <p>If you would like to assist in archiving data for future events, please join the Doc Team discord!</p>
      <b-button variant="primary" href="https://discord.gg/bUjNJ9j" class="mb-1">
        Our Discord
      </b-button>
      <h3 class="mt-3">
        Developer
      </h3>
      <p>The Bokoblin front-end is open source and welcome to PRs on Github!</p>
      <b-button variant="primary" href="https://github.com/StoneMoney/bokoblin-website" class="mb-1">
        Github Repo
      </b-button>
      <h3 class="mt-3">
        Feedback
      </h3>
      <p>If you have feedback, feel free to send it to <a href="mailto:feedback@stone.money">feedback@stone.money</a> or DM Stone on Discord</p>
      <b-button variant="primary" href="mailto:feedback@stone.money" class="mb-1">
        Email Us!
      </b-button>
    </b-container>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Support Bokoblin'
    }
  }
}
</script>
