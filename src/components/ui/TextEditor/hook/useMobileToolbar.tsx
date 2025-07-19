import '../editor.style.css';

export const useMobileToolbar = () => {
    const updateToolbarPosition = () => {
        const toolbar = document.querySelector<HTMLDivElement>('.ce-inline-toolbar');
        const viewport = window.visualViewport;
        if (toolbar && viewport) {
            const toolbarPosition = viewport?.height + viewport?.offsetTop - 46;
            toolbar.style.transform = `translateY(${toolbarPosition}px)`;
        }
    };

    const loadMobileToolbarEvent = async () => {
        window.visualViewport?.addEventListener('resize', updateToolbarPosition);
        window.visualViewport?.addEventListener('scroll', updateToolbarPosition);
    };

    const unsubscribeToolbarEvent = () => {
        window.visualViewport?.removeEventListener('resize', updateToolbarPosition);
        window.visualViewport?.removeEventListener('scroll', updateToolbarPosition);
    };

    return { loadMobileToolbarEvent, unsubscribeToolbarEvent };
};
