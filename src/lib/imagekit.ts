import ImageKit from "imagekit"

export function imagekit() {
  if (!process.env.IMAGEKIT_PUBLIC_KEY) {
    throw new Error("IMAGEKIT_PUBLIC_KEY is not defined")
  }

  return new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  })
}
