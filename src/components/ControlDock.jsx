import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/audioAmbiance';

const ControlDock = ({ onScrollToTop }) => {
    const handleScrollTop = () => {
        onScrollToTop();
        soundEngine.playChime(880);
    };

    return (
        <div className="control-dock" aria-label="Quick page controls">
            <button 
                className="dock-btn" 
                onClick={handleScrollTop}
                title="Scroll to top"
                aria-label="Scroll to top"
            >
                <ArrowUp size={18} />
            </button>
        </div>
    );
};

export default ControlDock;
