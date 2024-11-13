declare module 'vanity-generator-native' {
    export function generateVanity(suffix: string): {
        publicKey: string;
        privateKey: string;
        attempts: number;
        durationMs: number;
    };
}