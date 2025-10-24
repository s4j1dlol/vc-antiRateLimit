/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
    name: "RemoveAllBanners",
    description: "Supprime tous les banners d'interface",
    authors: [{ name: "s4j1dlol", id: 123456789n }],

    start() {
        // Supprime tous les banners existants
        const removeBanners = () => {
            document.querySelectorAll('[class*="banner"], [class*="Banner"]').forEach(banner => {
                if (banner.textContent?.includes("MOLLO L'ASTICOT") || 
                    banner.textContent?.includes("trop rapidement")) {
                    banner.remove();
                }
            });
        };

        // Surveille en continu
        this.observer = new MutationObserver(removeBanners);
        this.observer.observe(document.body, { childList: true, subtree: true });
        
        removeBanners();
    },

    stop() {
        if (this.observer) this.observer.disconnect();
    }
});
