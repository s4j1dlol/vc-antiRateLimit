/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
    name: "NoRateLimitMessage", 
    description: "Supprime le message rate limit",
    authors: [{ name: "s4j1dlol", id: 123456789n }],

    patches: [
        {
            find: ".displayName=\"ToastShowButton\"",
            replacement: {
                match: /show\(\{message:\i\.\i\.Messages\.SENDING_TOO_MANY_MESSAGES,/,
                replace: "return null;"
            }
        }
    ]
});
