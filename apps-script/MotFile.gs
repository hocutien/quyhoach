/**
 * SƠ ĐỒ QUAN HỆ QUY HOẠCH – Web App tự cập nhật
 * Đọc cây thư mục từ tab DATA của "0. MỤC LỤC QUY HOẠCH" (do script Mục lục tự ghi),
 * cộng với 2 tab cấu hình do anh tự sửa:
 *   SD_DUAN   : danh sách dự án (mã, tên hiển thị, nhóm, thư mục, X, Y, theo dõi)
 *   SD_QUANHE : quan hệ nhập tay (từ mã, đến mã, loại, ghi chú)
 * Quan hệ "Văn bản chung" tự sinh từ các file Bản sao có ghi "(gốc tại …)".
 * Thư mục dự án mới chưa có trong SD_DUAN sẽ tự thêm vào nhóm "Chưa xếp".
 */
const SHEET_ID = '1zEcTvKK_57AJ3hAUdj9JvW9uTnrpvZEhQlTq4xM321I';
const TAB_DUAN = 'SD_DUAN';
const TAB_QUANHE = 'SD_QUANHE';
const HDR_DUAN = ['Mã', 'Tên hiển thị', 'Nhóm', 'Thư mục (trong QUY HOACH)', 'X', 'Y', 'Theo dõi'];
const HDR_QUANHE = ['Từ (mã)', 'Đến (mã)', 'Loại (Cụ thể hóa / Kết nối GT / Văn bản chung)', 'Ghi chú'];
const SEED = {"duan": [["ct33", "Cao tốc CT.33", "Quốc gia – ngành", "1. QUỐC GIA - NGÀNH/Cao tốc CT.33", 0, 0, false], ["ql60", "QL60 Cổ Chiên – Đại Ngãi", "Quốc gia – ngành", "1. QUỐC GIA - NGÀNH/QL60 Cổ Chiên - Đại Ngãi", 240, 0, false], ["ct36", "Cao tốc CT.36 Hồng Ngự – Trà Vinh", "Quốc gia – ngành", "1. QUỐC GIA - NGÀNH/CT.36 Hồng Ngự - Trà Vinh (đoạn An Hữu - Trà Vinh)", 480, 0, true], ["ql53", "QL53 nâng cấp mở rộng", "Quốc gia – ngành", "1. QUỐC GIA - NGÀNH/QL53 nâng cấp mở rộng", 720, 0, false], ["cangtv", "Cảng biển Trà Vinh", "Quốc gia – ngành", "1. QUỐC GIA - NGÀNH/Cảng biển Trà Vinh", 960, 0, false], ["qhtv", "QH tỉnh Trà Vinh cũ 2021–2030", "Tỉnh – quy hoạch, chính sách", "2. TỈNH/QH tỉnh Trà Vinh cũ 2021-2030", 0, 250, false], ["qhvl", "QH tỉnh Vĩnh Long 2021–2030", "Tỉnh – quy hoạch, chính sách", "2. TỈNH/QH tỉnh Vĩnh Long 2021-2030", 240, 250, false], ["dgh", "Địa giới hành chính", "Tỉnh – quy hoạch, chính sách", "2. TỈNH/Địa giới hành chính", 0, 350, false], ["giadat", "Giá đất – bồi thường", "Tỉnh – quy hoạch, chính sách", "2. TỈNH/Giá đất - bồi thường", 240, 350, false], ["csdd", "Chính sách đất đai (tách thửa, hạn mức)", "Tỉnh – quy hoạch, chính sách", "2. TỈNH/Chính sách đất đai (tách thửa, hạn mức)", 0, 450, false], ["ccn", "Đề án phát triển cụm công nghiệp", "Tỉnh – quy hoạch, chính sách", "2. TỈNH/Đề án phát triển cụm công nghiệp", 240, 450, false], ["nq274", "Khu đô thị – KDC nông thôn (NQ 274)", "Tỉnh – quy hoạch, chính sách", "2. TỈNH/Khu đô thị - KDC nông thôn (NQ 274)", 0, 550, false], ["ditich", "Tu bổ di tích Căn cứ Tỉnh ủy", "Tỉnh – quy hoạch, chính sách", "2. TỈNH/Tu bổ di tích Căn cứ Tỉnh ủy Trà Vinh", 240, 550, false], ["datd", "Dự án trọng điểm – đầu tư công", "Tỉnh – dự án", "2. TỈNH/Dự án trọng điểm - đầu tư công", 660, 250, false], ["ngoains", "Dự án ngoài ngân sách (tư nhân)", "Tỉnh – dự án", "2. TỈNH/Dự án đầu tư ngoài ngân sách (tư nhân)", 1140, 250, false], ["hlvb", "Đường hành lang ven biển (đoạn TV cũ)", "Tỉnh – dự án", "2. TỈNH/Đường hành lang ven biển (đoạn Trà Vinh cũ)", 540, 370, true], ["dt913", "ĐT913 (QL54 – ĐT915)", "Tỉnh – dự án", "2. TỈNH/Dự án trọng điểm - đầu tư công/ĐT913 (QL54 - ĐT915)", 780, 370, false], ["venbien", "Đường ven biển BT – TG – TV (cầu Hàm Luông 2)", "Tỉnh – dự án", "2. TỈNH/Dự án trọng điểm - đầu tư công/Đường bộ ven biển kết nối Bến Tre - Tiền Giang - Trà Vinh (cầu Hàm Luông 2)", 540, 470, false], ["dt915b", "ĐT915B – 07 cầu trên tuyến", "Tỉnh – dự án", "2. TỈNH/ĐT915B - Xây dựng 07 cầu trên tuyến", 780, 470, false], ["ql54dh38", "Đường QL54 – ĐH38 (Tập Sơn)", "Tỉnh – dự án", "2. TỈNH/Đường kết nối QL54 - ĐH38 (Tập Sơn)", 540, 570, false], ["kccc", "KCN Cổ Chiên (Nhị Long)", "Tỉnh – dự án", "2. TỈNH/KCN Cổ Chiên (Nhị Long)", 1020, 370, false], ["kccq", "KCN Cầu Quan (Tân Hòa)", "Tỉnh – dự án", "2. TỈNH/KCN Cầu Quan (Tân Hòa)", 1260, 370, false], ["lna", "QHC xã Lưu Nghiệp Anh đến 2050", "QH chung xã", "6. QH CHUNG XÃ (sau sáp nhập 2025)/Xã Lưu Nghiệp Anh (Lưu Nghiệp Anh + An Quảng Hữu, Trà Cú cũ)", 1140, 520, false], ["kkt", "QH chung KKT Định An", "KKT Định An", "3. KKT ĐỊNH AN/0. QH chung KKT", 380, 720, true], ["dhqhc", "QH chung đô thị Duyên Hải", "Đô thị Duyên Hải", "3. KKT ĐỊNH AN/1. Đô thị Duyên Hải/1. QH chung", 0, 840, false], ["dhpk", "QH phân khu (Dân Thành, Trường Long Hòa…)", "Đô thị Duyên Hải", "3. KKT ĐỊNH AN/1. Đô thị Duyên Hải/2. QH phân khu", 0, 940, false], ["dhct", "QH chi tiết 1/500", "Đô thị Duyên Hải", "3. KKT ĐỊNH AN/1. Đô thị Duyên Hải/3. QH chi tiết 1-500", 0, 1040, false], ["d1b", "D1B – Dân Thành", "Đô thị Duyên Hải", "3. KKT ĐỊNH AN/1. Đô thị Duyên Hải/4. D1B - Dân Thành", 240, 940, false], ["d3a", "D3A – Đường vành đai phía tây sông Long Toàn", "Đô thị Duyên Hải", "3. KKT ĐỊNH AN/1. Đô thị Duyên Hải/5. D3A - Xây dựng Đường vành đai phía tây sông Long Toàn", 240, 1040, true], ["ke", "Kè chống sạt lở bờ biển Trường Long Hòa", "Đô thị Duyên Hải", "3. KKT ĐỊNH AN/1. Đô thị Duyên Hải/6. Kè chống sạt lở bờ biển Trường Long Hòa", 240, 840, false], ["dt914", "Đường vào KCN – ĐT914", "KCN Ngũ Lạc", "3. KKT ĐỊNH AN/2. KCN Ngũ Lạc/Đường vào KCN - ĐT914", 520, 900, true], ["gpmbnl", "GPMB KCN Ngũ Lạc", "KCN Ngũ Lạc", "3. KKT ĐỊNH AN/2. KCN Ngũ Lạc/GPMB KCN Ngũ Lạc", 520, 1000, false], ["cangda", "Cảng – Bến tổng hợp Định An", "KKT Định An", "3. KKT ĐỊNH AN/3. Cảng - Bến tổng hợp Định An", 740, 900, false], ["tv2045", "QHC TP Trà Vinh mở rộng 2045", "TP Trà Vinh", "4. ĐÔ THỊ NGOÀI KKT/TP Trà Vinh/QHC TP Trà Vinh mở rộng 2045", 1000, 760, false], ["tv2050", "QHC đô thị Trà Vinh 2050", "TP Trà Vinh", "4. ĐÔ THỊ NGOÀI KKT/TP Trà Vinh/QHC đô thị Trà Vinh 2050", 1240, 760, false], ["kdct1", "Khu dân cư Tuyến số 1", "TP Trà Vinh", "4. ĐÔ THỊ NGOÀI KKT/TP Trà Vinh/Khu dân cư Tuyến số 1", 1000, 860, false], ["tnp7", "KĐT Tây Nam phường 7", "TP Trà Vinh", "4. ĐÔ THỊ NGOÀI KKT/TP Trà Vinh/KĐT Tây Nam phường 7", 1240, 860, false], ["pali", "Mở rộng Trường Pali – Khmer", "TP Trà Vinh", "4. ĐÔ THỊ NGOÀI KKT/TP Trà Vinh/Mở rộng Trường Trung cấp Pali - Khmer", 1000, 960, false], ["ctct", "Châu Thành – Tiểu Cần", "Đô thị ngoài KKT", "4. ĐÔ THỊ NGOÀI KKT/Châu Thành - Tiểu Cần", 1240, 1020, false], ["sdd0", "QHSDĐ – KHSDĐ cấp tỉnh", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/0. Cấp tỉnh", 0, 1220, false], ["sdd_0", "KHSDĐ TX Duyên Hải", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/TX Duyên Hải", 240, 1220, false], ["sdd_1", "KHSDĐ Huyện Duyên Hải", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/Huyện Duyên Hải", 480, 1220, false], ["sdd_2", "KHSDĐ Huyện Trà Cú", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/Huyện Trà Cú", 720, 1220, false], ["sdd_3", "KHSDĐ Huyện Cầu Ngang", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/Huyện Cầu Ngang", 960, 1220, false], ["sdd_4", "KHSDĐ Huyện Châu Thành", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/Huyện Châu Thành", 1200, 1220, false], ["sdd_5", "KHSDĐ TP Trà Vinh", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/TP Trà Vinh", 240, 1320, false], ["sdd_6", "KHSDĐ Huyện Càng Long", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/Huyện Càng Long", 480, 1320, false], ["sdd_7", "KHSDĐ Huyện Cầu Kè", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/Huyện Cầu Kè", 720, 1320, false], ["sdd_8", "KHSDĐ Huyện Tiểu Cần", "Sử dụng đất", "5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/Huyện Tiểu Cần", 960, 1320, false]], "quanhe": [["qhtv", "qhvl", "Cụ thể hóa", "Thay thế sau hợp nhất tỉnh 2025"], ["qhvl", "kkt", "Cụ thể hóa", "QH tỉnh xác định KKT"], ["qhvl", "sdd0", "Cụ thể hóa", "Phân bổ chỉ tiêu sử dụng đất"], ["qhvl", "lna", "Cụ thể hóa", "QH chung xã tuân thủ QH tỉnh"], ["qhvl", "tv2050", "Cụ thể hóa", "Định hướng đô thị"], ["qhvl", "ctct", "Cụ thể hóa", "Định hướng đô thị"], ["qhvl", "ccn", "Cụ thể hóa", "Phương án CCN"], ["qhvl", "kccc", "Cụ thể hóa", "Phương án KCN"], ["qhvl", "kccq", "Cụ thể hóa", "Phương án KCN"], ["qhvl", "nq274", "Cụ thể hóa", "Phương án đô thị – nông thôn"], ["cangtv", "cangda", "Cụ thể hóa", "Bến Định An thuộc cảng biển Trà Vinh"], ["kkt", "dhqhc", "Cụ thể hóa", "Đô thị trong KKT"], ["dhqhc", "dhpk", "Cụ thể hóa", "Cụ thể hóa"], ["dhpk", "dhct", "Cụ thể hóa", "Cụ thể hóa"], ["dhpk", "d1b", "Cụ thể hóa", "QĐ 652 – tuyến D1B lộ giới 36m"], ["dhqhc", "d3a", "Cụ thể hóa", "Hạ tầng đô thị Duyên Hải"], ["dhqhc", "ke", "Cụ thể hóa", "Hạ tầng ven biển"], ["kkt", "dt914", "Cụ thể hóa", "Đường vào KCN Ngũ Lạc"], ["kkt", "gpmbnl", "Cụ thể hóa", "KCN trong KKT"], ["kkt", "cangda", "Cụ thể hóa", "Khu cảng trong KKT"], ["tv2045", "tv2050", "Cụ thể hóa", "Thay thế bằng QHC 2050"], ["tv2050", "kdct1", "Cụ thể hóa", "Dự án trong đô thị"], ["tv2050", "tnp7", "Cụ thể hóa", "Dự án trong đô thị"], ["tv2050", "pali", "Cụ thể hóa", "Dự án trong đô thị"], ["datd", "dt913", "Cụ thể hóa", "Thư mục con"], ["datd", "venbien", "Cụ thể hóa", "Thư mục con"], ["ct36", "ct33", "Kết nối GT", "CV 1674 – nút giao Km60+400"], ["ct36", "ql60", "Kết nối GT", "CV 1674 – nút giao Km51+500"], ["ct36", "ql53", "Kết nối GT", "CV 1674 – điểm cuối giao QL53 tại Ngũ Lạc"], ["ct36", "dt914", "Kết nối GT", "CV 1674 – điểm cuối Km85 giao ĐT914, xã Ngũ Lạc"], ["dt914", "gpmbnl", "Kết nối GT", "Tuyến vào KCN"]]};

function doGet() {
  return HtmlService.createHtmlOutput('<p style="font-family:sans-serif">Mở trang quản lý: <a href="https://hocutien.github.io/quyhoach/" target="_top">hocutien.github.io/quyhoach</a></p>');
}

/** Chạy tay 1 lần: tạo tab cấu hình, quét Drive lần đầu, đặt lịch quét mỗi giờ. */
function caiDat() {
  quetToanBo();
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === 'quetToanBo').forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('quetToanBo').timeBased().everyHours(1).create();
  const p = buildPayload_();
  Logger.log('OK: %s dự án, %s quan hệ, %s văn bản', p.nodes.length, p.edges.length,
    p.nodes.reduce((s, n) => s + n.docs.length, 0));
}

function buildPayload_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const tree = readCache_() || readTree_(ss);
  const cfg = ensureConfig_(ss);
  let updated = '';
  updated = PropertiesService.getScriptProperties().getProperty('QUET_LUC') || '';
  if (!updated) try { updated = String(ss.getSheetByName('THỐNG KÊ').getRange('A1').getDisplayValue()); } catch (e) {}
  const res = buildFromTree_(tree, cfg.duan, cfg.quanhe);
  if (res.newRows.length) {
    const sh = ss.getSheetByName(TAB_DUAN);
    sh.getRange(sh.getLastRow() + 1, 1, res.newRows.length, HDR_DUAN.length).setValues(res.newRows);
  }
  res.payload.updated = updated;
  return res.payload;
}

function readTree_(ss) {
  const sh = ss.getSheetByName('DATA');
  if (!sh) throw new Error('Không thấy tab DATA trong Mục lục.');
  const vals = sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => String(r[0] || '')).filter(s => s);
  const joined = vals.map(s => s.charAt(0) === 'J' ? s.slice(1) : s).join('');
  return JSON.parse(joined);
}

function ensureConfig_(ss) {
  let a = ss.getSheetByName(TAB_DUAN);
  if (!a) {
    a = ss.insertSheet(TAB_DUAN);
    a.getRange(1, 1, 1, HDR_DUAN.length).setValues([HDR_DUAN]).setFontWeight('bold');
    a.getRange(2, 1, SEED.duan.length, HDR_DUAN.length).setValues(SEED.duan);
    a.setFrozenRows(1);
  }
  let b = ss.getSheetByName(TAB_QUANHE);
  if (!b) {
    b = ss.insertSheet(TAB_QUANHE);
    b.getRange(1, 1, 1, HDR_QUANHE.length).setValues([HDR_QUANHE]).setFontWeight('bold');
    b.getRange(2, 1, SEED.quanhe.length, HDR_QUANHE.length).setValues(SEED.quanhe);
    b.setFrozenRows(1);
  }
  const rd = sh => sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues() : [];
  return { duan: rd(a), quanhe: rd(b) };
}

/* ---------- Phần xử lý thuần (không gọi dịch vụ Google) ---------- */
function buildFromTree_(tree, duanRows, quanheRows) {
  const folders = {}, files = [];
  (function walk(node, path) {
    (node.children || []).forEach(c => {
      const p = path ? path + '/' + c.name : c.name;
      if (c.type === 'folder') { folders[p] = { url: c.url, children: c.children || [] }; walk(c, p); }
      else files.push({ folder: path, name: c.name, url: c.url || '', tag: c.tag || '', date: c.date || '', copy: !!c.copy });
    });
  })(tree, '');

  const isYear = s => /^\d{4}$/.test(s);
  const isAux = s => /^Hồ sơ/i.test(s);
  const segs = p => p.split('/');
  // Phát hiện thư mục dự án: có thư mục năm hoặc có file trực tiếp; không nằm trong năm/hồ sơ kèm/_xxx
  const detected = Object.keys(folders).filter(p => {
    const s = segs(p);
    if (s.length < 2 || s[0].charAt(0) === '_') return false;
    if (s.some(x => isYear(x) || isAux(x))) return false;
    const kids = folders[p].children;
    return kids.some(c => c.type === 'folder' && isYear(c.name)) || kids.some(c => c.type !== 'folder');
  });

  const nodes = [], byPath = {}, newRows = [];
  duanRows.forEach(r => {
    const id = String(r[0] || '').trim(), path = String(r[3] || '').trim().replace(/\\/g, '/').replace(/^QUY HOACH\//, '');
    if (!id || !path) return;
    const n = { id, label: String(r[1] || path.split('/').pop()), group: String(r[2] || 'Chưa xếp'), path,
      x: r[4] === '' ? null : Number(r[4]), y: r[5] === '' ? null : Number(r[5]),
      watch: r[6] === true || String(r[6]).toUpperCase() === 'TRUE', url: (folders[path] || {}).url || '', missing: !folders[path], docs: [] };
    nodes.push(n); byPath[path] = n;
  });
  let k = 1;
  detected.filter(p => !byPath[p]).forEach(p => {
    let id; do { id = 'moi_' + (k++); } while (nodes.some(n => n.id === id));
    const n = { id, label: p.split('/').pop(), group: 'Chưa xếp', path: p, x: null, y: null, watch: false, url: folders[p].url, missing: false, docs: [] };
    nodes.push(n); byPath[p] = n;
    newRows.push([id, n.label, 'Chưa xếp', p, '', '', false]);
  });

  // Gán file vào dự án gần nhất (đi ngược lên cây)
  files.forEach(f => {
    let p = f.folder, sub = [];
    while (p && !byPath[p]) { const s = segs(p); sub.unshift(s.pop()); p = s.join('/'); }
    if (!p) return;
    byPath[p].docs.push({ n: f.name.replace(/(\.signed)*\.[a-z0-9]{2,5}$/i, ''), d: toIso_(f.date), tag: f.tag, url: f.url, copy: f.copy, s: sub.join('/') });
  });

  // Vị trí tự động cho dự án chưa có X,Y
  const placed = nodes.filter(n => n.x !== null && !isNaN(n.x) && n.y !== null && !isNaN(n.y));
  let maxY = placed.reduce((m, n) => Math.max(m, n.y), 0) + 220, col = 0;
  nodes.forEach(n => { if (!(placed.indexOf(n) >= 0)) { n.x = (col % 5) * 240; n.y = maxY + Math.floor(col / 5) * 100; col++; } });

  // Quan hệ nhập tay
  const ids = {}; nodes.forEach(n => ids[n.id] = n);
  const typeKey = t => { t = String(t || '').toLowerCase(); return t.indexOf('kết nối') >= 0 ? 'ketnoi' : t.indexOf('văn bản') >= 0 ? 'vb' : 'cuthe'; };
  const edges = [], pair = {};
  quanheRows.forEach(r => {
    const a = String(r[0] || '').trim(), b = String(r[1] || '').trim();
    if (!ids[a] || !ids[b]) return;
    edges.push({ s: a, t: b, k: typeKey(r[2]), l: String(r[3] || ''), m: true });
    pair[a + '|' + b] = pair[b + '|' + a] = true;
  });

  // Quan hệ "Văn bản chung" tự sinh từ file Bản sao
  const norm = s => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}.]+/gu, ' ').trim().split(/\s+/).filter(Boolean);
  const auto = {};
  nodes.forEach(n => n.docs.forEach(d => {
    const m = d.n.match(/\(gốc tại\s+(.+?)\)\s*$/i); if (!m) return;
    const want = norm(m[1].split(' - ').pop());
    let best = null, bestScore = 0, tie = false;
    nodes.forEach(o => {
      if (o === n) return;
      const have = norm(o.path.split('/').pop());
      const sc = want.filter(w => have.indexOf(w) >= 0).length / want.length;
      if (sc > bestScore) { best = o; bestScore = sc; tie = false; } else if (sc === bestScore && sc > 0) tie = true;
    });
    if (!best || bestScore < 0.75 || tie) return;
    const num = (d.n.match(/\b(QĐ|CV|BC|TB|TTr|GM|KH|NQ|TT)\s?\d+/) || [])[0] || 'văn bản';
    const key = best.id + '|' + n.id;
    (auto[key] = auto[key] || { s: best.id, t: n.id, k: 'vb', set: [] });
    if (auto[key].set.indexOf(num) < 0) auto[key].set.push(num);
  }));
  Object.keys(auto).forEach(key => {
    const e = auto[key];
    if (pair[e.s + '|' + e.t]) { // đã có quan hệ nhập tay: bổ sung số VB vào ghi chú
      const ex = edges.find(x => (x.s === e.s && x.t === e.t) || (x.s === e.t && x.t === e.s));
      if (ex && ex.l.indexOf(e.set[0]) < 0) ex.l += (ex.l ? ' · ' : '') + e.set.join(' · ');
      return;
    }
    edges.push({ s: e.s, t: e.t, k: 'vb', l: e.set.join(' · ') });
  });

  return { payload: { nodes, edges }, newRows };
}

function toIso_(d) {
  const m = String(d || '').match(/(\d{2})\.(\d{2})\.(\d{4})/);
  return m ? m[3] + '-' + m[2] + '-' + m[1] : '';
}

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
      case 'datgemini': if (!/^AIza[\w-]{20,}$/.test(String(req.gemini || '').trim())) throw new Error('API key Gemini không hợp lệ');
        PropertiesService.getScriptProperties().setProperty('GEMINI_KEY', String(req.gemini).trim()); return json_({ ok: true });
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
  const ai = goiGemini_(file, projects);
  const byId = {}; payload.nodes.forEach(n => byId[n.id] = n);
  const chinh = byId[ai.du_an_chinh] ? ai.du_an_chinh : '';
  const lienQuan = (ai.du_an_lien_quan || []).filter(id => byId[id] && id !== chinh);
  let nhan = NHAN.indexOf(ai.nhan) >= 0 ? ai.nhan : (ai.du_thao ? 'Tham khảo - Dự thảo' : 'Pháp lý');
  if (ai.du_thao && nhan !== 'Tham khảo - Dự thảo' && !/QĐ-QH/.test(nhan)) nhan = 'Tham khảo - Dự thảo';
  const ngay = /^\d{2}\.\d{2}\.\d{4}$/.test(ai.ngay || '') ? ai.ngay : '';
  const ext = (file.getName().match(/\.[A-Za-z0-9]{2,5}$/) || [''])[0].toLowerCase();
  const ten = sach_((ngay || 'xx.xx.' + new Date().getFullYear()) + ' [' + nhan + '] ' + (ai.co_quan || 'Chưa rõ cơ quan') + ' - ' +
    [ai.so_hieu, ai.trich_yeu].filter(Boolean).join(' ')) + ext;
  const nam = ngay ? ngay.slice(6) : String(new Date().getFullYear());
  const thuMuc = chinh ? byId[chinh].path + '/' + nam : '_KHAC';
  const ghiChu = (ai.tom_tat || '') + (ai.ly_do ? ' — ' + ai.ly_do : '');

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
  const model = prop_('GEMINI_MODEL') || 'gemini-2.5-flash';
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
  const r = UrlFetchApp.fetch(url, { method: 'post', contentType: 'application/json', payload: JSON.stringify(body), muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) throw new Error('Gemini lỗi ' + r.getResponseCode() + ': ' + r.getContentText().slice(0, 300));
  const txt = (((JSON.parse(r.getContentText()).candidates || [])[0] || {}).content || { parts: [{ text: '{}' }] }).parts.map(p => p.text || '').join('');
  try { return JSON.parse(txt.replace(/^```json\s*|```\s*$/g, '')); } catch (x) { throw new Error('Gemini trả kết quả không đọc được'); }
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
