/**
 * API cho trang GitHub "quyhoach": quét Drive, tải lên, phân loại bằng Gemini, duyệt xếp thư mục.
 * Thuộc tính tập lệnh cần có: MA_KHOA (mã khóa tự đặt), GEMINI_KEY. Tùy chọn: GEMINI_MODEL.
 */
const ROOT_ID = '1-0DERAHpqrR7o7zLD6umF5BF3mr28XDc';        // thư mục QUY HOACH
const INBOX_PATH = '_TIN MOI/Chờ duyệt';                    // file tải lên nằm đây chờ duyệt
const CACHE_PATH = '_TIN MOI/_HANG CHO (bản tin ghi, script tải)';
const CACHE_NAME = 'so-do-cache.json';
const TAB_QUEUE = 'HÀNG CHỜ';
const NHAN = ['QĐ-QH', 'Pháp lý', 'Chủ trương - Tờ trình', 'Chỉ đạo', 'Đôn đốc', 'Phối hợp', 'Tiến độ', 'GPMB',
  'Lập - Công bố QH', 'Hồ sơ KT', 'Tham khảo - Dự thảo', 'Văn bản chung - Bản sao'];

const MA_KHOA_MAC_DINH = '__MAKHOA__';
function prop_(k) { return PropertiesService.getScriptProperties().getProperty(k) || (k === 'MA_KHOA' ? MA_KHOA_MAC_DINH : ''); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doPost(e) {
  let req = {};
  try { req = JSON.parse(e.postData.contents || '{}'); } catch (x) { return json_({ ok: false, err: 'Yêu cầu không hợp lệ' }); }
  if (!req.k || req.k !== prop_('MA_KHOA')) return json_({ ok: false, err: 'Sai mã khóa' });
  const lock = LockService.getScriptLock();
  try {
    const needLock = ['duyet', 'bo', 'phanloai', 'quet', 'vitri', 'quanhe'].indexOf(req.a) >= 0;
    if (needLock) lock.waitLock(60000);
    switch (req.a) {
      case 'datgemini': {
        const g = String(req.gemini || '').replace(/["'\s]/g, '');
        if (g.length < 20) throw new Error('API key Gemini quá ngắn – kiểm tra lại đã chép đủ chưa');
        const t = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=1&key=' + encodeURIComponent(g), { muteHttpExceptions: true });
        if (t.getResponseCode() !== 200) throw new Error('Google từ chối key (' + t.getResponseCode() + '): ' + ((JSON.parse(t.getContentText() || '{}').error || {}).message || '').slice(0, 160));
        PropertiesService.getScriptProperties().setProperty('GEMINI_KEY', g); return json_({ ok: true });
      }
      case 'tai': return json_({ ok: true, data: taiDuLieu_() });
      case 'token': return json_({ ok: true, token: ScriptApp.getOAuthToken(), folderId: getPath_(INBOX_PATH, true).getId() });
      case 'phanloai': return json_({ ok: true, row: phanLoai_(req.fileId, req.row, req.nguon) });
      case 'duyet': return json_({ ok: true, ket: duyet_(req) });
      case 'bo': return json_({ ok: true, ket: boQua_(req.row) });
      case 'quet': quetToanBo(); return json_({ ok: true });
      case 'vitri': return json_({ ok: true, ket: luuViTri_(req.items || []) });
      case 'quanhe': return json_({ ok: true, ket: themQuanHe_(req) });
      default: return json_({ ok: false, err: 'Lệnh không rõ: ' + req.a });
    }
  } catch (x) {
    return json_({ ok: false, err: String(x && x.message || x) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

/* ---------- Dữ liệu cho trang ---------- */
function taiDuLieu_() {
  const p = buildPayload_();
  p.queue = docHangCho_();
  p.nhan = NHAN;
  return p;
}

function docHangCho_() {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_QUEUE);
  if (!sh || sh.getLastRow() < 2) return [];
  const w = Math.max(12, sh.getLastColumn());
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, w).getDisplayValues();
  const out = [];
  v.forEach((r, i) => {
    if (String(r[5]).trim() !== 'Chờ duyệt') return;
    let ai = {}; try { ai = JSON.parse(r[11] || '{}'); } catch (x) {}
    out.push({ row: i + 2, ngay: r[0], ten: r[1], thuMuc: r[2], nguon: r[3], ghiChu: r[7], fileId: r[8], url: r[9], banSao: r[10], ai });
  });
  return out;
}

/* ---------- Quét Drive & bộ đệm ---------- */
function quetToanBo() {
  const root = DriveApp.getFolderById(ROOT_ID);
  const tree = scanFolder_(root, '');
  writeCache_(tree);
  PropertiesService.getScriptProperties().setProperty('QUET_LUC',
    'Quét lúc ' + Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd.MM.yyyy HH:mm'));
}

function scanFolder_(folder, path) {
  const node = { name: folder.getName(), id: folder.getId(), type: 'folder', url: folder.getUrl(), children: [] };
  const fs = folder.getFiles();
  while (fs.hasNext()) {
    const f = fs.next(), n = f.getName();
    if (n === CACHE_NAME) continue;
    const m = n.match(/(\d{2}\.\d{2}\.\d{4})/), tg = (n.match(/\[([^\]]+)\]/) || [])[1] || '';
    node.children.push({ name: n, id: f.getId(), type: 'file', url: f.getUrl(), tag: tg, date: m ? m[1] : '', copy: /Bản sao/i.test(n) });
  }
  const ds = folder.getFolders();
  while (ds.hasNext()) {
    const d = ds.next();
    if (!path && d.getName() === '_ZALO_TAM') { node.children.push({ name: d.getName(), id: d.getId(), type: 'folder', url: d.getUrl(), children: [] }); continue; }
    node.children.push(scanFolder_(d, path ? path + '/' + d.getName() : d.getName()));
  }
  return node;
}

function cacheFile_() {
  const dir = getPath_(CACHE_PATH, true);
  const it = dir.getFilesByName(CACHE_NAME);
  return it.hasNext() ? it.next() : null;
}
function readCache_() {
  try { const f = cacheFile_(); return f ? JSON.parse(f.getBlob().getDataAsString('UTF-8')) : null; } catch (x) { return null; }
}
function writeCache_(tree) {
  const s = JSON.stringify(tree), f = cacheFile_();
  if (f) f.setContent(s); else getPath_(CACHE_PATH, true).createFile(CACHE_NAME, s, 'application/json');
}

/** Quét lại riêng vài thư mục (sau khi duyệt) và vá vào bộ đệm. */
function vaCache_(paths) {
  const tree = readCache_();
  if (!tree) { quetToanBo(); return; }
  paths.forEach(p => {
    // tìm thư mục sâu nhất đã có trong bộ đệm (thư mục mới tạo thì quét lại từ thư mục cha)
    const segs = p.split('/').filter(Boolean);
    let node = tree, parent = null, depth = 0;
    for (const s of segs) {
      const c = (node.children || []).find(x => x.type === 'folder' && x.name === s);
      if (!c) break;
      parent = node; node = c; depth++;
    }
    const at = segs.slice(0, depth).join('/');
    const fresh = scanFolder_(at ? getPath_(at, false) : DriveApp.getFolderById(ROOT_ID), at);
    if (parent) parent.children[parent.children.indexOf(node)] = fresh;
    else { tree.children = fresh.children; }
  });
  writeCache_(tree);
}

/* ---------- Thư mục theo đường dẫn ---------- */
function getPath_(path, create) {
  let f = DriveApp.getFolderById(ROOT_ID);
  const segs = String(path || '').replace(/\\/g, '/').replace(/^QUY HOACH\//, '').split('/').map(s => s.trim()).filter(Boolean);
  for (const s of segs) {
    const it = f.getFoldersByName(s);
    if (it.hasNext()) f = it.next();
    else if (create) f = f.createFolder(s);
    else return null;
  }
  return f;
}

/* ---------- Phân loại bằng Gemini ---------- */
function phanLoai_(fileId, row, nguon) {
  const file = DriveApp.getFileById(fileId);
  const payload = buildPayload_();
  const projects = payload.nodes.map(n => n.id + ' | ' + n.label + ' | ' + n.path).join('\n');
  let ai, loiAI = '';
  try { ai = goiGemini_(file, projects); } catch (x) { ai = {}; loiAI = String(x.message || x).slice(0, 200); }
  const byId = {}; payload.nodes.forEach(n => byId[n.id] = n);
  const chinh = byId[ai.du_an_chinh] ? ai.du_an_chinh : '';
  const lienQuan = (ai.du_an_lien_quan || []).filter(id => byId[id] && id !== chinh);
  let nhan = NHAN.indexOf(ai.nhan) >= 0 ? ai.nhan : (ai.du_thao ? 'Tham khảo - Dự thảo' : 'Pháp lý');
  if (ai.du_thao && nhan !== 'Tham khảo - Dự thảo' && !/QĐ-QH/.test(nhan)) nhan = 'Tham khảo - Dự thảo';
  const ngay = /^\d{2}\.\d{2}\.\d{4}$/.test(ai.ngay || '') ? ai.ngay : '';
  const ext = (file.getName().match(/\.[A-Za-z0-9]{2,5}$/) || [''])[0].toLowerCase();
  const ten = loiAI ? file.getName() : sach_((ngay || 'xx.xx.' + new Date().getFullYear()) + ' [' + nhan + '] ' + (ai.co_quan || 'Chưa rõ cơ quan') + ' - ' +
    [ai.so_hieu, ai.trich_yeu].filter(Boolean).join(' ')) + ext;
  const nam = ngay ? ngay.slice(6) : String(new Date().getFullYear());
  const thuMuc = chinh ? byId[chinh].path + '/' + nam : '_KHAC';
  const ghiChu = loiAI ? 'Gemini chưa đọc được (' + loiAI.replace(/\s+/g, ' ').slice(0, 120) + ') – bấm "Phân loại lại"' : (ai.tom_tat || '') + (ai.ly_do ? ' — ' + ai.ly_do : '');

  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_QUEUE);
  const today = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd.MM.yyyy');
  const aiJson = JSON.stringify({ chinh, lienQuan, ngay, nhan, co_quan: ai.co_quan || '', so_hieu: ai.so_hieu || '', trich_yeu: ai.trich_yeu || '', tom_tat: ai.tom_tat || '', goc: file.getName() });
  if (row) {
    sh.getRange(row, 2, 1, 2).setValues([[ten, thuMuc]]);
    sh.getRange(row, 8).setValue(ghiChu);
    sh.getRange(row, 11, 1, 2).setValues([[lienQuan.join(', '), aiJson]]);
  } else {
    sh.appendRow([today, ten, thuMuc, nguon || 'Tải lên (web)', '', 'Chờ duyệt', false, ghiChu, file.getId(), file.getUrl(), lienQuan.join(', '), aiJson]);
    row = sh.getLastRow();
    sh.getRange(row, 5).setFormula('=HYPERLINK("' + file.getUrl() + '";"Xem")');
    sh.getRange(row, 7).insertCheckboxes();
  }
  return { row, ten, thuMuc, banSao: lienQuan.join(', '), ghiChu, ai: JSON.parse(aiJson), fileId: file.getId(), url: file.getUrl() };
}

function sach_(s) { return String(s).replace(/[\\\/:*?"<>|\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180); }

function goiGemini_(file, projects) {
  const key = prop_('GEMINI_KEY');
  if (!key) throw new Error('Chưa có GEMINI_KEY');
  let model = prop_('GEMINI_MODEL') || 'gemini-3.8-flash';
  const mime = file.getMimeType();
  let part;
  if (mime === 'application/pdf' || /^image\//.test(mime)) {
    const blob = file.getBlob();
    if (blob.getBytes().length <= 18 * 1024 * 1024) part = { inline_data: { mime_type: mime, data: Utilities.base64Encode(blob.getBytes()) } };
    else part = { file_data: { mime_type: mime, file_uri: taiLenGemini_(blob, key) } };
  } else {
    part = { text: 'NỘI DUNG VĂN BẢN:\n' + layChu_(file).slice(0, 60000) };
  }
  const prompt = [
    'Bạn phân loại văn bản hành chính Việt Nam về quy hoạch, đầu tư, đất đai khu vực tỉnh Trà Vinh cũ (nay thuộc tỉnh Vĩnh Long).',
    'Tên file gốc: ' + file.getName(),
    'Đọc trang đầu và phần ký. Trả về JSON đúng các trường:',
    '- ngay: ngày ban hành dạng dd.mm.yyyy (ngày ghi ở dòng "…, ngày … tháng … năm …"; nếu không có thì "")',
    '- co_quan: cơ quan ban hành viết gọn (vd "UBND tỉnh", "Sở Xây dựng", "Ban QLDA Giao thông", "UBND xã Ngũ Lạc")',
    '- so_hieu: số + loại văn bản viết gọn (vd "QĐ 5156", "CV 1674", "TTr 128", "BC 639", "TB 404"); dự thảo/không số thì ""',
    '- trich_yeu: trích yếu ngắn gọn ≤ 15 từ, không lặp lại số hiệu',
    '- nhan: một trong ' + JSON.stringify(NHAN),
    '- du_thao: true nếu là dự thảo/chưa ký/chưa đóng dấu',
    '- du_an_chinh: MÃ dự án phù hợp nhất trong danh sách dưới ("" nếu không có dự án nào phù hợp)',
    '- du_an_lien_quan: mảng MÃ các dự án khác được văn bản nhắc tới cụ thể (không gồm du_an_chinh)',
    '- tom_tat: 1–2 câu nội dung chính',
    '- ly_do: vì sao chọn dự án đó (ngắn)',
    'Quy tắc nhãn: quyết định phê duyệt quy hoạch → "QĐ-QH"; quyết định/nghị quyết pháp lý khác → "Pháp lý"; tờ trình, đề xuất chủ trương → "Chủ trương - Tờ trình"; báo cáo tiến độ → "Tiến độ"; bồi thường, giải phóng mặt bằng → "GPMB"; xin ý kiến, giấy mời phối hợp → "Phối hợp"; thuyết minh, bản vẽ, hồ sơ thiết kế → "Hồ sơ KT"; lấy ý kiến, công bố quy hoạch → "Lập - Công bố QH".',
    'DANH SÁCH DỰ ÁN (mã | tên | thư mục):', projects
  ].join('\n');
  const body = {
    contents: [{ role: 'user', parts: [part, { text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
  };
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + key;
  let r = UrlFetchApp.fetch(url, { method: 'post', contentType: 'application/json', payload: JSON.stringify(body), muteHttpExceptions: true });
  if (r.getResponseCode() === 404) { // model cũ bị ngừng: tự chọn bản Flash mới nhất rồi thử lại
    model = chonModel_(key);
    PropertiesService.getScriptProperties().setProperty('GEMINI_MODEL', model);
    r = UrlFetchApp.fetch(url.replace(/models\/[^:]+:/, 'models/' + model + ':'), { method: 'post', contentType: 'application/json', payload: JSON.stringify(body), muteHttpExceptions: true });
  }
  for (let i = 0; i < 3 && (r.getResponseCode() === 503 || r.getResponseCode() === 429); i++) { // quá tải: chờ rồi thử lại
    Utilities.sleep(6000 * (i + 1));
    r = UrlFetchApp.fetch(url.replace(/models\/[^:]+:/, 'models/' + model + ':'), { method: 'post', contentType: 'application/json', payload: JSON.stringify(body), muteHttpExceptions: true });
  }
  if (r.getResponseCode() !== 200) throw new Error('Gemini lỗi ' + r.getResponseCode() + ': ' + r.getContentText().slice(0, 300));
  const txt = (((JSON.parse(r.getContentText()).candidates || [])[0] || {}).content || { parts: [{ text: '{}' }] }).parts.map(p => p.text || '').join('');
  try { return JSON.parse(txt.replace(/^```json\s*|```\s*$/g, '')); } catch (x) { throw new Error('Gemini trả kết quả không đọc được'); }
}

function chonModel_(key) {
  const j = JSON.parse(UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200&key=' + key).getContentText());
  const ok = (j.models || []).filter(m => (m.supportedGenerationMethods || []).indexOf('generateContent') >= 0)
    .map(m => m.name.replace('models/', '')).filter(n => /^gemini-[\d.]+-flash$/.test(n));
  ok.sort((a, b) => parseFloat(b.split('-')[1]) - parseFloat(a.split('-')[1]));
  if (!ok.length) throw new Error('Không tìm thấy model Gemini Flash dùng được');
  return ok[0];
}

function taiLenGemini_(blob, key) {
  const bytes = blob.getBytes();
  const start = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/upload/v1beta/files?key=' + key, {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { 'X-Goog-Upload-Protocol': 'resumable', 'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': String(bytes.length), 'X-Goog-Upload-Header-Content-Type': blob.getContentType() },
    payload: JSON.stringify({ file: { display_name: 'quyhoach-' + Date.now() } })
  });
  const h = start.getAllHeaders(), up = h['x-goog-upload-url'] || h['X-Goog-Upload-URL'];
  if (!up) throw new Error('Không mở được phiên tải lên Gemini: ' + start.getContentText().slice(0, 200));
  const fin = UrlFetchApp.fetch(up, { method: 'post', payload: bytes, muteHttpExceptions: true,
    headers: { 'X-Goog-Upload-Offset': '0', 'X-Goog-Upload-Command': 'upload, finalize' } });
  const f = JSON.parse(fin.getContentText()).file;
  for (let i = 0; i < 20 && f.state === 'PROCESSING'; i++) {
    Utilities.sleep(2000);
    const g = JSON.parse(UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/' + f.name + '?key=' + key).getContentText());
    f.state = g.state;
  }
  return f.uri;
}

/** Lấy chữ từ Word/Google Doc: chuyển tạm sang Google Doc rồi xuất text. */
function layChu_(file) {
  const tok = ScriptApp.getOAuthToken(), mime = file.getMimeType();
  if (mime === 'application/vnd.google-apps.document') return DocumentApp.openById(file.getId()).getBody().getText();
  const c = UrlFetchApp.fetch('https://www.googleapis.com/drive/v3/files/' + file.getId() + '/copy', {
    method: 'post', contentType: 'application/json', headers: { Authorization: 'Bearer ' + tok }, muteHttpExceptions: true,
    payload: JSON.stringify({ name: 'tmp-' + Date.now(), mimeType: 'application/vnd.google-apps.document' })
  });
  if (c.getResponseCode() !== 200) return '';
  const id = JSON.parse(c.getContentText()).id;
  try {
    return UrlFetchApp.fetch('https://www.googleapis.com/drive/v3/files/' + id + '/export?mimeType=text/plain',
      { headers: { Authorization: 'Bearer ' + tok } }).getContentText();
  } finally { DriveApp.getFileById(id).setTrashed(true); }
}

/* ---------- Duyệt: đổi tên, đánh STT, chuyển thư mục, chép bản sao ---------- */
function duyet_(req) {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_QUEUE);
  const r = sh.getRange(req.row, 1, 1, 12).getValues()[0];
  if (String(r[5]).trim() !== 'Chờ duyệt') throw new Error('Dòng ' + req.row + ' không còn ở trạng thái Chờ duyệt');
  const fileId = String(r[8]);
  const ten = sach_(String(req.ten || r[1]).replace(/^\d+\.\s*/, '').replace(/\.[A-Za-z0-9]{2,5}$/, '')) +
    ((String(req.ten || r[1]).match(/\.[A-Za-z0-9]{2,5}$/) || [''])[0]);
  const thuMuc = String(req.thuMuc || r[2]).replace(/\\/g, '/').replace(/^QUY HOACH\//, '').replace(/\/+$/, '');
  const dich = getPath_(thuMuc, true);
  const file = DriveApp.getFileById(fileId);
  file.moveTo(dich);
  file.setName(ten);
  danhSo_(dich);
  const doiCho = [thuMuc];

  // Bản sao sang các dự án liên quan
  const ids = String(req.banSao != null ? req.banSao : r[10] || '').split(/[,;\s]+/).filter(Boolean);
  if (ids.length) {
    const payload = buildPayload_(), byId = {}; payload.nodes.forEach(n => byId[n.id] = n);
    const segs = thuMuc.split('/'), goc = segs.filter(s => !/^\d{4}$/.test(s));
    const gocTai = goc[0] + ' - ' + goc[goc.length - 1].replace(/^\d+\.\s*/, '');
    const m = ten.match(/^(\d{2}\.\d{2}\.\d{4}|xx\.xx\.\d{4})\s*\[[^\]]+\]\s*(.*?)(\.[A-Za-z0-9]{2,5})?$/);
    const nam = (ten.match(/\d{4}/) || [String(new Date().getFullYear())])[0];
    ids.forEach(id => {
      const n = byId[id]; if (!n) return;
      const p = n.path + '/' + nam, d = getPath_(p, true);
      const tenSao = m ? m[1] + ' [Văn bản chung - Bản sao] ' + m[2] + ' (gốc tại ' + gocTai + ')' + (m[3] || '') : ten;
      file.makeCopy(sach_(tenSao.replace(/(\.[A-Za-z0-9]{2,5})$/, '')) + ((tenSao.match(/\.[A-Za-z0-9]{2,5}$/) || [''])[0]), d);
      danhSo_(d);
      doiCho.push(p);
    });
  }
  sh.getRange(req.row, 2, 1, 2).setValues([[file.getName(), thuMuc]]);
  sh.getRange(req.row, 6, 1, 2).setValues([['Đã xếp', true]]);
  sh.getRange(req.row, 11).setValue(ids.join(', '));
  vaCache_(doiCho);
  return { ten: file.getName(), thuMuc, banSao: ids };
}

/** Đánh lại STT các file có ngày trong một thư mục, theo ngày ban hành. */
function danhSo_(folder) {
  const list = [];
  const it = folder.getFiles();
  while (it.hasNext()) {
    const f = it.next(), n = f.getName();
    const m = n.match(/^(?:(\d+)\.\s*)?(\d{2}|xx)\.(\d{2}|xx)\.(\d{4})\s+(.*)$/);
    if (!m) continue;
    const key = m[4] + (m[3] === 'xx' ? '99' : m[3]) + (m[2] === 'xx' ? '99' : m[2]);
    list.push({ f, key, old: m[1] ? Number(m[1]) : 9999, rest: m[2] + '.' + m[3] + '.' + m[4] + ' ' + m[5], name: n });
  }
  list.sort((a, b) => a.key.localeCompare(b.key) || a.old - b.old || a.rest.localeCompare(b.rest));
  list.forEach((x, i) => { const nn = (i + 1) + '. ' + x.rest; if (nn !== x.name) x.f.setName(nn); });
}

function boQua_(row) {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_QUEUE);
  const r = sh.getRange(row, 1, 1, 10).getValues()[0];
  if (String(r[5]).trim() !== 'Chờ duyệt') throw new Error('Dòng không còn chờ duyệt');
  try { DriveApp.getFileById(String(r[8])).setTrashed(true); } catch (x) {}
  sh.getRange(row, 6).setValue('Bỏ (thùng rác)');
  return true;
}

/* ---------- Sửa sơ đồ từ trang ---------- */
function luuViTri_(items) {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_DUAN);
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(r => String(r[0]));
  items.forEach(it => {
    const i = v.indexOf(it.id);
    if (i >= 0) sh.getRange(i + 2, 5, 1, 2).setValues([[Math.round(it.x), Math.round(it.y)]]);
    if (i >= 0 && it.group) sh.getRange(i + 2, 3).setValue(it.group);
  });
  return items.length;
}

function themQuanHe_(req) {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_QUANHE);
  if (req.xoa) {
    const v = sh.getRange(2, 1, Math.max(1, sh.getLastRow() - 1), 2).getValues();
    for (let i = v.length - 1; i >= 0; i--) if (v[i][0] === req.s && v[i][1] === req.t) sh.deleteRow(i + 2);
    return 'xoa';
  }
  sh.appendRow([req.s, req.t, req.loai || 'Cụ thể hóa', req.l || '']);
  return 'them';
}
