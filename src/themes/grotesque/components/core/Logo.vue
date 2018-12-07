<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline inline-flex">
    <img
      :width="width"
      :height="height"
      src="/assets/logo.svg"
      alt="Grotesque logo"
      class="hidden-xs"
    >
    <img
      :width="mobileWidth"
      :height="mobileHeight"
      src="/assets/logo-icon.svg"
      alt="Grotesque logo"
      class="visible-xs"
    >

  </router-link>
</template>

<script>
export default {
  props: {
    width: {
      type: [String, Number],
      required: true
    },
    height: {
      type: [String, Number],
      required: true
    },
    mobileWidth: {
      type: [String, Number],
      required: true
    },
    mobileHeight: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
