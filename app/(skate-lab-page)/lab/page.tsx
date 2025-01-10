import { SLUserInterface, SL3DViewport } from '@/components/features/SkateLab'
import { SkateLabProvider } from '@/context/SkateLabContext'

const SkateLabPage = () => {
    return (
        <SkateLabProvider>
            <div className="relative w-full h-full">
                <SLUserInterface />
                <SL3DViewport />
            </div>
        </SkateLabProvider>
    )
}

export default SkateLabPage
