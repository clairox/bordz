type Color = {
    id: string
    label: string
    value: string
}

type Size = {
    id: string
    label: string
}

type Vendor = {
    id: string
    name: string
}

type ComponentType =
    | 'deck'
    | 'trucks'
    | 'wheels'
    | 'bearings'
    | 'hardware'
    | 'griptape'

type ComponentTypeOrNone = ComponentType | 'none'

type ComponentTypeAsCategory = {
    deck: 'Decks'
    trucks: 'Trucks'
    wheels: 'Wheels'
    bearings: 'Bearings'
    hardware: 'Hardware'
    griptape: 'Griptape'
}

type Category = {
    id: string
    label: ComponentTypeAsCategory[ComponentType]
}

type BearingsCategory = Category & { label: 'Bearings' }
type DeckCategory = Category & { label: 'Decks' }
type GriptapeCategory = Category & { label: 'Griptape' }
type HardwareCategory = Category & { label: 'Hardware' }
type TrucksCategory = Category & { label: 'Trucks' }
type WheelsCategory = Category & { label: 'Wheels' }

type ComponentAttributes = {
    category: Category
    size: Size
    color: Color
    vendor: Vendor
}

type Component = {
    id: string
    title: string
    featuredImage?: Image
    images: Image[]
    model: string
    compareAtPrice?: number
    price: number
    description?: string
    specifictations?: string[]
    availableForSale: boolean
    totalInventory: number
    componentAttributes: ComponentAttributes
    createdAt: Date
    updatedAt: Date
}

type Bearings = Component & {
    componentAttributes: ComponentAttributes & { category: BearingsCategory }
}
type Deck = Component & {
    componentAttributes: ComponentAttributes & { category: DeckCategory }
}
type Griptape = Component & {
    componentAttributes: ComponentAttributes & { category: GriptapeCategory }
}
type Hardware = Component & {
    componentAttributes: ComponentAttributes & { category: HardwareCategory }
}
type Trucks = Component & {
    componentAttributes: ComponentAttributes & { category: TrucksCategory }
}
type Wheels = Component & {
    componentAttributes: ComponentAttributes & { category: WheelsCategory }
}

type BoardSetup = {
    id: string
    productId: string
    deck: Deck
    trucks: Trucks
    wheels: Wheels
    bearings: Bearings
    hardware: Hardware
    griptape: Griptape
}
