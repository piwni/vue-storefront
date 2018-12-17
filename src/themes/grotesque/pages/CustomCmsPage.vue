<template>
  <div>
    <div class="bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs :routes="[{name: 'Home', route_link: '/'}]" :active-route="$props.title" />
        <h2 class="fs-big"> {{ $props.title }}</h2>
      </div>
    </div>

    <div class="container pt45 pb70">
      <div class="row">
        <div class="col-sm-4">
          <nav class="static-menu serif h4 mb35">
            <ul class="m0 p0">
              <li class="mb10" v-for="page in navigation" :key="page.id">
                <router-link :to="localizedRoute(page.link)" class="cl-accent">{{ page.title }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-sm-8 col-xs-12 static-content h4 lh35">
          <cms-data :identifier="$props.page" :type="'Page'" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CmsData from 'src/modules/magento-2-cms/components/CmsData'
import i18n from '@vue-storefront/i18n'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import CmsBlock from '../components/core/blocks/Cms/Block'

export default {
  components: {
    CmsBlock,
    CmsData,
    Breadcrumbs
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  created () {
    this.activeComponent = this.navigation.find(nav => nav.link === this.$route.path) ? this.navigation.find(nav => nav.link === this.$route.path).component : null
  },
  props: {
    title: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    }
  },
  methods: {
    setContent (component) {
      this.activeComponent = component
    }
  },
  data () {
    return {
      navigation: [
        { title: i18n.t('About us'), link: '/about-us' },
        { title: i18n.t('Size guide'), link: '/size-guide' },
        { title: i18n.t('Shipping'), link: '/shipping' },
        { title: i18n.t('Return policy'), link: '/returns' },
        { title: i18n.t('Terms and conditions'), link: '/terms-and-conditions' },
        { title: i18n.t('Privacy policy'), link: '/privacy-policy' },
        { title: i18n.t('FAQ'), link: '/faq' }
      ],
      activeComponent: null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $border-primary: color(primary, $colors-border);

  .static-menu {
  ul {
    list-style: none;
  }

  a::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $border-primary;
  }

  a:hover::after,
  .router-link-active::after {
    opacity: 0;
  }
  }

  .static-content {
  *:first-of-type {
    margin-top: 0;
  }
  }
</style>

<style lang="scss">
  .static-content {
    margin-top: -20px;
    h3 {
      margin-top: 40px;
      margin-bottom: 25px;
      @media (max-width: 767px) {
        margin-top: 35px;
        margin-bottom: 10px;
      }
    }
  }
</style>
