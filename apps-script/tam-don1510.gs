
/* ===== Dọn bản trùng Long Toàn do duyệt trên trang lúc 14h (chạy 1 lần) ===== */
function donLongToan1510() {
  const ids = ['1RUHV6ecnBugrfGdu87HhRODcA0o7Muek', '1bG0nDXE0jB0xt7vSgvntBaz_qyJVuy0r', '1n1rygVXyA8_oD8ek_H9iVMMh9OFkfp22', '1fx_mozZlCEhBmPeFZORQ6ILxNC4ATWIj',
    '1SPh5ti7S3Hl7lHGTa-7HwA3r4NRfw2Uh', '1craz4Kh9Mqt2WgOpgkwCT8E8jt9Jt8E9', '1N1S5JgU9t9k3WTCVPdkvh7VH9QXkNpf_', '1xZrAKHv3TNttX-COeSsN9z-sazeQ-S1V',
    '1Aj7YIXqVzYemme8J-hcIesl7ZnKRtHoo', '1_aQ9RHWX0yK-inDcmjEwtz9-AnLgNdwA'];
  const log = [], cha = {};
  ids.forEach(id => {
    try { const f = DriveApp.getFileById(id); const p = f.getParents(); if (p.hasNext()) { const d = p.next(); cha[d.getId()] = d; } f.setTrashed(true); }
    catch (x) { log.push('Lỗi ' + id + ': ' + x.message); }
  });
  const conGi = d => { let n = 0; const a = d.getFiles(); while (a.hasNext()) if (!a.next().isTrashed()) n++; const b = d.getFolders(); while (b.hasNext()) if (!b.next().isTrashed()) n++; return n; };
  Object.keys(cha).forEach(id => {
    const d = cha[id];
    if (conGi(d) === 0 && d.getDateCreated() > new Date('2026-10-15T00:00:00+07:00')) { d.setTrashed(true); log.push('Bỏ thư mục trống: ' + d.getName()); }
    else { danhSo_(d); log.push('Đánh lại STT: ' + d.getName() + ' (' + id + ')'); }
  });
  const lt = DriveApp.getFolderById('1O5mvhQPZVkm6Js6Wt7Jy0ERNpXyAxVPS');
  if (!lt.isTrashed()) { const y = DriveApp.getFolderById('1y4lVYzP8qlGUKmhQ5ImyZfEn81_72tnc'); if (!y.isTrashed() && conGi(y) === 0) y.setTrashed(true); if (conGi(lt) === 0) { lt.setTrashed(true); log.push('Bỏ thư mục 4. QH phân khu Khu cảng Long Toàn'); } }
  quetToanBo();
  Logger.log(JSON.stringify(log));
}
