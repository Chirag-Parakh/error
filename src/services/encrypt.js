import CryptoJS from 'crypto-js';
import AesGcmCrypto from 'react-native-aes-gcm-crypto';

// Exact same constants as your Go code
const PASSWORD = 'cspvtltd2000';
const SALT = 'csvlnsup2025';
const ITERATIONS = 65536;
const KEY_LENGTH = 32; // 256-bit key
const IV_SIZE = 12; // AES-GCM standard IV size

// Generate AES-GCM key using PBKDF2 (exact same as Go)
const generateSecretKey = () => {
    try {
        console.log('hello')
        const key = CryptoJS.PBKDF2(PASSWORD, SALT, {
            keySize: KEY_LENGTH / 4, // CryptoJS uses words (4 bytes each)
            iterations: ITERATIONS,
            hasher: CryptoJS.algo.SHA256
        });


        // Convert to hex string for react-native-aes-gcm-crypto
        return key.toString(CryptoJS.enc.Hex);
    } catch (error) {
        console.error("Error generating secret key:", error);
        throw new Error("Key generation failed");
    }
};

// Generate random IV (12 bytes for GCM)
const generateIV = () => {
    const iv = CryptoJS.lib.WordArray.random(IV_SIZE);
    return iv.toString(CryptoJS.enc.Hex);
};

// Convert hex to base64
const hexToBase64 = (hex) => {
    const wordArray = CryptoJS.enc.Hex.parse(hex);
    return CryptoJS.enc.Base64.stringify(wordArray);
};

// Convert base64 to hex
const base64ToHex = (base64) => {
    const wordArray = CryptoJS.enc.Base64.parse(base64);
    return wordArray.toString(CryptoJS.enc.Hex);
};

// Encrypt text - 100% compatible with your Go EncryptGCM function
export const encryptText = async (plainText) => {
    try {
        if (!plainText) {
            throw new Error("Please enter text to encrypt");
        }

        const secretKey = generateSecretKey();
        console.log(secretKey)
        const iv = generateIV();

        // Encrypt using AES-GCM
        const encrypted = await AesGcmCrypto.encrypt(plainText, secretKey, iv);

        // The encrypted result should be ciphertext + authTag combined
        // Combine IV and encrypted data (same format as Go: iv + ciphertext)
        const combinedHex = iv + encrypted;
        console.log(combinedHex)

        // Convert to base64 (same as Go)
        return hexToBase64(combinedHex);

    } catch (error) {
        console.log(error);
        throw new Error("Encryption failed: " + error.message);
    }
};

// Decrypt text - 100% compatible with your Go DecryptGCM function
export const decryptText = async (encryptedBase64) => {
    try {
        if (!encryptedBase64) {
            throw new Error("Please enter text to decrypt");
        }

        const secretKey = generateSecretKey();

        // Convert from base64 to hex (same as Go)
        const combinedHex = base64ToHex(encryptedBase64);

        // Extract IV (first 24 hex chars = 12 bytes)
        const ivHex = combinedHex.substring(0, IV_SIZE * 2); // 12 bytes = 24 hex chars

        // Extract ciphertext (remaining hex chars)
        const ciphertextHex = combinedHex.substring(IV_SIZE * 2);

        // Decrypt using AES-GCM
        const decrypted = await AesGcmCrypto.decrypt(ciphertextHex, secretKey, ivHex);

        return decrypted;

    } catch (error) {
        throw new Error("Decryption failed: " + error.message);
    }
};

// Test function to verify compatibility
export const testCompatibility = async () => {
    try {
        const originalText = "Hello, World! This is a test message.";

        console.log("Original text:", originalText);

        // Encrypt
        const encrypted = await encryptText(originalText);
        console.log("Encrypted (Base64):", encrypted);

        // Decrypt
        const decrypted = await decryptText(encrypted);
        console.log("Decrypted text:", decrypted);

        // Verify
        if (originalText === decrypted) {
            console.log("✅ Compatibility test PASSED!");
            return { success: true, encrypted, decrypted };
        } else {
            console.log("❌ Compatibility test FAILED!");
            return { success: false, encrypted, decrypted };
        }

    } catch (error) {
        console.error("Test error:", error.message);
        return { success: false, error: error.message };
    }
};

// Alternative implementation if the library returns separate ciphertext and authTag
export const encryptTextAlt = async (plainText) => {
    try {
        if (!plainText) {
            throw new Error("Please enter text to encrypt");
        }

        const secretKey = generateSecretKey();
        const iv = generateIV();

        // Encrypt using AES-GCM
        const result = await AesGcmCrypto.encrypt(plainText, secretKey, iv);

        let ciphertextWithTag;

        // Handle different return formats from the library
        if (typeof result === 'object' && result.ciphertext && result.authTag) {
            // If library returns { ciphertext: "hex", authTag: "hex" }
            ciphertextWithTag = result.ciphertext + result.authTag;
        } else if (typeof result === 'string') {
            // If library returns combined ciphertext+authTag as hex string
            ciphertextWithTag = result;
        } else {
            throw new Error("Unexpected encryption result format");
        }

        // Combine IV and ciphertext+authTag (same as Go format)
        const combinedHex = iv + ciphertextWithTag;

        // Convert to base64
        return hexToBase64(combinedHex);

    } catch (error) {
        throw new Error("Encryption failed: " + error.message);
    }
};

