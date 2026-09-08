import React, { forwardRef } from 'react';
import { navigate } from '../utils/navigation';

export const Link = forwardRef(({ to, children, className, onClick, ...props }, ref) => {
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
        <a ref={ref} href={to} className={className} onClick={handleClick} {...props}>
            {children}
        </a>
    );
});

Link.displayName = 'Link';

export default Link;
