/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { findByPropsLazy } from "@webpack";

const BannerClasses = findByPropsLazy("banner", "button");
const BannerAPI = findByPropsLazy("showBanner", "hideBanner");

export default definePlugin({
    name: "NoMolloBanner",
    description: "Supprime le banner 'Mollo l'asticot'",
    authors: [{ name: "s4j1dlol", id: 123456789n }],

    patches: [
        // Patch pour supprimer le banner rate limit
        {
            find: "BannerTypes.RATE_LIMIT",
            replacement: {
                match: /BannerTypes\.RATE_LIMIT/,
                replace: "null"
            }
        },
        // Patch alternatif pour le message français
        {
            find: "HE HO, MOLLO L'ASTICOT",
            replacement: {
                match: /"HE HO, MOLLO L'ASTICOT !"/,
                replace: "null"
            }
        }
    ],

    start() {
        // Méthode agressive - surveille et supprime immédiatement les banners
        this.interval = setInterval(() => {
            const banners = document.querySelectorAll('[class*="banner"], [class*="Banner"]');
            banners.forEach(banner => {
                const text = banner.textContent;
                if (text?.includes("MOLLO L'ASTICOT") || text?.includes("trop rapidement")) {
                    banner.remove();
                }
            });
        }, 100);
    },

    stop() {
        if (this.interval) clearInterval(this.interval);
    }
});
