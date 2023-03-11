import { DevStore } from 'src/shared/storage/DevStore';

/**
 * Open the debug tab as the first tab
 */
export async function openDebugTab() {
    if (process.env.NODE_ENV === 'development') {
        const debugTabId = await DevStore.getDebugTabId();

        const isAlreadyOpen = await (await chrome.tabs.query({})).some(tab => tab.id === debugTabId);
        if (isAlreadyOpen) return;

        const wasVisible = await DevStore.getWasDebugTabVisible();

        const tab = await chrome.tabs.create({
            url: chrome.runtime.getURL('debug.html'),
            active: wasVisible,
            pinned: true,
            index: 0,
        });

        await DevStore.setDebugTabId(tab.id);
    }
}
