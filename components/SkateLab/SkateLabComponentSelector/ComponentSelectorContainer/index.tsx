import SkateLabComponentSelectorNavigation from '../SelectorNavigation'
import SkateLabComponentList from '../ComponentList'

const SkateLabComponentSelector: React.FC = () => {
    return (
        <div className="fixed left-0 w-60 h-full border border-t-black bg-white pointer-events-auto">
            <SkateLabComponentSelectorNavigation />
            <SkateLabComponentList />
        </div>
    )
}

export default SkateLabComponentSelector
