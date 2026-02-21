import ImageKit from "@imagekit/nodejs"

export function imagekit() {
  if (!process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined")
  }

  return new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  })
}
