import { useRouter } from 'next/navigation'
import AddressDisplay from '../AddressDisplay'
import { useDeleteAddress } from '../../_hooks'

type AddressesViewProps = {
    defaultAddress?: Address
    addresses?: Address[]
}

const AddressesView: React.FC<AddressesViewProps> = ({
    defaultAddress,
    addresses,
}) => {
    const router = useRouter()

    const { mutate: deleteAddress } = useDeleteAddress()

    return (
        <div className="flex mb-3">
            <div className="flex flex-col justify-between w-1/2 border-r border-black">
                {defaultAddress ? (
                    <div>
                        <p className="font-semibold">Default address:</p>
                        <AddressDisplay address={defaultAddress} />
                    </div>
                ) : (
                    <p>No default address saved.</p>
                )}
                <button
                    onClick={() =>
                        router.push('/account/addresses/edit-default')
                    }
                >
                    Update default address
                </button>
            </div>
            <div className="pl-8 w-1/2">
                {addresses?.map(address => (
                    <div key={address.id} className="flex justify-between mb-3">
                        <AddressDisplay address={address} />
                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    router.push(
                                        `/account/addresses/edit/${address.id}`
                                    )
                                }
                            >
                                Edit
                            </button>
                            <button
                                onClick={() =>
                                    deleteAddress({ id: address.id })
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )) || <p>No addresses saved.</p>}
            </div>
        </div>
    )
}

export default AddressesView
