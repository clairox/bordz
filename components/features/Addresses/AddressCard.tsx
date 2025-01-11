type AddressCardProps = {
    address: Address
}

export const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
    return (
        <div>
            <p>{address.fullName}</p>
            <p>{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            <p>
                {address.city}, {address.state} {address.postalCode}
            </p>
            <p>{address.countryCode}</p>
        </div>
    )
}
