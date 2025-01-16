import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/Dialog'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import PriceRepr from '@/components/common/PriceRepr'
import { ScrollArea } from '@/components/ui/ScrollArea'

type ComponentDialogProps = {
    trigger: React.ReactNode
    component: Component
}

export const ComponentDialog: React.FC<ComponentDialogProps> = ({
    trigger,
    component,
}) => {
    return (
        <Dialog modal={false}>
            <DialogTrigger onClick={e => e.stopPropagation()}>
                {trigger}
            </DialogTrigger>
            <DialogContent className="flex gap-0 p-0 w-[1000px] h-[651.283px]">
                <div className="w-[55%] border-r border-gray-400 overflow-hidden">
                    <StoredPreviewImage
                        path={component.images?.[1]}
                        alt="component image"
                    />
                </div>
                <div className="flex flex-col gap-0 py-4 w-[45%] h-full">
                    <DialogHeader className="space-y-0 px-4 pb-2 border-b border-gray-400">
                        <div className="space-y-0 mb-1 w-[90%]">
                            <div className="text-gray-600 text-lg">
                                {component.vendor.name}
                            </div>
                            <DialogTitle className="mb-1 line-clamp-2 font-normal text-xl leading-tight">
                                {component.title}
                            </DialogTitle>
                        </div>
                        <div className="font-semibold text-lg">
                            <PriceRepr value={component.price} />
                        </div>
                    </DialogHeader>
                    <div className="px-4 pt-4 h-full overflow-y-auto">
                        <div className="mb-2 text-lg">
                            Size: {component.size.label}
                        </div>
                        <div className="mb-2">
                            <h2 className="font-semibold text-lg">
                                Description
                            </h2>
                            <p>{component.description}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Details</h2>
                            <ul className="flex flex-col gap-2 pl-4 list-disc">
                                {component.specifications?.map((spec, idx) => (
                                    <li key={idx}>{spec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
