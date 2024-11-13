use neon::prelude::*;
use solana_sdk::signer::keypair::Keypair;
use solana_sdk::signature::Signer;
use std::thread;
use std::sync::mpsc;
use std::time::Instant;
use base64::engine::general_purpose::STANDARD;
use base64::Engine;

fn generate_vanity(mut cx: FunctionContext) -> JsResult<JsObject> {
    let suffix = cx.argument::<JsString>(0)?.value();
    let num_threads = num_cpus::get();
    let (tx, rx) = mpsc::channel();

    // Spawn worker threads
    let handles: Vec<_> = (0..num_threads).map(|_| {
        let thread_tx = tx.clone();
        let suffix = suffix.clone();
        thread::spawn(move || {
            let mut attempts = 0;
            loop {
                let keypair = Keypair::new();
                let pubkey = keypair.pubkey().to_string();
                attempts += 1;

                if pubkey.ends_with(&suffix) {
                    thread_tx.send((true, attempts, keypair)).unwrap();
                    return;
                }
            }
        })
    }).collect();

    // Wait for result
    let (_, attempts, keypair) = rx.recv().unwrap();
    drop(tx);

    // Create return object
    let obj = cx.empty_object();
    let pubkey = cx.string(keypair.pubkey().to_string());
    let privkey = cx.string(STANDARD.encode(keypair.to_bytes()));
    let attempts = cx.number(attempts as f64);

    obj.set(&mut cx, "publicKey", pubkey)?;
    obj.set(&mut cx, "privateKey", privkey)?;
    obj.set(&mut cx, "attempts", attempts)?;

    Ok(obj)
}

register_module!(mut cx, {
    cx.export_function("generateVanity", generate_vanity)
});
