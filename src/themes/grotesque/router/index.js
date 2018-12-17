import Home from 'theme/pages/Home.vue'
import PageNotFound from 'theme/pages/PageNotFound.vue'
import ErrorPage from 'theme/pages/Error.vue'
import store from '@vue-storefront/store'
import Product from 'theme/pages/Product.vue'
import Category from 'theme/pages/Category.vue'
import { Checkout, MyAccount, Static } from './asyncRoutes'
import CmsPage from 'theme/pages/CmsPage.vue'

let routes = [
  { name: 'home', path: '/', component: Home, alias: '/pwa.html' },
  { name: 'checkout', path: '/checkout', component: Checkout },
  { name: 'legal', path: '/legal', component: Static, props: {page: 'lorem', title: 'Legal Notice'}, meta: {title: 'Legal Notice', description: 'Legal Notice - example of description usage'} },
  { name: 'privacy', path: '/privacy', component: Static, props: {page: 'lorem', title: 'Privacy'} },
  { name: 'magazine', path: '/magazine', component: Static, props: {page: 'lorem', title: 'Magazine'} },
  { name: 'sale', path: '/sale', component: Static, props: {page: 'lorem', title: 'Sale'} },
  { name: 'order-tracking', path: '/order-tracking', component: Static, props: {page: 'lorem', title: 'Track my Order'} },
  { name: 'my-account', path: '/my-account', component: MyAccount },
  { name: 'my-shipping-details', path: '/my-account/shipping-details', component: MyAccount, props: {activeBlock: 'MyShippingDetails'} },
  { name: 'my-newsletter', path: '/my-account/newsletter', component: MyAccount, props: {activeBlock: 'MyNewsletter'} },
  { name: 'my-orders', path: '/my-account/orders', component: MyAccount, props: {activeBlock: 'MyOrders'} },
  { name: 'my-order', path: '/my-account/orders/:orderId', component: MyAccount, props: {activeBlock: 'MyOrder'} },
  { name: 'my-recently-viewed', path: '/my-account/recently-viewed', component: MyAccount, props: {activeBlock: 'MyRecentlyViewed'} },
  { name: 'order-from-catalog', path: '/order-from-catalog', component: Static, props: {page: 'lorem', title: 'Order from catalog'} },
  { name: 'contact', path: '/contact', component: Static, props: {page: 'contact', title: 'Contact'} },
  { name: 'page-not-found', path: '/page-not-found', component: PageNotFound },
  { name: 'error', path: '/error', component: ErrorPage, meta: { layout: 'minimal' } }
]
if (!store.state.config.products.useShortCatalogUrls) {
  routes = routes.concat([{ name: 'virtual-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'bundle-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'simple-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'downloadable-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'grouped-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'configurable-product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'category', path: '/c/:slug', component: Category },
    { name: 'cms-page', path: '/i/:slug', component: CmsPage }])
} else {
  routes = routes.concat([{ name: 'virtual-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'bundle-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'simple-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'downloadable-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'grouped-product', path: '/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'configurable-product', path: '/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'product', path: '/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
    { name: 'cms-page', path: '/i/:slug', component: CmsPage },
    { name: 'category', path: '/:slug', component: Category }])
}

export default routes
