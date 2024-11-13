const addon = require('../native');

function generateVanityAddress(suffix) {
    return addon.generateVanity(suffix);
}

module.exports = {
    generateVanityAddress
};