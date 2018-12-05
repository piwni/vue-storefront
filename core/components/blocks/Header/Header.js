import rootStore from '@vue-storefront/store'

export default {
  name: 'Header',
  computed: {
    multistoreEnabled () {
      return rootStore.state.config.storeViews.multistore
    }
  }
}
