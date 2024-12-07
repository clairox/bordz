import SkateLab3DViewport from '@/app/(skate-lab-page)/lab/SkateLab/SkateLab3DViewport'
import SkateLabUI from '@/app/(skate-lab-page)/lab/SkateLab/SkateLabUI'
import { SkateLabProvider } from '@/app/(skate-lab-page)/lab/SkateLab/SkateLabContext'

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
