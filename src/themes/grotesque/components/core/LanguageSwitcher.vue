<template>
  <div>
    <a href="#" class="store-locale" @click.prevent="$bus.$emit('modal-show', 'modal-switcher')">
      <i class="material-icons">language</i>
      {{ langFull }}
    </a>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/store/lib/multistore'

export default {
  data () {
    const storeView = currentStoreView()
    return {
      country: storeView.i18n.fullCountryName,
      lang: storeView.i18n.defaultLanguage,
      currency: storeView.i18n.currencyCode,
      langFull: storeView.i18n.fullLanguageName
    }
  }
}
</script>

<style lang="scss" scoped>
  .store-locale i {
    font-size: 16px;
    position: relative;
    top: -2px;
    vertical-align: middle;
    margin-right: 2px;
  }
</style>
