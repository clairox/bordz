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
    label: string
}

type PartType = {
    id: string
    label: string
}

type BearingsType = PartType & { label: 'bearings' }
type DeckType = PartType & { label: 'deck' }
type GriptapeType = PartType & { label: 'griptape' }
type HardwareType = PartType & { label: 'hardware' }
type TrucksType = PartType & { label: 'trucks' }
type WheelsType = PartType & { label: 'wheels' }

type Part = {
    details: string[]
    color: Color
    description: string
    id: string
    images: Image[]
    size: Size
    title: string
    type: PartType
    vender: Vendor
}

type Bearings = Part & { type: BearingsType }
type Deck = Part & { type: DeckType }
type Griptape = Part & { type: GriptapeType }
type Hardware = Part & { type: HardwareType }
type Trucks = Part & { type: TrucksType }
type Wheels = Part & { type: WheelsType }

type BoardSetup = {
    bearings: Bearings
    deck: Deck
    extras: Part[]
    griptape: Griptape
    hardware: Hardware
    id: string
    trucks: Trucks
    wheels: Wheels
}
