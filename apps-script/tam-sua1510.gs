
/* ===== Sửa CV 1864 Long Toàn bị duyệt 2 lần, mất ngày (chạy 1 lần) ===== */
function suaLongToan1510() {
  const LT = '3. KKT ĐỊNH AN/5. Khu cảng và dịch vụ cảng Long Toàn/2026';
  const log = [];
  const f = DriveApp.getFileById('1GvKHLQGWs_ISO36MtTuWaEPtKyOWCzuk');
  const d = getPath_(LT, true);
  f.moveTo(d);
  f.setName('15.10.2026 [Lập - Công bố QH] BQL KKT - CV 1864 lấy ý kiến nhiệm vụ QHPK Khu cảng và dịch vụ cảng Long Toàn.pdf');
  danhSo_(d);
  DriveApp.getFileById('1Ce6ZGf8Yi0yNhXkpSQyagu_Eqi7Oag9h').setTrashed(true);
  [['1rg8wtJgtOf2BQQYSfhvGUY-BfY5FJFaG', 'QH phân khu/2026'], ['1y4lVYzP8qlGUKmhQ5ImyZfEn81_72tnc', 'Long Toàn cũ/2026'], ['1O5mvhQPZVkm6Js6Wt7Jy0ERNpXyAxVPS', '4. QH phân khu Khu cảng Long Toàn']].forEach(([id, ten]) => {
    const fo = DriveApp.getFolderById(id);
    if (!fo.getFiles().hasNext() && !fo.getFolders().hasNext()) { fo.setTrashed(true); log.push('Bỏ thư mục trống: ' + ten); }
    else log.push('Giữ (còn nội dung): ' + ten);
  });
  const ss = SpreadsheetApp.openById(SHEET_ID), sh = ss.getSheetByName(TAB_DUAN);
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues();
  const bo = [];
  for (let i = v.length - 1; i >= 0; i--) if (String(v[i][3]).indexOf('4. QH phân khu Khu cảng Long Toàn') >= 0) { bo.push(String(v[i][0])); sh.deleteRow(i + 2); }
  const qh = ss.getSheetByName(TAB_QUANHE), w = qh.getRange(2, 1, Math.max(1, qh.getLastRow() - 1), 2).getValues();
  for (let i = w.length - 1; i >= 0; i--) if (bo.indexOf(String(w[i][0])) >= 0 || bo.indexOf(String(w[i][1])) >= 0) qh.deleteRow(i + 2);
  log.push('Xóa khỏi sơ đồ: ' + bo.join(', '));
  quetToanBo();
  Logger.log(JSON.stringify(log));
}
