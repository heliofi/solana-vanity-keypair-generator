import { generateVanityKeypair } from './index';

try {
    console.log('Generating keypair with suffix "abc"...');
    const start = Date.now();
    const result = generateVanityKeypair('abc');
    const duration = Date.now() - start;
    
    console.log('Result:', {
        publicKey: result.publicKey,
        privateKey: result.privateKey.slice(0, 10) + '...', // Only show beginning for security
        attempts: result.attempts,
        durationMs: duration
    });
    
    // Verify the suffix
    if (result.publicKey.endsWith('abc')) {
        console.log('✅ Success! Public key ends with "abc"');
    } else {
        console.log('❌ Error: Public key does not end with "abc"');
    }
} catch (error) {
    console.error('Error generating vanity keypair:', error);
}