<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <section class="bg-cl-white px20 product-top-section">
      <div class="container">
        <section class="row m0 between-xs">
          <div class="col-xs-12 col-md-7 center-xs middle-xs image">
            <product-gallery
              :gallery="gallery"
              :offline="offlineImage"
              :configuration="configuration"
              :product="product"
            />
          </div>
          <div class="col-xs-12 col-md-5 data">
            <breadcrumbs
              class="pt40 pb20 hidden-xs"
              :routes="breadcrumbs.routes"
              :active-route="breadcrumbs.name"
            />
            <h1 class="mb20 mt0 cl-mine-shaft product-name" data-testid="productName" itemprop="name">
              {{ product.name | htmlDecode }}
            </h1>
            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="currentStore.i18n.currencyCode">
              <meta itemprop="price" :content="parseFloat(product.priceInclTax).toFixed(2)">
              <div
                class="mb40 price serif"
                v-if="product.type_id !== 'grouped'"
              >
                <div
                  class="h3 cl-secondary"
                  v-if="product.special_price && product.priceInclTax && product.originalPriceInclTax"
                >
                  <span class="h2 cl-mine-shaft weight-700">
                    {{ product.priceInclTax * product.qty | price }}
                  </span>&nbsp;
                  <span class="price-original h3">
                    {{ product.originalPriceInclTax * product.qty | price }}
                  </span>
                </div>
                <div
                  class="h2 cl-mine-shaft weight-700"
                  v-if="!product.special_price && product.priceInclTax"
                >
                  {{ product.priceInclTax * product.qty | price }}
                </div>
              </div>
              <div
                class="cl-primary variants"
                v-if="product.type_id =='configurable' && !loading"
              >
                <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                  {{ product.errors | formatProductMessages }}
                </div>
                <div
                  class="h5"
                  v-for="(option, index) in product.configurable_options"
                  v-if="(!product.errors || Object.keys(product.errors).length === 0) && Object.keys(configuration).length > 0"
                  :key="index"
                >
                  <div class="row top-xs m0 pt15 pb40 variants-wrapper">
                    <div v-if="option.label == 'Color'">
                      <color-selector
                        v-for="(c, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(c)"
                        :key="i"
                        :id="c.id"
                        :label="c.label"
                        context="product"
                        :code="option.attribute_code"
                        :class="{ active: c.id == configuration[option.attribute_code].id }"
                      />
                    </div>
                    <div class="sizes" v-else-if="option.label == 'Size'">
                      <size-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(s)"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"
                        class="mr10 mb10"
                        :class="{ active: s.id == configuration[option.attribute_code].id }"
                        v-focus-clean
                      />
                    </div>
                    <div :class="option.attribute_code" v-else>
                      <generic-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(s)"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"
                        class="mr10 mb10"
                        :class="{ active: s.id == configuration[option.attribute_code].id }"
                        v-focus-clean
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <product-links
              v-if="product.type_id =='grouped' && !loading"
              :products="product.product_links"
            />
            <product-bundle-options
              v-if="product.bundle_options && product.bundle_options.length > 0 && !loading"
              :product="product"
            />
            <product-custom-options
              v-else-if="product.custom_options && product.custom_options.length > 0 && !loading"
              :product="product"
            />
            <div class="row m0">
              <add-to-cart
                :product="product"
                class="col-xs-12 col-sm-4 col-md-6"
              />
            </div>

            <div class="short-description-wrapper pt20 pb50" itemprop="description">
              <div class="accordeon">
                <div class="accordeon-panel" :class="{ active: descOpen }">
                  <div class="title-wrapper" @click="showDesc()">
                    {{ $t('Details') }}
                    <i class="material-icons float-right" v-if="!descOpen">expand_more</i>
                    <i class="material-icons float-right" v-if="descOpen">expand_less</i>
                  </div>
                  <div class="content-wrapper">
                    <div
                      class="content-inner lh30 h5"
                      v-html="sbc_desc"
                    />
                  </div>
                </div>
                <div class="accordeon-panel" :class="{ active: sizingOpen }">
                  <div class="title-wrapper" @click="showSizing()">
                    {{ $t('Size guide') }}
                    <i class="material-icons float-right" v-if="!sizingOpen">expand_more</i>
                    <i class="material-icons float-right" v-if="sizingOpen">expand_less</i>
                  </div>
                  <div class="content-wrapper">
                    <div
                      class="content-inner lh30 h5"
                      v-html="sbc_sizing"
                    />
                  </div>
                </div>
                <div class="accordeon-panel" :class="{ active: paymentOpen }">
                  <div class="title-wrapper" @click="showPayment()">
                    {{ $t('Payment') }}
                    <i class="material-icons float-right" v-if="!paymentOpen">expand_more</i>
                    <i class="material-icons float-right" v-if="paymentOpen">expand_less</i>
                  </div>
                  <div class="content-wrapper">
                    <div
                      class="content-inner lh30 h5"
                      v-html="sbc_payment"
                    />
                  </div>
                </div>
                <div class="accordeon-panel" :class="{ active: shippingOpen }">
                  <div class="title-wrapper" @click="showShipping()">
                    {{ $t('Shipping') }}
                    <i class="material-icons float-right" v-if="!shippingOpen">expand_more</i>
                    <i class="material-icons float-right" v-if="shippingOpen">expand_less</i>
                  </div>
                  <div class="content-wrapper">
                    <div
                      class="content-inner lh30 h5"
                      v-html="sbc_shipping"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <div class="bg-cl-light-gray">
      <section class="container px15 pt50 pb35 cl-accent details">
        <div
          class="h4 details-wrapper details-wrapper--open"
        >
          <div class="row between-md m0">
            <div class="col-xs-12 col-sm-10 col-sm-offset-1">
              <div
                class="lh30 h5"
                v-html="product.description"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

    <related-products
      type="upsell"
      :heading="$t('We found other products you might like')"
    />
  </div>
</template>

<script>
import Product from '@vue-storefront/core/pages/Product'
import VueOfflineMixin from 'vue-offline/mixin'
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue'
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import GenericSelector from 'theme/components/core/GenericSelector'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductTile from 'theme/components/core/ProductTile.vue'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import ProductGallery from 'theme/components/core/ProductGallery'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import focusClean from 'theme/components/theme/directives/focusClean'

export default {
  components: {
    AddToCart,
    Breadcrumbs,
    ColorSelector,
    GenericSelector,
    ProductAttribute,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductGallery,
    ProductLinks,
    ProductTile,
    PromotedOffers,
    RelatedProducts,
    Reviews,
    SizeSelector
  },
  mixins: [Product, VueOfflineMixin],
  data () {
    return {
      detailsOpen: true,
      descOpen: true,
      sizingOpen: false,
      shippingOpen: false,
      paymentOpen: false
    }
  },
  directives: { focusClean },
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  },
  created () {
    let sizingMatch = this.product.short_description.indexOf('<div class="sizing">') + 20
    this.sbc_sizing = this.product.short_description.substr(sizingMatch, this.product.short_description.indexOf('</div>', sizingMatch) - sizingMatch)

    let descMatch = this.product.short_description.indexOf('<div class="description">') + 25
    this.sbc_desc = this.product.short_description.substr(descMatch, this.product.short_description.indexOf('</div>', descMatch) - descMatch)

    let shippingMatch = this.product.short_description.indexOf('<div class="shipping">') + 22
    this.sbc_shipping = this.product.short_description.substr(shippingMatch, this.product.short_description.indexOf('</div>', shippingMatch) - shippingMatch)

    let paymentMatch = this.product.short_description.indexOf('<div class="payment">') + 21
    this.sbc_payment = this.product.short_description.substr(paymentMatch, this.product.short_description.indexOf('</div>', paymentMatch) - paymentMatch)
  },
  updated () {
    let sizingMatch = this.product.short_description.indexOf('<div class="sizing">') + 20
    this.sbc_sizing = this.product.short_description.substr(sizingMatch, this.product.short_description.indexOf('</div>', sizingMatch) - sizingMatch)

    let descMatch = this.product.short_description.indexOf('<div class="description">') + 25
    this.sbc_desc = this.product.short_description.substr(descMatch, this.product.short_description.indexOf('</div>', descMatch) - descMatch)

    let shippingMatch = this.product.short_description.indexOf('<div class="shipping">') + 22
    this.sbc_shipping = this.product.short_description.substr(shippingMatch, this.product.short_description.indexOf('</div>', shippingMatch) - shippingMatch)

    let paymentMatch = this.product.short_description.indexOf('<div class="payment">') + 21
    this.sbc_payment = this.product.short_description.substr(paymentMatch, this.product.short_description.indexOf('</div>', paymentMatch) - paymentMatch)
  },
  methods: {
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    showSizing () {
      this.descOpen = false
      this.shippingOpen = false
      this.paymentOpen = false

      this.sizingOpen = !this.sizingOpen
    },
    showDesc () {
      this.shippingOpen = false
      this.sizingOpen = false
      this.paymentOpen = false

      this.descOpen = !this.descOpen
    },
    showShipping () {
      this.descOpen = false
      this.sizingOpen = false
      this.paymentOpen = false

      this.shippingOpen = !this.shippingOpen
    },
    showPayment () {
      this.descOpen = false
      this.sizingOpen = false
      this.shippingOpen = false

      this.paymentOpen = !this.paymentOpen
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('The product is out of stock and cannot be added to the cart!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('No such configuration for the product. Please do choose another combination of attributes.'),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);

.breadcrumbs {
  @media (max-width: 767px) {
    margin: 15px 0;
    padding: 15px 0 0 15px;
  }
}

.error {
  color: red;
  font-weight: bold;
  padding-bottom: 15px;
}
.data {
  @media (max-width: 767px) {
    border-bottom: 1px solid $bg-secondary;
  }
}

.image {
  @media (max-width: 1023px) {
    margin-bottom: 20px;
  }
}

.product-name {
  font-size: 32px;
  @media (max-width: 767px) {
    font-size: 28px;
  }
}

.price {
  .h2, .h3 {
    font-size: 16px;
  }
  @media (max-width: 767px) {
    color: $color-primary;
  }
}

.variants-label {
  @media (max-width: 767px) {
    font-size: 14px;
  }
}

.variants-wrapper {
  @media (max-width: 767px) {
    padding-bottom: 30px;
  }

 .sizes {
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .size-guide {
    height: 40px;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
    }
  }
}

.product-top-section {
  @media (max-width: 767px) {
    padding: 0;
    background-color: $color-white;
  }
}

.add-to-buttons {
  @media (max-width: 767px) {
    padding-top: 30px;
    margin-bottom: 40px;
  }
}

.details {
  @media (max-width: 767px) {
    padding: 50px 15px 15px;
  }
}

.details-title {
  padding: 0 8px;

  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0;
  }
}

.details-wrapper {
  text-align: center;

  @media (max-width: 767px) {
    position: relative;
    max-height: 140px;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  &--open {
    max-height: none;
  }
}

.details-overlay {
  @media (max-width: 767px) {
    position: absolute;
    height: 75%;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: linear-gradient(rgba($color-white, 0), rgba($color-white, 1));
    &.hidden {
      display: none;
    }
  }
}

.price-original {
  text-decoration: line-through;
}

.action {
  &:hover {
    color: $color-tertiary;
  }
}

.attributes {
  list-style-type: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.product-image {
  mix-blend-mode: multiply;
  width: 460px;
}

.qty-input {
  border-style: solid;
  border-width: 0 0 1px 0;
  width: 90px;
}

.qty-label {
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
}

</style>

<style lang="scss">
.sbc-detailed-description {
  max-width: 800px;
  margin: 0 auto;

  .row {
    margin-top: 20px;
  }
  h2 {
    font-size: 20px;
    text-transform: uppercase;
  }
  p {
    font-size: 15px;
    line-height: 1.6;
  }

  .sbc-detailed-inner {
    text-align: left;

    h3 {
      font-size: 16px;
    }
  }
}
</style>
