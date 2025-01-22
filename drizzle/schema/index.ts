import * as address from './address'
import * as board from './board'
import * as cart from './cart'
import * as checkout from './checkout'
import * as boardComponent from './boardComponent'
import * as order from './order'
import * as product from './product'
import * as user from './customer'
import * as wishlist from './wishlist'

const schema = {
    ...address,
    ...board,
    ...cart,
    ...checkout,
    ...boardComponent,
    ...order,
    ...product,
    ...user,
    ...wishlist,
}

export default schema
