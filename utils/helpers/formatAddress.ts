const formatAddress = (
    address: Omit<Address, 'fullName' | 'id' | 'ownerId' | 'formatted'>
): string => {
    return `${address.line1}, ${
        address.line2 ? address.line2 + ', ' : ''
    }${address.city}, ${address.state} ${address.postalCode}, ${address.countryCode}`
}

export default formatAddress
