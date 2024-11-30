import SkateLab3DViewport from './SkateLab3DViewport'
import { SkateLabProvider } from './SkateLabContext'
import SkateLabUI from './SkateLabUI'

// TODO: Consider just putting this stuff directly into the SkateLabPage component if 'use client' can be avoided
const SkateLab: React.FC = () => {
    return (
        <SkateLabProvider>
            <div className="relative">
                <div className="z-10 absolute w-full h-full">
                    <SkateLabUI />
                </div>
                <SkateLab3DViewport />
            </div>
        </SkateLabProvider>
    )
}

export default SkateLab
