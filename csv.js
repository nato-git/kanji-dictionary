// グローバルスコープで data を保持するための変数
let kanjiData = [];

// CSVを読み込み、dataを構築し、HTMLを生成する関数
async function csvFile() {
  const csvfile = await fetch('kanji.csv');
  const csvtext = await csvfile.text();
  const rows = csvtext.split('\n');

  // data を構築し、グローバル変数に格納する
  kanjiData = rows
    .map((row) => {
      const columns = row.split(',');
      // CSVファイルの行末に余分な空行がある場合に備えて、内容（columns[2]）が空でないかチェック
      if (!columns[2]) return null;

      return {
        音読み: columns[0],
        訓読み: columns[1],
        内容: columns[2],
        部首: columns[3],
        画数: columns[4],
        熟語: columns[5],
      };
    })
    .filter((item) => item !== null); // nullをフィルタリングして除外

  // AタグのHTMLを生成する処理
  for (let i = 0; i < kanjiData.length; i++) {
    // data.length が想定より短い場合、ここでエラーにならないように i < kanjiData.length の条件が必要

    //1年生
    if (i >= 0 && i <= 80) {
      document.getElementById('one').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //2年生
    else if (i >= 81 && i <= 240) {
      document.getElementById('two').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //3年生
    else if (i >= 241 && i <= 441) {
      document.getElementById('three').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //4年生
    else if (i >= 442 && i <= 642) {
      document.getElementById('four').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //5年生
    else if (i >= 643 && i <= 828) {
      document.getElementById('five').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
    //6年生
    else if (i >= 829 && i <= 1010) {
      document.getElementById('six').innerHTML += `
        <div>
          <a href=# onclick="kanjiButton(${i})">${kanjiData[i].内容}</a>
        </div>
      `;
    }
  }
}

function goBack(homeHTML) {
  document.getElementById('mains').innerHTML = homeHTML; // 保存したHTMLを復元
}

// グローバルスコープに配置された kanjiButton 関数
// クリック時に実行され、グローバルの kanjiData にアクセスする
function kanjiButton(i) {
  homeHTML = document.getElementById('mains').innerHTML; // 現在のHTMLを保存
  const kanjiHTML = `<div class="kanji">
    <h2>漢字：${kanjiData[i].内容}</h2>
    <p>音読み：${kanjiData[i].音読み}</p>
    <p>訓読み：${kanjiData[i].訓読み}</p>
    <p>部首：${kanjiData[i].部首}</p>
    <p>画数：${kanjiData[i].画数}</p>
    <p class="end">熟語：${kanjiData[i].熟語}</p>
    <a href=# onclick="goBack(${homeHTML})">戻る</a>
    </div>
  `;
  // kanjiData を使用して情報を表示
  document.getElementById('mains').innerHTML = kanjiHTML;
}

// 最後に実行
csvFile();
