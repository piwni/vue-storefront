import { setupMultistoreRoutes } from '@vue-storefront/store/lib/multistore'
import { CustomCmsPage } from './router/asyncRoutes'
import routes from './router'

export default function (app, router, store, config, ssrContext) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  router.addRoutes(routes)

  let defaultRoutes = [
    { name: 'returns', path: '/returns', component: CustomCmsPage, props: {page: 'returns-and-refunds', title: 'Returns and refunds'} },
    { name: 'affiliation', path: '/affiliation', component: CustomCmsPage, props: {page: 'affiliation', title: 'Affiliation and collaboration'} },
    { name: 'faq', path: '/faq', component: CustomCmsPage, props: {page: 'faq', title: 'FAQ'} },
    { name: 'terms', path: '/terms-and-conditions', component: CustomCmsPage, props: {page: 'terms-and-conditions', title: 'Terms of use'} },
    { name: 'privacy-policy', path: '/privacy-policy', component: CustomCmsPage, props: {page: 'privacy-policy', title: 'Privacy policy'} },
    { name: 'about-us', path: '/about-us', component: CustomCmsPage, props: {page: 'about-us', title: 'About us'} }
  ]
  router.addRoutes(defaultRoutes)

  let deRoutes = [
    { name: 'de-returns', path: '/de/returns', component: CustomCmsPage, props: {page: 'ruckgaberecht', title: 'Rücksendungen und Rückerstattungen'} },
    { name: 'de-affiliation', path: '/de/affiliation', component: CustomCmsPage, props: {page: 'affiliation', title: 'Affiliation and collaboration'} },
    { name: 'de-faq', path: '/de/faq', component: CustomCmsPage, props: {page: 'faq-de', title: 'FAQ'} },
    { name: 'de-terms', path: '/de/terms-and-conditions', component: CustomCmsPage, props: {page: 'zusammenarbeit', title: 'Terms of use'} },
    { name: 'de-privacy-policy', path: '/de/privacy-policy', component: CustomCmsPage, props: {page: 'privacy-policy', title: 'Privacy policy'} },
    { name: 'de-about-us', path: '/de/about-us', component: CustomCmsPage, props: {page: 'uber-uns', title: 'Über So Bored Club'} }
  ]
  router.addRoutes(deRoutes)

  let plRoutes = [
    { name: 'pl-returns', path: '/pl/returns', component: CustomCmsPage, props: {page: 'zwroty-i-wymiany', title: 'Zwroty i wymiany'} },
    { name: 'pl-affiliation', path: '/pl/affiliation', component: CustomCmsPage, props: {page: 'affiliation', title: 'Affiliation and collaboration'} },
    { name: 'pl-faq', path: '/pl/faq', component: CustomCmsPage, props: {page: 'faq', title: 'FAQ'} },
    { name: 'pl-terms', path: '/pl/terms-and-conditions', component: CustomCmsPage, props: {page: 'regulamin', title: 'Regulamin zakupów'} },
    { name: 'pl-privacy-policy', path: '/pl/privacy-policy', component: CustomCmsPage, props: {page: 'polityka-prywatnosci', title: 'Polityka prywatności'} },
    { name: 'pl-about-us', path: '/pl/about-us', component: CustomCmsPage, props: {page: 'o-nas', title: 'O So Bored Club'} }
  ]
  router.addRoutes(plRoutes)
}
