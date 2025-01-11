import { AddressManagementList, DefaultAddressCard } from '.'

type AddressDashboardProps = {
    defaultAddress?: Address
    addresses: Address[]
}

export const AddressDashboard: React.FC<AddressDashboardProps> = ({
    defaultAddress,
    addresses,
}) => {
    return (
        <div className="flex mb-3">
            <DefaultAddressCard defaultAddress={defaultAddress} />
            <AddressManagementList addresses={addresses} />
        </div>
    )
}
