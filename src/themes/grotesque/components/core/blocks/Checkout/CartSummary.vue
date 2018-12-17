<template>
  <div class="cart-summary-container"
       :class="[{ 'mobile-expanded': mobileExpanded }]">
    <div class="brdr-cl-primary pb60">
      <div class="cart-summary-header-container" @click="mobileExpand">
        <h3 class="cl-accent mt50 summary-title">
          {{ $t('Order Summary') }}

          <i class="material-icons float-right" v-if="!mobileExpanded">expand_more</i>
          <i class="material-icons float-right" v-if="mobileExpanded">expand_less</i>
        </h3>
      </div>
      <product v-for="product in productsInCart" :key="product.sku" :product="product"/>
      <div v-if="productsInCart && productsInCart.length" class="checkout pt10 serif cl-accent">

        <div v-for="(segment, index) in totals" :key="index" class="row pt15 pb20 " v-if="segment.code !== 'grand_total'">
          <div class="col-xs cl-accent">
            {{ segment.title }}
          </div>
          <div v-if="segment.value != null" class="col-xs align-right cl-accent h4">
            {{ segment.value | price }}
          </div>
        </div>

        <div class="row pt20 pb20 weight-400 h3" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
          <div class="col-xs">
            {{ segment.title }}
          </div>
          <div class="col-xs align-right">
            {{ segment.value | price }}
          </div>
        </div>
      </div>
    </div>
    <div class="py50 brdr-top-1" v-if="false">
      <h4 class="h3 m0">
        {{ $t('Safety') }}
      </h4>
      <p class="cl-tertiary lh20">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </p>
      <h4 class="h3 mb0">
        {{ $t('Shipping') }}
      </h4>
      <p class="cl-tertiary lh20">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </p>
      <h4 class="h3 mb0">
        {{ $t('Returns') }}
      </h4>
      <p class="cl-tertiary lh20">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </p>
    </div>
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import Product from './Product'

export default {
  components: {
    Product
  },
  data () {
    return {
      mobileExpanded: false
    }
  },
  methods: {
    mobileExpand () {
      this.mobileExpanded = !this.mobileExpanded
    }
  },
  mixins: [CartSummary]
}
</script>

<style lang="scss" scoped>
  .summary-title {
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }

  .cart-summary-container {
    .cart-summary-header-container {
      h3 i {
        display: none;
      }
    }
  }
  @media (max-width: 991px) {
    .cart-summary-container {
      overflow: hidden;
      max-height: 106px;
      height: auto;
      margin-left: 20px;
      margin-right: 20px;

      &.mobile-expanded {
        max-height: none;
      }

      .cart-summary-header-container {
        cursor: pointer;
        margin-top: -25px;
        padding-top: 0;
        margin-bottom: -45px;
        padding-bottom: 70px;

        h3 i {
          margin-top: 2px;
          font-size: 32px;
          display: inline-block;
        }
      }
    }
  }
  @media (max-width: 767px) {
    .cart-summary-container {
      max-height: 70px;

      &.mobile-expanded {
        max-height: none;
      }

      .cart-summary-header-container {
        margin-top: -67px;
        padding-top: 16px;
        margin-bottom: -23px;
        padding-bottom: 23px;
      }
    }
  }

</style>
