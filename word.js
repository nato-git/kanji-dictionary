const imageZone = document.getElementById('image_zone');
// イベントリスナーはそのまま
// 注意: resizePinnedImage関数自体を async に変更します
imageZone.addEventListener('change', resizePinnedImage, false);

// ----------------------------------------------------
// 【A】CSVデータのロード処理 (修正なし、Promiseを返す関数)
// ----------------------------------------------------
async function loadKanjiData() {
  const csvfile = await fetch('kanji.csv');
  const csvtext = await csvfile.text();
  const rows = csvtext.split('\n').filter((row) => row.trim() !== ''); // 空行を除外

  const data = rows
    .map((row) => {
      const columns = row.split(',');
      if (columns.length < 3 || !columns[2]) return null; // データ不足行をスキップ

      return {
        音読み: columns[0],
        訓読み: columns[1],
        内容: columns[2], // 漢字本体
        部首: columns[3],
        画数: columns[4],
        熟語: columns[5],
      };
    })
    .filter((item) => item !== null);

  return data; // 漢字データの配列を返す
}

// ----------------------------------------------------
// 【B】メインのイベントハンドラ (asyncに変更して await を使用)
// ----------------------------------------------------
async function resizePinnedImage(e) {
  // ★★★ async function に変更 ★★★
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = 'ロード中...';

  const file = e.target.files[0];
  if (!file || !file.type.match('image.*')) {
    outputElement.innerHTML = '画像ファイルを選択してください。';
    return;
  }

  // ★★★ 修正点1: await を使用し、CSVロード完了を待って配列を取得 ★★★
  // これで kanjiData には配列が入ります
  const kanjiData = await loadKanjiData();

  // OCR開始
  Tesseract.recognize(file, 'jpn', { logger: (m) => console.log(m) })
    .then(({ data: { text } }) => {
      // 漢字のデータがロードされていることを確認
      if (!kanjiData || kanjiData.length === 0) {
        outputElement.innerHTML = 'CSVデータのロードに失敗しました。';
        return;
      }

      const recognizedChars = text.split('').join('、');
      outputElement.innerHTML = ''; // 出力エリアをクリア

      // 【修正点2】Set を使用して、CSVデータとの照合処理を高速化
      // 辞書引きを効率化するため、CSVデータから漢字の内容だけの Set を作成
      const knownKanjiSet = new Set(kanjiData.map((item) => item.内容));
      let matchedText = ''; // 結果を一時的に保持する文字列

      // 認識された文字を1文字ずつチェック
      for (const char of recognizedChars) {
        // Setを使って高速に照合
        if (knownKanjiSet.has(char)) {
          // CSVデータ（kanji.csv）に存在する漢字だけを連結
          matchedText += char;
        }
      }

      // 【修正点3】ループを抜けた後、最後に一度だけ出力する
      if (matchedText.length > 0) {
        outputElement.innerHTML = matchedText;
      } else {
        outputElement.innerHTML = '該当する漢字が見つかりませんでした。';
      }
    })
    .catch((error) => {
      // Tesseract のエラー処理
      console.error('OCR処理中にエラーが発生しました:', error);
      outputElement.innerHTML = 'OCR処理中にエラーが発生しました。';
    });
}
