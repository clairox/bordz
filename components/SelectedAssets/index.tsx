'use client'

import Image from 'next/image'
import { Plus } from '@phosphor-icons/react'

import { useAssets } from '@/hooks'
import { Dialog, DialogTrigger } from '../ShadUI/Dialog'
import AssetSelector from '../AssetSelector'

type SelectedAssetsProps = {
    assetPaths: string[]
    bucket: string
    folder?: string
    accept?: string
    max?: number
    select: (path: string) => void
    deselect: (path: string) => void
}

const MAX_ASSET_COUNT = 10

const SelectedAssets: React.FC<SelectedAssetsProps> = ({
    assetPaths,
    bucket,
    folder,
    accept,
    max = MAX_ASSET_COUNT,
    select,
    deselect,
}) => {
    const { data: assets } = useAssets(bucket, folder, assetPaths)

    const handleToggleSelect = (path: string) => {
        if (assetPaths.includes(path)) {
            deselect(path)
        } else {
            select(path)
        }
    }

    return (
        <div className="relative flex flex-row gap-6 p-2 w-fit h-52 border border-black">
            {assets.map(asset => {
                return (
                    <div
                        onClick={() => deselect(asset.path || '')}
                        key={asset.signedUrl}
                    >
                        <SelectedAssetsItem asset={asset} />
                    </div>
                )
            })}
            {/* TODO: AssetSelector should not close when length is >= max */}
            {assetPaths.length < max && (
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-40 h-full border border-black">
                            <button
                                type="button"
                                className="flex justify-center items-center w-full h-full hover:bg-blue-50"
                            >
                                <Plus size={40} weight="light" />
                            </button>
                        </div>
                    </DialogTrigger>
                    <AssetSelector
                        bucket={bucket}
                        folder={folder}
                        accept={accept}
                        selectedAssets={assets}
                        toggleAsset={handleToggleSelect}
                    />
                </Dialog>
            )}
        </div>
    )
}

type SelectedAssetsItemProps = {
    asset: AssetData
}

const SelectedAssetsItem: React.FC<SelectedAssetsItemProps> = ({ asset }) => {
    const extension = asset.path?.split('.').pop()
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp']

    if (extension && imageExtensions.includes(extension)) {
        return (
            <div className="w-40 h-full p-2 border border-black hover:bg-blue-50 cursor-pointer">
                <Image
                    src={asset.signedUrl}
                    alt={''}
                    sizes="100vw"
                    width="650"
                    height="770"
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
        )
    }

    return (
        <div className="w-40 h-full p-2 border border-black hover:bg-blue-50 cursor-pointer">
            <div className="w-full h-auto" />
            <p>{asset.path}</p>
        </div>
    )
}

export default SelectedAssets
