const addon = require('../native');

/**
 * Generates a Solana keypair with a vanity address ending in the specified suffix
 * @param {string} suffix - The desired suffix for the public key
 * @returns {Object} - Object containing publicKey, privateKey, and number of attempts
 */
function generateVanityKeypair(suffix) {
    return addon.generateVanity(suffix);
}

module.exports = {
    generateVanityKeypair
};