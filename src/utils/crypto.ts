import { nativeStorage } from "./nativeStorage";

const subtle = window.crypto.subtle
const iv = new Uint8Array([188, 185, 57, 146, 246, 194, 114, 34, 12, 80, 198, 77])
const enc = new TextEncoder();
const dec = new TextDecoder('utf-8')

function importKey (key: JsonWebKey) {
  return subtle.importKey('jwk', key, {
    name: "AES-GCM"
  }, true, ['decrypt', 'encrypt'])
}

async function getCryptoKey () {
  let data = await nativeStorage.get('cryptoKey') || null

  if (data) {
    return importKey(JSON.parse(data))
  }

  let cryptoKey = await subtle.generateKey({ name: "AES-GCM", length: 128 }, true, ["encrypt", "decrypt"])

  await nativeStorage.set('cryptoKey',JSON.stringify(await subtle.exportKey('jwk', cryptoKey)))

  return cryptoKey
}

let keys = await getCryptoKey()

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// export async function encrypt(data: string) {
// 	const buffer = await subtle.encrypt(
// 	    {
// 	      name: "AES-GCM",
// 	      iv: iv,
// 	      tagLength: 128,
// 	    },
// 	    keys,
// 	    enc.encode(data)
// 	)
//   return arrayBufferToBase64(buffer)
// }

// export async function decrypt(data: string) {
// 	const buffer = await subtle.decrypt(
// 	    {
// 	        name: "AES-GCM",
// 	        iv: iv,
// 	        tagLength: 128,
// 	    },
// 	    keys,
//       base64ToArrayBuffer(data)
// 	)
//   return dec.decode(buffer)
// }
