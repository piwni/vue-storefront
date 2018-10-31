<template>
  <div id="home">
    <main-slider />
  </div>
</template>

<script>
// Core pages
import Home from '@vue-storefront/core/pages/Home'

// Theme core components
import MainSlider from 'theme/components/core/blocks/MainSlider/MainSlider'

export default {
  mixins: [Home],
  components: {
    MainSlider
  },
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  }
}
</script>
