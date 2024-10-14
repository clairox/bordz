## Todos

### General

-   [x] Fetch absolute
-   [ ] TEST: Redirect component redirects when condition is true
-   [ ] TEST: PriceRepr component
-   [ ] Move /schema and /db to /drizzle

### Cart

-   [x] BUG When cart is newly created in BrowsePage, if not reloaded or navigated back to, adding to cart will not work.
-   [x] Move cartId to cookie
-   [x] Use single cart provider
-   [ ] Rewrite cart tests

### Checkout

-   [x] BUG Stop showing user checkout page form if checkout does not exist or has no cart lines or is complete
-   [x] Update checkout on cart update
-   [x] Use checkout session cookie and get checkout page without id param
-   [x] Move checkout completion logic to backend. /checkout/complete return checkout with order populated
-   [ ] Abandon checkout after certain interval
-   [ ] Write tests for checkout
    -   [ ] TEST: /checkout redirects to /cart when cart is empty
    -   [ ] TEST: Checkout renders when clientSecret, ProcessingCheckoutCompletion renders otherwise
    -   [ ] TEST: /checkout?payment_intent_client_secret={secret} redirects to / if referer is not {origin}/checkout, stays on page otherwise
    -   [ ] TEST: /checkout?payment_intent_client_secret={secret} redirects to /order/confirmation?order={orderId} when POST /checkout/complete is successful
-   [ ] Make routes/components for other paymentIntent statuses
    -   [ ] List each of them here
-   [ ] Do a bit of refactoring

### Authentication

-   [ ] When Auth is implemented, requests to /api/cart should get cartId from user if cartId cookie does not exist
