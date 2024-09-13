export declare const IS_FAKE = true;
export declare const HUB_NODE: string;
export declare const soundEffectCommands: {
    '/fart': string;
    '/no': string;
    '/yes': string;
    '/why': string;
    '/people': string;
    '/robust': string;
    '/robustness': string;
};
export declare const maybePlayTTS: (msg: string) => void;
export declare const maybePlaySoundEffect: (msg: string) => void;
export declare const imageCommands: {
    '/die': string;
    '/kino': string;
    '/panda': string;
    '/dev': string;
    '/tiger': string;
    '/wow': string;
    '/cry': string;
    '/ok': string;
    '/oops': string;
};
export declare const maybeReplaceWithImage: (msg: string) => any;
export declare const linkRegex: RegExp;
export declare const imageRegex: RegExp;
export declare function isImageUrl(url: string): boolean;
export declare function formatTimestamp(timestamp: number): string;
