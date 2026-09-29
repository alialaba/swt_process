"use strict"
/**
 * PANEL_DATA maps each tab's data-panel value to what the shared panel
 * should show when that tab is active. Add/remove tabs by editing this
 * object and the matching button in the HTML — nothing else needs to change.
 */
const PANEL_DATA = {
    procedures: {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/procedure-page.png',
        alt: 'SweetProcess procedure page screenshot',
    },
    policies: {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/policy-page.png',
        alt: 'SweetProcess policy page screenshot',
    },
    processes: {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/process-page.png',
        alt: 'SweetProcess process page screenshot',
    },
    tasks: {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/tasks-page.png',
        alt: 'SweetProcess tasks dashboard screenshot',
    },
    'knowledge-base': {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/kb-page.png',
        alt: 'SweetProcess knowledge base screenshot',
    },
};

const initHowItWorks = () => {
    const howItworkBody = document.querySelector(".how-it-works__body")
    const tabs = Array.from(howItworkBody.querySelectorAll('[role="tab"]'));
    const panel = howItworkBody.querySelector('[role="tabpanel"]');
    const image = panel.querySelector('img');
    console.log(image)
    if (tabs.length === 0 || !panel || !image) return;


    function activate(tab, { focus = true } = {}) {
        const key = tab.dataset.panel;
        const data = PANEL_DATA[key];
        if (!data) return;

        tabs.forEach((t) => {
            const isActive = t === tab;
            t.classList.toggle('is-active', isActive);
            t.setAttribute('aria-selected', String(isActive));
            t.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        panel.setAttribute('aria-labelledby', tab.id);
        image.src = data.src;
        image.alt = data.alt;

        if (focus) tab.focus();
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => activate(tab, { focus = false } = {}))
        tab.addEventListener("keydown", (e) => {
            let targetIndex = null;

            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    targetIndex = (index + 1) % tabs.length;
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    targetIndex = (index - 1 + tabs.length) % tabs.length;
                    break;
                case 'Home':
                    targetIndex = 0;
                    break;
                case 'End':
                    targetIndex = tabs.length - 1;
                    break;
                default:
                    return; // let every other key behave normally
            }
            e.preventDefault()
            activate(tabs[targetIndex]);
        })

    })
}
document.querySelectorAll('.how-it-works').forEach(initHowItWorks);