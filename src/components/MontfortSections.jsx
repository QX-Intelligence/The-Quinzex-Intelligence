import React, { useEffect, useState } from 'react';
import MontfortSectionsDesktop from './MontfortSectionsDesktop';
import MontfortSectionsMobile from './MontfortSectionsMobile';

const MontfortSections = ({ onScrollToChapter }) => {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(
        typeof window !== 'undefined' ? window.innerWidth <= 1024 : false
    );

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1024px)');
        const update = (e) => setIsMobileOrTablet(e.matches);
        setIsMobileOrTablet(mq.matches);
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    return isMobileOrTablet ? (
        <MontfortSectionsMobile onScrollToChapter={onScrollToChapter} />
    ) : (
        <MontfortSectionsDesktop onScrollToChapter={onScrollToChapter} />
    );
};

export default MontfortSections;
