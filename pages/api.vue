<template>
  <div class="m-2">
    <h1>Bokoblin.com API (BokoAPI)</h1>
    <p>BokoAPI is powered by Apollo and GraphQL, queries can be made from:</p>
    <a href="http://bokoblin.herokuapp.com/">http://bokoblin.herokuapp.com/</a>
    <p>
      Ex:
      <a href="http://bokoblin.herokuapp.com/?query={marathon(id: 1){full_name}}">http://bokoblin.herokuapp.com/?query={marathon(id: 1){full_name}}</a>
    </p>
    <h3>Schema:</h3>
    <p class="m-3">
      type Attendee {<br>
      &emsp;id: ID,<br>
      &emsp;name: String,<br>
      &emsp;rank: String,<br>
      &emsp;house: String,<br>
      &emsp;house_color: String<br>
      }<br>
      <br>
      type Game {<br>
      &emsp;id: ID,<br>
      &emsp;title: String,<br>
      &emsp;isZelda: Boolean,<br>
      &emsp;isEvent: Boolean<br>
      }<br>
      <br>
      type Charity {<br>
      &emsp;id: ID,<br>
      &emsp;slug: String,<br>
      &emsp;full_name: String,<br>
      &emsp;website: String,<br>
      &emsp;total: String<br>
      }<br>
      <br>
      type Marathon {<br>
      &emsp;id: ID,<br>
      &emsp;type: String,<br>
      &emsp;type_id: Int,<br>
      &emsp;slug: String,<br>
      &emsp;full_name: String,<br>
      &emsp;total: String,<br>
      &emsp;start_date: DateTime,<br>
      &emsp;stop_date: DateTime,<br>
      &emsp;playlist: String,<br>
      &emsp;charity: Charity,<br>
      &emsp;color: String<br>
      }<br>
      <br>
      type Filename {<br>
      &emsp;segment_id: ID,<br>
      &emsp;filename: String,<br>
      &emsp;note: String<br>
      }<br>
      <br>
      type Segment {<br>
      &emsp;id: ID,<br>
      &emsp;marathon: Marathon,<br>
      &emsp;game: Game,<br>
      &emsp;modifier: String,<br>
      &emsp;raised: String,<br>
      &emsp;start_time: DateTime,<br>
      &emsp;end_time: DateTime,<br>
      &emsp;vod: String,<br>
      &emsp;time_offset: Int,<br>
      &emsp;runners: [Attendee],<br>
      &emsp;filenames: [Filename]<br>
      }<br>
      type Query {<br>
      &emsp;attendees: [Attendee],<br>
      &emsp;attendee(id: Int!): Attendee,<br>
      &emsp;charities: [Charity],<br>
      &emsp;charity(id: Int!): Charity,<br>
      &emsp;games: [Game],<br>
      &emsp;game(id: Int!): Game,<br>
      &emsp;marathons(id: Int): [Marathon],<br>
      &emsp;marathon(id: Int!): Marathon,<br>
      &emsp;segments(method: String!, id: Int!): [Segment],<br>
      &emsp;segment(id: Int!): Segment<br>
      }
    </p>
  </div>
</template>

<script>
export default {
}
</script>
