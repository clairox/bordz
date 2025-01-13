import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/Dialog'
import StoredPreviewImage from '@/components/common/StoredPreviewImage'
import PriceRepr from '@/components/common/PriceRepr'

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
            <DialogContent className="p-0 w-[1000px]">
                <div className="flex gap-[1px]">
                    <div className="w-[55%] border-r border-gray-400">
                        <StoredPreviewImage
                            path={component.images?.[1]}
                            alt="component image"
                        />
                    </div>
                    <div className="px-4 py-4 w-[45%]">
                        <DialogHeader className="space-y-0 mb-1 w-[90%]">
                            <div className="text-gray-600 text-lg">
                                {component.vendor.name}
                            </div>
                            <DialogTitle className="line-clamp-2 font-normal text-xl leading-tight">
                                {component.title}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="mb-4 font-semibold text-lg">
                            <PriceRepr value={component.price} />
                        </div>
                        <div className="mb-2 text-lg">
                            Size: {component.size.label}
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">
                                Description
                            </h2>
                            <p>{component.description}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
