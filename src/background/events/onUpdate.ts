import { hotReloadTab } from 'src/background/util/hotReloadTab';
import { ExtensionStore } from '../../shared/storage/ExtensionStore';

/**
 * Called when the extension is updated (or when the extension is reloaded in development mode)
 */
export default async function onUpdate() {
    await Promise.all([
        ExtensionStore.setLastUpdate(Date.now()),
        ExtensionStore.setVersion(chrome.runtime.getManifest().version),
    ]);

    if (process.env.NODE_ENV === 'development') {
        hotReloadTab();
    }
}
