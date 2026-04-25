// WebPFlow Image Processing Worker
self.onmessage = async (e) => {
  const { fileBlob, settings, id } = e.data;

  try {
    // We use OffscreenCanvas for background thread processing
    // Note: OffscreenCanvas is supported in modern browsers
    const bitmap = await createImageBitmap(fileBlob);
    let width = bitmap.width;
    let height = bitmap.height;

    if (settings.maxWidth && width > settings.maxWidth) {
      const ratio = settings.maxWidth / width;
      width = settings.maxWidth;
      height = height * ratio;
    }

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, width, height);

    const targetFormat = `image/${settings.format}`;
    const compressedBlob = await canvas.convertToBlob({
      type: targetFormat,
      quality: settings.quality
    });

    self.postMessage({
      id,
      success: true,
      compressedBlob,
      compressedSize: compressedBlob.size,
      format: settings.format
    });

    // Cleanup
    bitmap.close();
  } catch (error) {
    self.postMessage({
      id,
      success: false,
      error: error.message
    });
  }
};
