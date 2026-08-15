import React from 'react';

const CHAPTERS = [
    { id: 'WhoWeAre', label: 'WHO WE ARE' },
    { id: 'WhatWeDo', label: 'WHAT WE DO' },
    { id: 'GlobalConnectivity', label: 'SELECTED WORK' },
    { id: 'Sustainability', label: 'COLLECTIVE' }
];

const ChapterHUD = ({ activeChapter = 'WhoWeAre', onScrollToChapter }) => {
    return (
        <aside className="montfort-hud" aria-label="Chapter Navigation HUD">
            <div className="hud-vertical-line" />
            
            {CHAPTERS.map((chap) => {
                const isActive = activeChapter === chap.id;
                return (
                    <button
                        key={chap.id}
                        className={`hud-node-btn ${isActive ? 'active' : ''}`}
                        onClick={() => onScrollToChapter(chap.id)}
                        aria-label={`Jump to ${chap.label}`}
                    >
                        <div className="hud-node-diamond" />
                        <span className="hud-node-label">{chap.label}</span>
                    </button>
                );
            })}
        </aside>
    );
};

export default ChapterHUD;
