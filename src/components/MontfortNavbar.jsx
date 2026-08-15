import React from 'react';

const DIVISIONS = [
    { id: 'group', name: 'MONTFORT GROUP' },
    { id: 'trading', name: 'MONTFORT TRADING' },
    { id: 'capital', name: 'MONTFORT CAPITAL' },
    { id: 'maritime', name: 'MONTFORT MARITIME' },
    { id: 'fortenergy', name: 'FORT ENERGY' }
];

const MontfortNavbar = ({
    activeDivision = 'group',
    onSelectDivision,
    onOpenMenu,
    onOpenNews
}) => {
    return (
        <header className="montfort-header">
            {/* Division Switcher */}
            <nav className="nav-divisions" aria-label="Corporate Divisions">
                {DIVISIONS.map((div) => (
                    <button
                        key={div.id}
                        className={`nav-division-link ${activeDivision === div.id ? 'active' : ''}`}
                        onClick={() => onSelectDivision(div.id)}
                    >
                        {div.name}
                    </button>
                ))}
            </nav>

            {/* Right Tools: News & Menu */}
            <div className="header-right-tools">
                <button className="news-pill-btn" onClick={onOpenNews} aria-label="Open News">
                    <span>NEWS</span>
                    <span className="news-counter-bubble">20</span>
                </button>

                <button className="menu-toggle-cta" onClick={onOpenMenu} aria-label="Open Menu">
                    <span>MENU</span>
                    <div className="menu-dots-pair">
                        <div className="menu-dot-circle" />
                        <div className="menu-dot-circle" />
                    </div>
                </button>
            </div>
        </header>
    );
};

export default MontfortNavbar;
