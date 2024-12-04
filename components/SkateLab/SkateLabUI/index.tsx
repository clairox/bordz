'use client'

import { useSkateLabContext } from '../SkateLabContext'
import SkateLabUIButton from './SkateLabUIButton'
import SkateLabUIMenu from './SkateLabUIMenu'

const SkateLabUI: React.FC = () => {
    const { mode, isComplete, isTouched, handleSetupCompletion, reset } =
        useSkateLabContext()

    return (
        <div className="pointer-events-none">
            <div className="fixed left-10 w-60 h-full border-r border-black">
                <SkateLabUIMenu />
            </div>
            <div className="fixed right-10 flex flex-col gap-4">
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
