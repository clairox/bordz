'use client'

import {
    ChangeEvent,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import Image from 'next/image'

import { useAssets, useUploadFile } from '@/hooks/data/asset'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/Tabs'
import { DialogContent, DialogTitle } from '../../ui/Dialog'
import { ScrollArea } from '@/components/ui/ScrollArea'

type AssetSelectorContextValue = {
    bucket: string
    folder?: string
    accept?: string
    selectedAssets: AssetData[]
    toggleAsset: (path: string) => void
}

const AssetSelectorContext = createContext<AssetSelectorContextValue>(
    {} as AssetSelectorContextValue
)

const useAssetSelector = () => {
    const { bucket, folder, accept, selectedAssets, toggleAsset } =
        useContext(AssetSelectorContext)
    const { data: assets } = useAssets(bucket, folder)
    const [sortedAssets, setSortedAssets] = useState<AssetData[]>([])

    useEffect(() => {
        if (assets) {
            const _assets = assets.map(asset => {
                const selectedAssetPaths = selectedAssets.map(
                    asset => asset.path
                )
                return {
                    ...asset,
                    isSelected: selectedAssetPaths.includes(asset.path),
                }
            })

            setSortedAssets(() => {
                return _assets.toSorted((assetA, assetB) => {
                    if (assetA.isSelected && !assetB.isSelected) {
                        return -1
                    }

                    if (!assetA.isSelected && assetB.isSelected) {
                        return 1
                    }

                    return 0
                })
            })
        }
    }, [assets, selectedAssets])

    return {
        assets: sortedAssets,
        toggleAsset,
        bucket,
        folder,
        accept,
    }
}

type AssetSelectorProps = {
    bucket: string
    folder?: string
    accept?: string
    selectedAssets: AssetData[]
    toggleAsset: (path: string) => void
}

const AssetSelector: React.FC<AssetSelectorProps> = ({
    bucket,
    folder,
    accept,
    selectedAssets,
    toggleAsset,
}) => {
    return (
        <DialogContent className="w-[500px] h-full max-h-[600px]">
            <AssetSelectorContext.Provider
                value={{ bucket, folder, accept, selectedAssets, toggleAsset }}
            >
                <div className="pb-6">
                    <DialogTitle>Assets</DialogTitle>
                </div>
                <AssetSelectorContainer />
            </AssetSelectorContext.Provider>
        </DialogContent>
    )
}

const AssetSelectorContainer = () => {
    const { assets } = useAssetSelector()
    return (
        <div className="w-full h-full">
            <Tabs defaultValue="select">
                <TabsList>
                    <TabsTrigger value="select">Select</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="select" className="w-full h-full">
                    {assets.length > 0 ? (
                        <AssetSelectorGrid assets={assets} />
                    ) : (
                        <p>No assets uploaded.</p>
                    )}
                </TabsContent>
                <TabsContent value="upload">
                    <AssetSelectorUpload />
                </TabsContent>
            </Tabs>
        </div>
    )
}

type AssetSelectorGridProps = {
    assets: AssetData[]
}
const AssetSelectorGrid: React.FC<AssetSelectorGridProps> = ({ assets }) => {
    const { toggleAsset } = useAssetSelector()

    return (
        <ScrollArea className="w-[400px] h-[500px]">
            <div className="flex flex-wrap gap-8">
                {assets.map(asset => (
                    <AssetSelectorGridItem
                        asset={asset}
                        toggleAsset={toggleAsset}
                        key={asset.path}
                    />
                ))}
            </div>
        </ScrollArea>
    )
}

type AssetSelectorGridItemProps = {
    asset: AssetData
    toggleAsset: (path: string) => void
}

const AssetSelectorGridItem: React.FC<AssetSelectorGridItemProps> = ({
    asset,
    toggleAsset,
}) => {
    const extension = asset.path?.split('.').pop()
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp']

    if (extension && imageExtensions.includes(extension)) {
        return (
            <div
                onClick={() => toggleAsset(asset.path || '')}
                className={`p-2 w-40 h-full border border-black ${asset.isSelected ? 'bg-blue-300 hover:bg-blue-500' : 'bg-white hover:bg-blue-50'} cursor-pointer`}
            >
                <Image
                    src={asset.signedUrl}
                    alt={''}
                    sizes="100vw"
                    width="650"
                    height="770"
                    style={{ width: '100%', height: 'auto' }}
                />
                <p>{asset.path}</p>
            </div>
        )
    }

    return (
        <div
            onClick={() => toggleAsset(asset.path || '')}
            className={`p-2 w-40 h-full border border-black ${asset.isSelected ? 'bg-blue-300 hover:bg-blue-500' : 'bg-white hover:bg-blue-50'} cursor-pointer`}
        >
            <div className="w-full h-auto" />
            <p>{asset.path}</p>
        </div>
    )
}

const AssetSelectorUpload = () => {
    const { toggleAsset, accept, bucket, folder } = useAssetSelector()
    const { mutateAsync: uploadFile } = useUploadFile()
    const [file, setFile] = useState<File | undefined>()
    const [fileUploaded, setFileUploaded] = useState(false)

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileUploaded(false)
        setFile(e.target.files?.[0])
    }

    const handleFileUpload = async () => {
        if (!file) {
            return
        }

        const path = await uploadFile({ bucket, folder, file })
        setFileUploaded(true)
        toggleAsset(path)
    }

    return (
        <div>
            <input
                type="file"
                id="file"
                accept={accept}
                onChange={handleFileInputChange}
            />
            <button disabled={!file} onClick={handleFileUpload}>
                {fileUploaded ? 'Uploaded!' : 'Upload'}
            </button>
        </div>
    )
}

export { AssetSelector }
