import { Capacitor } from "@capacitor/core";

export const isMobile = Capacitor.getPlatform() !== 'web'