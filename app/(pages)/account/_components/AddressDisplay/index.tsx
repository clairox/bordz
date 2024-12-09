type AddressDisplayProps = {
    address: Address
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ address }) => {
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

export default AddressDisplay
