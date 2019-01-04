<template>
  <div class="sidebar-menu fixed mw-100 bg-cl-sbc" :class="{ active: isOpen }">
    <div class="row brdr-bottom-1 brdr-cl-bg-sbc">
      <div class="col-xs" v-if="submenu.depth">
        <sub-btn type="back" class="bg-cl-transparent brdr-none" />
      </div>
      <div class="col-xs">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="w-100 inline-flex end-xs bg-cl-transparent brdr-none p0 close-btn cl-black"
          @click="closeMenu"
        >
          <i class="material-icons p15">close</i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 h4 serif">
        <ul class="p0 m0 relative sidebar-menu__list" :style="mainListStyles">
          <li @click="closeMenu" clatasss="brdr-bottom-1">
            <router-link
              class="block px25 py20 cl-black no-underline"
              :to="localizedRoute('/')"
              exact
            >
              {{ $t('Home') }}
            </router-link>
          </li>
          <li
            class="flex"
            :key="category.slug"
            @click="closeMenu"
            v-for="category in categories"
            v-if="category.product_count > 0 || category.children_data.length > 0"
          >
            <sub-btn
              class="bg-cl-transparent brdr-none fs-medium"
              :id="category.id"
              :name="category.name"
              v-if="category.children_data.length > 0"
              @click.native="activeSubMenu = category.id"
            />
            <router-link
              v-else
              class="px25 py20 cl-black no-underline col-xs"
              :to="localizedRoute({ name: 'category', params: { id: category.id, slug: category.slug }})"
            >
              {{ category.name }}
            </router-link>

            <sub-category
              v-show="activeSubMenu === category.id"
              :category-links="category.children_data"
              :id="category.id"
              :parent-slug="category.slug"
            />
          </li>
          <li @click="closeMenu">
            <router-link
              class="block px25 py20 cl-accent no-underline fs-medium-small"
              :to="localizedRoute('/about-us')"
              exact
            >
              {{ $t('About us') }}
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link
              class="block px25 py20 cl-accent no-underline fs-medium-small"
              :to="localizedRoute('/faq')"
              exact
            >
              {{ $t('FAQ') }}
            </router-link>
          </li>
          <li @click="closeMenu" class="flex">
            <sub-btn
              v-if="currentUser"
              :name="$t('My account')"
              class="bg-cl-transparent brdr-none fs-medium-small"
            />
            <sub-category
              v-if="currentUser"
              :my-account-links="myAccountLinks"
              :id="'foo'"
            />
            <a
              v-if="!currentUser"
              href="#"
              @click.prevent="login"
              class="block w-100 px25 py20 cl-accent no-underline fs-medium-small"
            >
              {{ $t('My account') }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="sidebar-lang-switcher">
      <a href="#" class="store-locale" @click="closeMenu" @click.prevent="$bus.$emit('modal-show', 'modal-switcher')">
        {{ langFull }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import i18n from '@vue-storefront/i18n'

import SidebarMenu from '@vue-storefront/core/compatibility/components/blocks/SidebarMenu/SidebarMenu'
import SubBtn from 'theme/components/core/blocks/SidebarMenu/SubBtn'
import SubCategory from 'theme/components/core/blocks/SidebarMenu/SubCategory'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'

export default {
  components: {
    SubCategory,
    SubBtn
  },
  mixins: [SidebarMenu],
  data () {
    const storeView = currentStoreView()
    return {
      langFull: storeView.i18n.fullLanguageName,
      activeSubMenu: null,
      myAccountLinks: [
        {
          id: 1,
          name: i18n.t('My profile'),
          url: '/my-account'
        },
        {
          id: 2,
          name: i18n.t('My shipping details'),
          url: '/my-account/shipping-details'
        },
        {
          id: 3,
          name: i18n.t('My newsletter'),
          url: '/my-account/newsletter'
        },
        {
          id: 4,
          name: i18n.t('My orders'),
          url: '/my-account/orders'
        },
        {
          id: 5,
          name: i18n.t('My loyalty card'),
          url: '#'
        },
        {
          id: 6,
          name: i18n.t('My product reviews'),
          url: '#'
        }
      ]
    }
  },
  computed: {
    mainListStyles () {
      return this.submenu.depth ? `transform: translateX(${this.submenu.depth * 100}%)` : false
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      currentUser: state => state.user.current
    })
  },
  methods: {
    login () {
      this.$bus.$emit('modal-show', 'modal-signup')
      this.$router.push({ name: 'my-account' })
    }
  }
}
</script>

<style lang="scss">
@import "~theme/css/animations/transitions";
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$bg-secondary: color(secondary, $colors-background);
$color-gainsboro: color(gainsboro);
$color-matterhorn: color(matterhorn);
$color-mine-shaft: color(mine-shaft);
$transparent-black: color(transparent-black);

.sidebar-menu {
  height: 100vh;
  width: 350px;
  top: 0;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  transform: translateX(-100%);
  z-index: 3;
  transition: transform $duration-main $motion-main;

  @media (max-width: 767px) {
    width: 100vh;
  }

  &.active {
    transform: translateX(0);
  }

  &__list {
    transition: transform $duration-main $motion-main;
  }

  ul {
    list-style-type: none;
  }

  li {
    &:hover,
    &:focus {
      background-color: $transparent-black;
    }
    &.bg-cl-primary {
      &:hover,
      &:focus {
        background-color: $transparent-black;
      }
    }
    a {
      color: black;
    }
  }

  button {
    color: black;
    a {
      color: black;
    }
    i {
      color: black;
    }
  }

  .close-btn {
    i {
      color: black;
    }
    &:hover,
    &:focus {
      i {
        color: black;
      }
    }
  }

  .sidebar-lang-switcher {
    background: #000;
    padding: 20px 25px;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
