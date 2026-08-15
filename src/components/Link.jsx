import React from 'react';
import { navigate } from '../utils/navigation';

export const Link = ({ to, children, className, onClick, ...props }) => {
    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (e.defaultPrevented) return;
        
        // Handle standard modifiers (Command, Control, etc.) to open in new tab
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;

        if (to && (to.startsWith('/quinzex') || to.startsWith('http://') || to.startsWith('https://') || to.startsWith('#'))) {
            return;
        }
        
        e.preventDefault();
        
        if (window.location.pathname === to) return;
        
        navigate(to);
    };

    return (
        <a href={to} className={className} onClick={handleClick} {...props}>
            {children}
        </a>
    );
};

export default Link;
