<template>
  <section class="main-banner w-100 bg-cl-th-accent cl-white">
    <router-link v-if="!button_text" :to="localizedRoute(link)" class="container w-100" v-lazy:background-image="image">
      <div class="row middle-xs center-xs">
        <div class="col-md-12 px10p" />
      </div>
    </router-link>

    <div v-if="button_text" class="container w-100" v-lazy:background-image="image">
      <div class="row middle-xs center-xs">
        <div class="col-md-12 px10p">
          <p
            v-if="subtitle"
            class="subtitle mb0 serif uppercase h3 align-center"
            data-testid="mainSliderSubtitle"
          >
            {{ subtitle }}
          </p>

          <h1
            v-if="title"
            class="title mt0 mb30 align-center" data-testid="mainSliderTitle">
            {{ title }}
          </h1>

          <div class="align-center inline-flex">
            <button-outline :link="link" color="light">
              {{ button_text }}
            </button-outline>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonOutline from 'theme/components/theme/ButtonOutline'

export default {
  name: 'FullBanner',
  props: {
    image: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    button_text: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    ButtonOutline
  },
  created () {

  }
}
</script>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-white: color(white);
.main-banner {

}
</style>
<style scoped>
h1 {
  font-size: 72px;
}
.main-banner {
  height: 640px;
}
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
a.container {
  display: block;
}
.row {
  height: 640px;
}
@media (max-width: 75em) {
  .main-banner {
    height: 400px;
  }
  .title {
    font-size: 50px;
  }
  .subtitle {
    font-size: 20px;
  }
  .row {
    height: 400px;
  }
}
@media (max-width: 64em) {
  .main-banner {
    height: 359px;
  }
  .title {
    font-size: 48px;
  }
  .subtitle {
    font-size: 18px;
  }
  .button {
    font-size: 16px;
  }
  .row {
    height: 359px;
  }
}
@media (max-width: 767px) {
  .main-banner {
    display: none;
  }
}
</style>
