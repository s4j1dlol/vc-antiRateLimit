/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { MessageActions } from "@webpack/common";

// Stocke le timestamp du dernier message
let lastMessageTime = 0;

export default definePlugin({
    name: "AntiRateLimit",
    description: "Contourne la limite d'envoi rapide de messages",
    authors: [{ name: "TonNom", id: 123456789n }],

    patches: [
        {
            find: '("Message cannot be empty")',
            replacement: {
                match: /(\i\.\i\.sendMessage=function\((\i),(\i)\){)/,
                replace: '$1return $self.sendMessage($2,$3);'
            }
        }
    ],

    sendMessage(channelId: string, message: any) {
        return new Promise((resolve) => {
            const now = Date.now();
            const timeSinceLastMessage = now - lastMessageTime;
            const minDelay = 1100; // 1.1 seconde minimum entre les messages

            if (timeSinceLastMessage < minDelay) {
                const delay = minDelay - timeSinceLastMessage;
                setTimeout(() => {
                    lastMessageTime = Date.now();
                    MessageActions.sendMessage(channelId, message).then(resolve);
                }, delay);
            } else {
                lastMessageTime = now;
                MessageActions.sendMessage(channelId, message).then(resolve);
            }
        });
    }
});
