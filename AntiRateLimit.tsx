/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { findByPropsLazy } from "@webpack";

const MessageQueue = findByPropsLazy("sendMessage", "editMessage");

export default definePlugin({
    name: "AntiRateLimit",
    description: "Contourne la limite d'envoi rapide de messages en les espaçant automatiquement",
    authors: [{ name: "TonNom", id: 123456789n }],

    patches: [
        {
            find: ".sendMessage=",
            replacement: {
                match: /\.sendMessage=function\((\i),\i\)/,
                replace: "$&{return $self.sendMessage($1, ...arguments);}"
            }
        }
    ],

    sendMessage(original: Function, channelId: string, message: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                original(channelId, message).then(resolve);
            }, 1100); // 1.1 secondes entre chaque message
        });
    }
});