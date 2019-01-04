<template>
  <footer :class="{ 'brdr-top-1 brdr-cl-secondary': isCheckoutPage }">
    <newsletter class=" flex brdr-bottom-1 brdr-cl-secondary" v-if="!isCheckoutPage"/>
    <div
      class="footer-links flex pt30 pb60 px40 bg-cl-dark"
      v-if="!isCheckoutPage"
    >
      <div class="container">
        <div class="row center-xs between-md">
          <div
            class="row m0 col-lg-7 col-md-8 col-xs-12 start-md between-md between-xs"
          >
            <div class="start-md">
              <h3 class="cl-sbc weight-500 uppercase h4">
                {{ $t('Help') }}
              </h3>
              <div class="mt15">
                <router-link class="cl-white" :to="localizedRoute('/about-us')" exact>
                  {{ $t('About us') }}
                </router-link>
              </div>
              <div class="mt15">
                <router-link class="cl-white" :to="localizedRoute('/returns')" exact>
                  {{ $t('Return policy') }}
                </router-link>
              </div>
              <div class="mt15">
                <router-link class="cl-white" :to="localizedRoute('/terms-and-conditions')" exact>
                  {{ $t('Terms and conditions') }}
                </router-link>
              </div>
              <div class="mt15">
                <router-link class="cl-white" :to="localizedRoute('/privacy-policy')" exact>
                  {{ $t('Privacy policy') }}
                </router-link>
              </div>
              <div class="mt15">
                <router-link class="cl-white" :to="localizedRoute('/faq')" exact>
                  {{ $t('FAQ') }}
                </router-link>
              </div>
            </div>
            <div class="start-md">
              <h3 class="cl-sbc weight-500 uppercase h4">
                {{ $t('Collections') }}
              </h3>
              <div class="mt15"
                   v-for="category in categories"
                   :key="category.slug"
                   v-if="category.product_count > 0 || category.children_data.length > 0">
                <router-link
                  class="cl-white"
                  :to="localizedRoute({ name: 'category', params: { id: category.id, slug: category.slug }})"
                >
                  {{ category.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="row social mt30">
            <a
              class="social-icon mx10 brdr-circle no-underline"
              href="https://www.facebook.com/soboredclub"
              :aria-label="$t('Go to Facebook')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="facebook icon" width="40" height="40" viewBox="0 0 40 40" fill="#BDBDBD">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a
              class="social-icon mx10 brdr-circle no-underline"
              href="https://www.instagram.com/soboredclub"
              :aria-label="$t('Go to Instagram')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="instagram icon" width="40" height="40" viewBox="0 0 40 40" fill="#BDBDBD">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row middle-xs bottom-links pb50">
        <div class="col-xs col-sm-12 end-xs cl-tertiary">
          <ul class="pl0 links" data-testid="bottomLinks">
            <li class="inline-flex">
              <language-switcher v-if="multistoreEnabled" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import CurrentPage from 'theme/mixins/currentPage'
import LanguageSwitcher from '../../LanguageSwitcher.vue'
import Newsletter from 'theme/components/core/blocks/Footer/Newsletter'

export default {
  mixins: [CurrentPage],
  name: 'MainFooter',
  computed: {
    multistoreEnabled () {
      return this.$store.state.config.storeViews.multistore
    },
    categories () {
      return this.$store.state.category.list.filter((op) => {
        return op.level === 2 // display only the root level (level =1 => Default Category)
      })
    }
  },
  components: {
    Newsletter,
    LanguageSwitcher
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-secondary: color(secondary);

footer {
  background: color(dark);
}

.icon {
  transition: 0.3s all;
}

.social-icon {
  width: 40px;
  height: 40px;
  &:hover,
  &:focus,
  &:active {
    .icon {
      fill: $color-secondary;
    }
  }
}
.links {
  list-style-type: none;
}

.bottom-links {
  @media (max-width: 767px) {
    padding: 0;
  }
}

.underline {
  &:hover {
    color: $color-secondary;
    &:after {
      background-color: $color-secondary;
    }
  }
}
.legal-entity-link {
  text-align: center;
  @media (min-width: 768px) {
    display: none;
  }
}

.privacy-policy-link {
  text-align: right;
  @media (min-width: 768px) {
    display: none;
  }
}

@media (max-width: 595px) {
  .no-mobile {
    display: none;
  }

  .footer-links {
    padding-bottom: 30px;
  }
}

@media (max-width: 767px) {
  .social {
    margin-top: 40px;
  }
}
</style>
