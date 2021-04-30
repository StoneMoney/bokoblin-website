<template>
  <div>
    <b-container>
      <h1 class="m-3">
        Donation Calculator
      </h1>
      <h4 class="m-3">
        No active marathon, using last marathon's donation total: {{ formatMoney(total) }}
      </h4>
      <h6 class="m-3">
        Powered by <a href="https://0rganics.org">0rganic's</a> original functions
      </h6>
    </b-container>
    <b-container>
      <table class="table">
        <tbody>
          <tr>
            <th scope="col">
              Type
            </th>
            <th scope="col">
              Previewed Total
            </th>
            <th scope="col">
              Donation Required
            </th>
          </tr>
          <template v-for="calc in calced">
            <tr :key="calc.name+calc.total">
              <td>{{ calc.name }}</td>
              <td>{{ formatMoney(calc.total) }}</td>
              <td>{{ formatMoney(calc.donation) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </b-container>
  </div>
</template>

<script>
export default {
//   async asyncData ({ $axios }) {
//     const total = (await $axios.$get('http://donate.zeldathon.net/total?unformatted=true'))
//     const inTotMin = total + 100
//     IMPORTANT, WHEN TAKING A TOTAL, MULTIPLY BY 100
//     return { total, inTotMin }
//   },
  data () {
    return {
      calced: [],
      total: 8788700,
      minimumDonation: 100
    }
  },
  mounted () {
    const fix = this.teamFixers(this.total)
    this.calced.push({
      name: 'Fixers',
      total: fix.tot,
      donation: fix.don
    })
    const palindrome = this.teamPalindrome(this.total)
    this.calced.push({
      name: 'Palindrome',
      total: palindrome.tot,
      donation: palindrome.don
    })
    const prime = this.primeHunters(this.total)
    this.calced.push({
      name: 'Prime',
      total: prime.tot,
      donation: prime.don
    })
    const fib = this.fibbonacci(this.total)
    this.calced.push({
      name: 'Fibbonacci',
      total: fib.tot,
      donation: fib.don
    })
    // const square = this.ncalc(this.total)
    // this.calced.push({
    //   name: 'Square',
    //   total: square.tot,
    //   donation: square.don
    // })
    // const cubic = this.ncube(this.total)
    // this.calced.push({
    //   name: 'Cubic',
    //   total: cubic.tot,
    //   donation: cubic.don
    // })
    const two = this.twoToTheN(this.total)
    this.calced.push({
      name: '2^n',
      total: two.tot,
      donation: two.don
    })
    const stepUp = this.stepdigitUp(this.total)
    this.calced.push({
      name: 'Stepdigit Up',
      total: stepUp.tot,
      donation: stepUp.don
    })
    const stepDown = this.stepdigitDown(this.total)
    this.calced.push({
      name: 'Stepdigit Down',
      total: stepDown.tot,
      donation: stepDown.don
    })
    const rep = this.repDigit(this.total)
    this.calced.push({
      name: 'Repdigit',
      total: rep.tot,
      donation: rep.don
    })
    const altDigit = this.altDigit(this.total)
    this.calced.push({
      name: 'Alternating Digits',
      total: altDigit.tot,
      donation: altDigit.don
    })
  },
  methods: {
    formatMoney (number, places, symbol, thousand, decimal) {
      number = number / 100 || 0
      places = !isNaN(places = Math.abs(places)) ? places : 2
      symbol = symbol !== undefined ? symbol : '$'
      thousand = thousand !== undefined ? thousand : ','
      decimal = decimal || '.'
      const negative = number < 0 ? '-' : ''
      const i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
      const j = (i.length) > 3 ? i.length % 3 : 0
      return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
    },
    isPalindrome (total) {
      total = total.toString()
      if (total === total.split('').reverse().join('')) {
        return true
      } else {
        return false
      }
    },
    teamPalindrome (total) {
      const holder = total
      while (true) {
        total++
        if (this.isPalindrome(total) === true) {
          if (this.toDollars(total - holder) > 1.00) {
            const tot = total
            const don = total - holder
            return { tot, don }
          }
        }
      }
    },
    teamFixers (total) {
      const cents = 100 - (total % 100)
      let tot = parseInt(total) + parseInt(cents) + this.minimumDonation
      let don = parseInt(cents) + this.minimumDonation
      if (don === 200) {
        tot = tot - 200
        don = 0
      }
      return { tot, don }
    },
    primeHunters (total) {
      const holder = total
      while (true) {
        total++
        if (this.isPrime3(total) === true) {
          if (this.toDollars(total - holder) > 1.00) {
            const tot = total
            const don = (total - holder)
            return { tot, don }
          }
        }
      }
    },
    altDigit (total) {
      const intAL = [parseInt((total + this.minimumDonation).toString().substr(0, 1)), parseInt((total + this.minimumDonation).toString().substr(1, 1)) - 1]
      let intAL1 = 1
      let intAL2 = intAL[0]
      let intALlen = (total + this.minimumDonation).toString().length
      while (intAL2 < (total + this.minimumDonation)) {
        intAL[1] = intAL[1] + 1
        if (intAL[1] === intAL[0]) {
          intAL[1] = intAL[1] + 1
        }
        if (intAL[1] >= 10) {
          intAL[0] = intAL[0] + 1
          intAL[1] = 0
          if (intAL[0] === 10) {
            intAL[0] = 1
            intALlen = intALlen + 1
          }
        }
        intAL2 = intAL[0]
        intAL1 = 1
        while (intAL2.toString().length < intALlen) {
          intAL2 = parseInt(intAL2.toString().concat(intAL[intAL1]))
          intAL1 = 1 - intAL1
        }
      }
      const tot = parseInt(intAL2)
      const don = tot - total
      return { tot, don }
    },
    stepdigitUp (total) {
      let intSUlen = (total + this.minimumDonation).toString().length
      let intSUstart = parseInt((total + this.minimumDonation).toString().substr(0, 1))
      let intSU1 = 0
      let intSU2 = 0
      intSUstart = intSUstart - 1
      let booSUerr = false
      while ((intSU1 < (total + this.minimumDonation)) && (booSUerr === false)) {
        intSUstart = intSUstart + 1
        if ((intSUstart + intSUlen) > 10) {
          intSUstart = 1
          intSUlen = intSUlen + 1
        }
        if (intSUlen === 10) {
          booSUerr = true
        }
        intSU2 = intSUstart
        intSU1 = intSUstart
        while (intSU1.toString().length < intSUlen) {
          intSU2 = intSU2 + 1
          intSU1 = intSU1.toString().concat(intSU2)
        }
      }
      const tot = intSU1
      const don = tot - total
      //   if (booSUerr === false) {
      //     locate('sutot', (intSUTot))
      //     locate('sudon', (intSUDon))
      //   }
      return { tot, don }
    },
    stepdigitDown (total) {
      let intSDlen = (total + this.minimumDonation).toString().length
      let intSDstart = parseInt((total + this.minimumDonation).toString().substr(0, 1))
      intSDstart = Math.max(intSDstart, (intSDlen - 1))
      let intSD1 = 0
      let intSD2 = 0
      intSDstart = intSDstart - 1
      let booSDerr = false
      while ((intSD1 < (total + this.minimumDonation)) && (booSDerr === false)) {
        intSDstart = intSDstart + 1
        if (intSDstart >= 10) {
          intSDlen = intSDlen + 1
          intSDstart = intSDlen - 1
        }
        if (intSDlen > 10) {
          booSDerr = true
        }
        intSD2 = intSDstart
        intSD1 = intSDstart
        while (intSD1.toString().length < intSDlen) {
          intSD2 = intSD2 - 1
          intSD1 = intSD1.toString().concat(intSD2)
        }
      }
      const tot = intSD1
      const don = tot - total
      //   if (booSDerr === false) {
      //     return { intSDTot, intSDDon }
      //   }
      return { tot, don }
    },
    repDigit (total) {
      let intRD1 = parseInt((total + this.minimumDonation).toString().substr(0, 1))
      let intRDlen = (total + this.minimumDonation).toString().length
      let intRD2 = intRD1
      while (intRD2.toString().length < intRDlen) {
        intRD2 = intRD2.toString().concat(intRD1)
      }
      while (parseInt(intRD2) < (total + this.minimumDonation)) {
        intRD1 = intRD1 + 1
        if (intRD1 === 10) {
          intRD1 = 1
          intRDlen = intRDlen + 1
        }
        intRD2 = intRD1
        while (intRD2.toString().length < intRDlen) {
          intRD2 = intRD2.toString().concat(intRD1)
        }
      }
      const tot = parseInt(intRD2)
      const don = tot - total
      return { tot, don }
    },
    twoToTheN (total) {
      let int2N1 = 1
      let int2N2 = 2
      while (int2N2 < (total + this.minimumDonation)) {
        int2N1 = int2N1 + 1
        int2N2 = Math.pow(2, int2N1)
      }
      const tot = int2N2
      const don = tot - total
      return { tot, don }
    },
    fibbonacci (total) {
      const arrFB = new Array(2)
      arrFB[1] = 1
      arrFB[2] = 1
      let intFB = 2
      while (arrFB[intFB] < (total + this.minimumDonation)) {
        intFB = intFB + 1
        arrFB[intFB] = arrFB[intFB - 2] + arrFB[intFB - 1]
      }
      const tot = arrFB[intFB]
      const don = tot - total
      return { tot, don }
    },
    isPrime3 (n) {
      if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) { return false }
      if (n % 2 === 0) { return (n === 2) }
      if (n % 3 === 0) { return (n === 3) }
      const m = Math.sqrt(n)
      for (let i = 5; i <= m; i += 6) {
        if (n % i === 0) { return false }
        if (n % (i + 2) === 0) { return false }
      }
      return true
    },
    ncube (total) {
      const workTot = total * 100
      const intSQ1 = Math.ceil(Math.pow((workTot + this.minimumDonation), 1 / 3))
      const tot = Math.pow(intSQ1, 3) / 100
      const don = tot - this.toDollars(workTot)
      return { tot, don }
    },
    ncalc (total) {
      const workTot = total * 100
      const intSQ1 = Math.ceil(Math.pow((workTot + this.minimumDonation), 0.5))
      const tot = Math.pow(intSQ1, 2) / 100
      const don = tot - this.toDollars(workTot)
      return { tot, don }
    },
    toCents (total) {
      total = Math.round(parseFloat(total.toString().replace(',', '')) * 100)
      return total
    },
    toCentsByMult (total) {
      return total * 100
    },
    toDollars (total) {
      total = total / 100
      return total
    }
  },
  head () {
    return {
      title: 'Tools - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin Calculator.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Tools - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin Calculator.'
        },
        { name: 'theme-color', content: '#ff5959' }

      ]
    }
  }
}
</script>
