import * as address from './address'
import * as boardSetup from './boardSetup'
import * as cart from './cart'
import * as checkout from './checkout'
import * as component from './component'
import * as order from './order'
import * as product from './product'
import * as user from './user'
import * as wishlist from './wishlist'

const schema = {
    ...address,
    ...boardSetup,
    ...cart,
    ...checkout,
    ...component,
    ...order,
    ...product,
    ...user,
    ...wishlist,
}

export default schema
