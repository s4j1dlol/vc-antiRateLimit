/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
    name: "RateLimitBlocker",
    description: "Bloque l'envoi de messages quand y'a rate limit",
    authors: [{ name: "s4j1dlol", id: 123456789n }],

    start() {
        let isRateLimited = false;

        // Détecte quand le message apparaît
        const checkRateLimit = () => {
            const elements = document.querySelectorAll('*');
            for (const element of elements) {
                if (element.textContent?.includes("MOLLO L'ASTICOT")) {
                    isRateLimited = true;
                    console.log("Rate limit détecté - blocage des messages");
                    setTimeout(() => {
                        isRateLimited = false;
                        console.log("Rate limit terminé");
                    }, 5000); // 5 secondes
                    break;
                }
            }
        };

        // Empêche l'envoi de messages pendant le rate limit
        const originalSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function(...args) {
            if (isRateLimited && this._url?.includes("/messages")) {
                console.log("Message bloqué à cause du rate limit");
                return;
            }
            return originalSend.apply(this, args);
        };

        this.interval = setInterval(checkRateLimit, 1000);
    },

    stop() {
        if (this.interval) clearInterval(this.interval);
    }
});
