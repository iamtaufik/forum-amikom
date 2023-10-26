import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  urlEndpoint: String(process.env.IMAGEKIT_URL_ENDPOINT),
  publicKey: String(process.env.IMAGEKIT_PUBLIC_KEY),
  privateKey: String(process.env.IMAGEKIT_PRIVATE_KEY),
});

export default imagekit;
