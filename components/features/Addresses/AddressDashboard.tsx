import { useSessionCustomer } from '@/hooks/session'
import { AddressManagementList, DefaultAddressCard } from '.'

export const AddressDashboard = () => {
    const { data: customer } = useSessionCustomer()

    return (
        <div className="flex mb-3 px-8 pb-4">
            <DefaultAddressCard defaultAddress={customer?.defaultAddress} />
            <AddressManagementList addresses={customer!.addresses} />
        </div>
    )
}
