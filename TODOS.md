## Todos

### General

-   [x] Fetch absolute
-   [x] TEST Redirect component redirects when condition is true
-   [x] TEST PriceRepr component
-   [x] Move /schema and /db to /drizzle
-   [x] Do a bit of refactoring
-   [x] Add updatedAt: new Date() to all resource updates
-   [x] Add 'model' field to component schema
-   [x] Allow use of multiple addresses per user
-   [x] Update customer schema to handle defaultAddressId better
-   [x] On sign out, wait until it's finished to invalidate auth and cart
-   [x] Add 'add address' to addresses
-   [x] Use handle route for all api routes
-   [x] Use infinite queries where pagination is needed
-   [x] Use validate body for all api routes
-   [x] Add email column to customers table
-   [x] Refactor code for email column addition where necessary
-   [x] Use [userId] route in /customers
-   [x] Move utility functions in routes to bottom
-   [ ] Create form password input component
-   [x] Move all fetches to /lib/api
-   [ ] Get rid of try/catch in react-query queries and mutations and wherever else they aren't needed
-   [ ] Add 'add' button with text input to select
-   [ ] Use Supabase for data storage
-   [ ] Reorganize file structure
-   [ ] Figure out a better naming convention for List and ListItem components
-   [ ] Use unauthorized error for missing session token
-   [ ] Remove 'Query' and 'Mutation' from react-query queries and mutations
-   [ ] BUG session cookie not deleted after account deletion
-   [ ] Add 'recommended' (or something) sort key based on views (?)
-   [x] Paginate admin tables
-   [ ] Change createBadRequestError to handle Missing required fields:
-   [ ] Change validateRequestBody to validateRequestData
-   [ ] Use bucket arg with useImages hook
-   [ ] Create default unexpected error text constant
-   [ ] Use numbers where necessary in form schemas
-   [ ] Use Pick for update arg types
-   [ ] Call useParams with <Record<string, string>>
-   [ ] Automatically add ' \*' to form field labels if required
-   [x] Return response.json() and handle error inside fetchAbsolute

### Cart

-   [x] BUG When cart is newly created in BrowsePage, if not reloaded or navigated back to, adding to cart will not work.
-   [x] Move cartId to cookie
-   [x] Use single cart provider
-   [x] Don't allow duplicate boardsetup product on merge
-   [x] Add unique index to cart cart_id_product_id

### Checkout

-   [x] BUG Stop showing user checkout page form if checkout does not exist or has no cart lines or is complete
-   [x] Update checkout on cart update
-   [x] Use checkout session cookie and get checkout page without id param
-   [x] Move checkout completion logic to backend. /checkout/complete return checkout with order populated
-   [x] Write tests for checkout
    -   [x] TEST /checkout redirects to /cart when cart is empty
    -   [x] TEST Checkout renders when clientSecret, ProcessingCheckoutCompletion renders otherwise
    -   [x] TEST /checkout?payment_intent_client_secret={secret} redirects to /order/confirmation?order={orderId} when POST /checkout/complete is successful
-   [x] Add addresses to checkout
-   [ ] Abandon checkout after certain interval
-   [ ] Make routes/components for other paymentIntent statuses
    -   [ ] List each of them here
-   [ ] Update customer number of orders on checkout completion

### Authentication

-   [x] When Auth is implemented, requests to /api/cart should get cartId from user if cartId cookie does not exist

### Skate Lab

-   [x] Add like post build confirmation modal where you can choose to add to cart or wishlist and make build public
-   [ ] Component filter/sort

### Customer

-   [x] Add address to customer type and /customers return

### Account

-   [x] Create order page
-   [x] Create addresses page
-   [x] Create change password page
-   [x] Create delete account page
-   [x] Create personal details page

### Wishlist

-   [x] Sort wishlist by createdAt desc
-   [x] Don't allow duplicate boardsetup product on merge
-   [x] Add unique index to wishlist wishlist_id_product_id
-   [ ] Change saved to wishlist
-   [ ] Add price to wishlist line
