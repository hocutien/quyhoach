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

function doGet(e) {
  if (!e || !e.parameter || e.parameter.k !== prop_('MA_KHOA')) {
    return HtmlService.createHtmlOutput('<p style="font-family:sans-serif">Mở trang quản lý trên GitHub: <b>hocutien.github.io/quyhoach</b></p>');
  }
  const t = HtmlService.createTemplateFromFile('SoDo');
  t.payload = JSON.stringify(buildPayload_());
  return t.evaluate()
    .setTitle('Sơ đồ quan hệ quy hoạch')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
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
if (typeof module !== 'undefined') module.exports = { buildFromTree_ };
