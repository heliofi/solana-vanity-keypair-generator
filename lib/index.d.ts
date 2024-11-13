export interface VanityKeypairResult {
    publicKey: string;
    privateKey: string;
    attempts: number;
    durationMs: number;
}
/**
 * Generates a Solana keypair with a vanity address ending in the specified suffix
 * @param suffix - The desired suffix for the public key
 * @returns Object containing publicKey, privateKey, and number of attempts
 */
export declare function generateVanityKeypair(suffix: string): VanityKeypairResult;
