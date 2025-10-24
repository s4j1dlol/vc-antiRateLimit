/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { Toasts } from "@webpack/common";

export default definePlugin({
    name: "NoToasts",
    description: "Désactive tous les messages toast",
    authors: [{ name: "s4j1dlol", id: 123456789n }],

    start() {
        Toasts.show = function() { 
            return null; 
        };
    }
});