import { Capacitor } from "@capacitor/core";

export const isMobile = import.meta.env.VITE_REACT_APP_FORCE_MOBILE === 'true' ? true : (Capacitor.getPlatform() === 'web')
