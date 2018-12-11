<template>
  <button
    type="button"
    :aria-label="$t('Open search panel')"
    class="bg-cl-transparent brdr-none inline-flex"
    @click="toggleSearchpanel"
    data-testid="openSearchPanel"
  >
    <i class="icon-search" />
  </button>
</template>

<script>
import SearchIcon from '@vue-storefront/core/compatibility/components/blocks/Header/SearchIcon'

export default {
  mixins: [SearchIcon]
}
</script>

<style scoped>
i {
  font-size: 36px;
  position: relative;
  left: 2px;
}
button {
  height: 54px;
  width: 54px;
}
</style>
