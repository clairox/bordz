import SkateLab3DViewport from '@/components/SkateLab/SkateLab3DViewport'
import SkateLabUI from '@/components/SkateLab/SkateLabUI'
import { SkateLabProvider } from '@/components/SkateLab/SkateLabContext'

const SkateLabPage = () => {
    return (
        <SkateLabProvider>
            <div className="relative w-full h-full">
                <SkateLabUI />
                <SkateLab3DViewport />
            </div>
        </SkateLabProvider>
    )
}

export default SkateLabPage
