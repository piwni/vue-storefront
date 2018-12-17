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
    { name: 'shipping', path: '/shipping', component: CustomCmsPage, props: {page: 'wysylka', title: 'Wysyłka'} },
    { name: 'returns', path: '/returns', component: CustomCmsPage, props: {page: 'zwroty', title: 'Returns and refunds'} },
    { name: 'faq', path: '/faq', component: CustomCmsPage, props: {page: 'faq', title: 'FAQ'} },
    { name: 'terms', path: '/terms-and-conditions', component: CustomCmsPage, props: {page: 'regulamin', title: 'Terms of use'} },
    { name: 'privacy-policy', path: '/privacy-policy', component: CustomCmsPage, props: {page: 'polityka-prywatnosci', title: 'Privacy policy'} },
    { name: 'about-us', path: '/about-us', component: CustomCmsPage, props: {page: 'o-nas', title: 'About us'} },
    { name: 'size-guide', path: '/size-guide', component: CustomCmsPage, props: {page: 'tabela-rozmiarow', title: 'Size guide'} }
  ]
  router.addRoutes(defaultRoutes)

  let deRoutes = [
    { name: 'de-shipping', path: '/de/shipping', component: CustomCmsPage, props: {page: 'wysylka', title: 'Shipping'} },
    { name: 'de-returns', path: '/de/returns', component: CustomCmsPage, props: {page: 'zwroty', title: 'Rücksendungen und Rückerstattungen'} },
    { name: 'de-faq', path: '/de/faq', component: CustomCmsPage, props: {page: 'faq', title: 'FAQ'} },
    { name: 'de-terms', path: '/de/terms-and-conditions', component: CustomCmsPage, props: {page: 'zusammenarbeit', title: 'Zusammenarbeit'} },
    { name: 'de-privacy-policy', path: '/de/privacy-policy', component: CustomCmsPage, props: {page: 'polityka-prywatnosci', title: 'Privacy policy'} },
    { name: 'de-about-us', path: '/de/about-us', component: CustomCmsPage, props: {page: 'o-nas', title: 'Über So Bored Club'} },
    { name: 'de-size-guide', path: '/de/size-guide', component: CustomCmsPage, props: {page: 'tabela-rozmiarow', title: 'Größentabelle'} }
  ]
  router.addRoutes(deRoutes)

  let plRoutes = [
    { name: 'pl-shipping', path: '/pl/shipping', component: CustomCmsPage, props: {page: 'wysylka', title: 'Wysyłka'} },
    { name: 'pl-returns', path: '/pl/returns', component: CustomCmsPage, props: {page: 'zwroty', title: 'Zwroty i wymiany'} },
    { name: 'pl-faq', path: '/pl/faq', component: CustomCmsPage, props: {page: 'faq', title: 'FAQ'} },
    { name: 'pl-terms', path: '/pl/terms-and-conditions', component: CustomCmsPage, props: {page: 'regulamin', title: 'Regulamin zakupów'} },
    { name: 'pl-privacy-policy', path: '/pl/privacy-policy', component: CustomCmsPage, props: {page: 'polityka-prywatnosci', title: 'Polityka prywatności'} },
    { name: 'pl-about-us', path: '/pl/about-us', component: CustomCmsPage, props: {page: 'o-nas', title: 'O Grotesque'} },
    { name: 'pl-size-guide', path: '/pl/size-guide', component: CustomCmsPage, props: {page: 'tabela-rozmiarow', title: 'Tabela rozmiarów'} }
  ]
  router.addRoutes(plRoutes)
}
