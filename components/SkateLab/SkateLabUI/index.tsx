'use client'

import { useSkateLabContext } from '../SkateLabContext'
import SkateLabUIButton from './SkateLabUIButton'
import SkateLabUIMenu from './SkateLabUIMenu'

const SkateLabUI: React.FC = () => {
    const { mode, isComplete, isTouched, handleSetupCompletion, reset } =
        useSkateLabContext()

    return (
        <div className="z-10 absolute w-full h-full pointer-events-none">
            <SkateLabUIMenu />
            <div className="fixed top-24 right-10 flex flex-col gap-4">
                <SkateLabUIButton
                    disabled={!isComplete}
                    onClick={handleSetupCompletion}
                >
                    {mode === 'edit' ? 'Done' : 'Add to cart'}
                </SkateLabUIButton>
                <SkateLabUIButton disabled={!isTouched} onClick={reset}>
                    Reset
                </SkateLabUIButton>
            </div>
        </div>
    )
}

export default SkateLabUI
