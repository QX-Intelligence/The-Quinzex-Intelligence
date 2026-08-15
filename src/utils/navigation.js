export const navigate = (to) => {
    const event = new CustomEvent('nav-navigate', { detail: { to } });
    window.dispatchEvent(event);
};
