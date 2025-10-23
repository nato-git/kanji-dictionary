const imageZone = document.getElementById('image_zone');
imageZone.addEventListener('change', resizePinnedImage, false);
function resizePinnedImage(e) {
  const file = e.target.files[0];
  if (!file.type.match('image.*')) {
    return;
  }
  Tesseract.recognize(
    file,
    'jpn', // 言語設定
    { logger: (m) => console.log(m) }
  ).then(({ data: { text } }) => {
    const out = document.getElementById('output');
    out.innerHTML = text;
  });
}
