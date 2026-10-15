
/* ===== Xếp _ZALO_TAM đợt 15.10.2026 (chạy 1 lần) ===== */
function xepZalo1510() {
  const KL = '3. KKT ĐỊNH AN/2. KCN Ngũ Lạc';
  const DX = '3. KKT ĐỊNH AN/4. KCN Đôn Xuân - Đôn Châu/2026';
  const LT = '3. KKT ĐỊNH AN/5. Khu cảng và dịch vụ cảng Long Toàn/2026';
  const QP = KL + '/QH phân khu KCN Ngũ Lạc (điều chỉnh tổng thể)/2026';
  const DA = KL + '/Dự án đầu tư hạ tầng KCN Ngũ Lạc (Green iP-2)/2026';
  const LH = '6. QH CHUNG XÃ (sau sáp nhập 2025)/Xã Long Hữu (Long Hữu + Hiệp Thạnh, TX Duyên Hải cũ)/2026';
  const LHHS = LH + '/2. 13.10.2026 [Tham khảo - Dự thảo] UBND xã Long Hữu - Hồ sơ QHC xã Long Hữu đến năm 2050 (điều chỉnh sau lấy ý kiến dân cư)';
  const T912 = '2. TỈNH/ĐT912 kéo dài (QL54 Mỹ Chánh - QL53 Cầu Ngang)/2026';
  const M = [
    ['_KH_TTPTQD Thuc hien kiem dem tai san duong tinh 914 (doan Long Huu).signed.signed.pdf', KL + '/Đường vào KCN - ĐT914/2026', '12.10.2026 [GPMB] Trung tâm PTQĐ - KH 204 kiểm đếm tài sản ĐT914 đoạn qua xã Long Hữu.pdf'],
    ['KH GPMB HÀNG TUẦN ĐƯỜNG VÀO KHU CÔNG NGHIỆP.signed.signed.pdf', KL + '/Đường vào KCN - ĐT914/2026', '13.10.2026 [GPMB] Hội đồng BTHT ĐT914 (P. Trường Long Hòa) - KH 02 GPMB tuần 12-16.10.2026.pdf'],
    ['_BC-TTPTQD tien do GPMB KCN Ngu Lac den 06.10.2026 - Dinh ky_theo TB 333.signed.signed.pdf', KL + '/GPMB KCN Ngũ Lạc/2026', '07.10.2026 [Tiến độ] Trung tâm PTQĐ - BC 427 tiến độ BTHT KCN Ngũ Lạc đến 06.10.2026.pdf'],
    ['_BC-TTPTQD tien do GPMB KCN Ngu Lac den 13.10.2026 - Dinh ky_theo TB 333.signed.signed.pdf', KL + '/GPMB KCN Ngũ Lạc/2026', '13.10.2026 [Tiến độ] Trung tâm PTQĐ - BC 441 tiến độ BTHT KCN Ngũ Lạc đến 13.10.2026.pdf'],
    ['26_BC_Bao cao KDT Tay Nam.pdf', '4. ĐÔ THỊ NGOÀI KKT/TP Trà Vinh/KĐT Tây Nam phường 7/2026', '05.10.2026 [GPMB] Trung tâm PTQĐ (CN 3) - BC 26 kết quả BTHT KĐT Tây Nam phường 7.pdf'],
    ['10.10.2026. BC tiến độ, kết quả triển khai các QH trong hệ thống QH trên địa bàn tỉnh VL.signed.pdf', '2. TỈNH/QH tỉnh Vĩnh Long 2021-2030/2026', '11.10.2026 [Tiến độ] Sở Tài chính - BC 2288 tiến độ lập, điều chỉnh các quy hoạch trên địa bàn tỉnh.pdf'],
    ['64 Vy CV STC yeu cau khan truong thuc hien thu tuc dau tu DA KCM nam 2027.signed.signed.pdf', '2. TỈNH/Dự án trọng điểm - đầu tư công/2026', '11.10.2026 [Đôn đốc] Sở Tài chính - CV 10458 khẩn trương thủ tục dự án khởi công mới 2027.pdf'],
    ['DM du an du kien 2027 05-10.pdf', '2. TỈNH/Dự án trọng điểm - đầu tư công/2026/Hồ sơ kèm CV 10458', 'Danh mục dự án khởi công mới dự kiến 2027.pdf'],
    ['1. CV lay y kien ho so nhiem vu quy hoạch phân khu KCN Don Xuan - Don Chau.signed.signed.pdf', DX, '15.10.2026 [Lập - Công bố QH] BQL KKT - CV 1865 lấy ý kiến nhiệm vụ QHPK KCN Đôn Xuân - Đôn Châu.pdf'],
    ['4. HO SO NHIEM VU dau.pdf', DX + '/Hồ sơ kèm CV 1865', '00. Nhiệm vụ QHPK KCN Đôn Xuân - Đôn Châu (bản đóng dấu).pdf'],
    ['QH01-SODOVITRI-Layout1.pdf', DX + '/Hồ sơ kèm CV 1865', 'QH01. Sơ đồ vị trí, phạm vi nghiên cứu.pdf'],
    ['02.PHAM VI RANH GIOI-NV-01.pdf', DX + '/Hồ sơ kèm CV 1865', 'QH02. Bản vẽ phạm vi ranh giới.pdf'],
    ['4. HO SO NHIEM VU dau (1).pdf', LT + '/Hồ sơ kèm CV 1864', '00. Nhiệm vụ QHPK Khu cảng và dịch vụ cảng Long Toàn (bản đóng dấu).pdf'],
    ['QH01-SODOVITRI-Layout1 (1).pdf', LT + '/Hồ sơ kèm CV 1864', 'QH01. Sơ đồ vị trí, phạm vi nghiên cứu.pdf'],
    ['02.PHAM VI RANH GIOI-NV-01 (1).pdf', LT + '/Hồ sơ kèm CV 1864', 'QH02. Bản vẽ phạm vi ranh giới.pdf'],
    ['NL-XinYKien-NVQHPK ky (1).pdf', QP, '09.10.2026 [Lập - Công bố QH] Công ty CP Sài Vinh - CV 85 xin ý kiến nhiệm vụ QHPK điều chỉnh tổng thể KCN Ngũ Lạc.pdf'],
    ['EE-NVQH.KCN NGU LAC.pdf', QP + '/Hồ sơ kèm CV 85', '00. Thuyết minh nhiệm vụ QHPK điều chỉnh tổng thể KCN Ngũ Lạc.pdf'],
    ['NguLac-Banve.pdf', QP + '/Hồ sơ kèm CV 85', 'QH01. Sơ đồ vị trí khu vực quy hoạch.pdf'],
    ['2026.09.30 - VB đề nghị điều chỉnh DADT sửa.pdf', DA, '30.09.2026 [Chủ trương - Tờ trình] Công ty Green i-Park Định An - Văn bản đề nghị điều chỉnh dự án đầu tư KCN Ngũ Lạc.pdf'],
    ['2026.10.02 CV_BQLKKT_lấy ý kiến hs Ngu Lac final.signed.signed.pdf', DA, '02.10.2026 [Phối hợp] BQL KKT - CV 1763 lấy ý kiến điều chỉnh phân kỳ tiến độ dự án KCN Ngũ Lạc.pdf'],
    ['2_Bao_cao_tinh_hinh_thuc_hien_du_an_1790829196.pdf', DA + '/Hồ sơ kèm đề nghị điều chỉnh DADT 30.09.2026', '01. Báo cáo tình hình thực hiện dự án đầu tư.pdf'],
    ['3_Quyet_dinh_cua_Nha_dau_tu_1790829194.pdf', DA + '/Hồ sơ kèm đề nghị điều chỉnh DADT 30.09.2026', '02. Biên bản họp HĐQT số 28-2026 ngày 30.09.2026.pdf'],
    ['Tai_lieu_kem_theo_1790829139.pdf', DA + '/Hồ sơ kèm đề nghị điều chỉnh DADT 30.09.2026', '03. Giấy chứng nhận đăng ký đầu tư 6737222212.pdf'],
    ['DKKD_thay_doi_lan_1_1790828921.pdf', DA + '/Hồ sơ kèm đề nghị điều chỉnh DADT 30.09.2026', '04. Giấy chứng nhận đăng ký doanh nghiệp thay đổi lần 1.pdf'],
    ['Thông báo điều chỉnh nội dung đăng ký doanh nghiệp Cty Green ip.pdf', DA + '/Hồ sơ kèm đề nghị điều chỉnh DADT 30.09.2026', '05. Thông báo điều chỉnh nội dung đăng ký doanh nghiệp.pdf'],
    ['791. CV LAY Y KIEN SO, NGANH TINH VA CAC XA LAN CAN.signed.signed.signed.pdf', LH, '13.10.2026 [Lập - Công bố QH] UBND xã Long Hữu - CV 5011 xin ý kiến quy hoạch chung xã Long Hữu đến năm 2050.pdf'],
    ['Phu luc 1 (1).pdf', LH + '/Hồ sơ kèm CV 5011', 'Phụ lục 1 - Danh mục lập QH chung đô thị hiện hữu (CV 6670).pdf'],
    ['Phu luc 2 (1).pdf', LH + '/Hồ sơ kèm CV 5011', 'Phụ lục 2 - Danh mục lập QH chung xã (CV 6670).pdf'],
    ['Phu luc 3 (1).pdf', LH + '/Hồ sơ kèm CV 5011', 'Phụ lục 3 - Danh mục quy hoạch đã giao tổ chức lập (CV 6670).pdf'],
    ['Phu luc 4 (1).pdf', LH + '/Hồ sơ kèm CV 5011', 'Phụ lục 4 - Danh mục QH xã hình thành từ thị trấn (CV 6670).pdf'],
    ['TM Long Huu_ Dieu chỉnh sau lay y kien công đồng dân cư.pdf', LHHS, '00. Thuyết minh QHC xã Long Hữu.pdf'],
    ['01.LHV_LongHuu.pdf', LHHS, '01. Sơ đồ vị trí và liên hệ vùng.pdf'],
    ['02.HTTH_Long Huu-HT.pdf', LHHS, '02. Sơ đồ hiện trạng phát triển không gian và HTKT.pdf'],
    ['03.QHSDD_LongHuu-SDĐ.pdf', LHHS, '03. Bản đồ quy hoạch sử dụng đất.pdf'],
    ['04.ĐH TO CHUC KHONG GIAN_LongHuu-ĐH KG.pdf', LHHS, '04. Định hướng tổ chức không gian.pdf'],
    ['05.QH HTKT_LongHuu-HT.pdf', LHHS, '05. Quy hoạch HTKT (cấp điện).pdf'],
    ['06.QH HTKT_LongHuu-HT.pdf', LHHS, '06. Quy hoạch HTKT (cấp, thoát nước).pdf'],
    ['Phụ lục 1_Du kien phuong an ke hoach dau tu cong trung han giai doan 2025-2035.pdf', LHHS, '07. Phụ lục dự kiến kế hoạch đầu tư công trung hạn của xã.pdf'],
    ['173 Giấy mời về việc gửi thông báo thu hồi đất và thông tin đến người dân trong vùng dự án một số nội dung liên quan việc bồi thường, hỗ trợ, tái định cư khi .signed.pdf', T912, '15.10.2026 [GPMB] UBND xã Cầu Ngang - GM 173 thông báo thu hồi đất, bồi thường dự án ĐT912 kéo dài.pdf']
  ];
  const BO = ['TM quy hoạch xã Lưu Nghiệp Anh.pdf', 'QH01_LienHeVung.pdf', 'QH02_BanDoDanhGiaHienTrang.pdf', 'QH03_BanDoHienTrangHaTangKyThuat.pdf',
    'QH04_BanDoPhatTrienKhongGian.pdf', 'QH05_BanDoQuyHoachSuDungDatNam2030.pdf', 'QH06_BanDoQuyHoachSuDungDatNam2050.pdf', 'QH07_BanDoGiaoThong.pdf',
    'QH07_BanDoGiaoThong (1).pdf', 'QH08_BanDoCapDien.pdf', 'QH09_BanDoThongTinLienLac.pdf', 'QH10_BanDoQuyHoachCapNuoc.pdf', 'QH11_BanDoQuyHoachThoatNuoc.pdf',
    '6458 QĐ-UBND.signed.signed.pdf', '1693. STC BC TDCTDT NCMR QL60 (doan tu cau CoChien den duong dan.pdf', '18. 335.BQL TTr phe duyet BCDXCT nang cap mo rong QL60 (theo KL hop TV.pdf',
    'A61-SỔ VB ĐI TỈNH ỦY NK 2025 - 2030 (NĂM 2026)-TB-1424-2026_dadongdau.pdf', 'CV-lay y kien so nganh- danh muc 2027.signed.signed.pdf',
    'PHU LUC I.pdf', 'PHU LUC II.pdf', 'PHU LUC III.pdf', 'PHU LUC IV.pdf',
    '1. CV lay y kien ho so nhiem vu quy hoạch phân khu Khu cang Long Toan.signed.signed.pdf',
    '02.PHAM VI RANH GIOI.dwl', '02.PHAM VI RANH GIOI.dwl2', 'XREF - KHUNG TEN.bak', 'XREF - KHUNG TEN.dwg', 'NV QHPK CANG LONG TOAN.docx', 'NVQHPK KCN DON XUAN DON CHAU.pdf'];

  const nf = s => String(s).normalize('NFC');
  const zalo = getPath_('_ZALO_TAM', false), files = {};
  const it = zalo.getFiles(); while (it.hasNext()) { const f = it.next(); files[nf(f.getName())] = f; }
  const log = [], thuMucDanhSo = {};
  M.forEach(([src, dst, ten]) => {
    const f = files[nf(src)]; if (!f) { log.push('THIẾU: ' + src); return; }
    const d = getPath_(dst, true); f.moveTo(d); f.setName(ten); delete files[nf(src)];
    if (!/Hồ sơ/.test(dst.split('/').pop()) && !/^\d+\. \d{2}\.\d{2}\.\d{4}/.test(dst.split('/').pop())) thuMucDanhSo[dst] = 1;
  });
  BO.forEach(n => { const f = files[nf(n)]; if (f) { f.setTrashed(true); delete files[nf(n)]; } else log.push('KHÔNG THẤY ĐỂ BỎ: ' + n); });
  log.push('CÒN LẠI TRONG ZALO: ' + Object.keys(files).join(' | '));

  // CV 1864 Long Toàn đang ở hàng chờ (dòng 3)
  try { duyet_({ row: 3, ten: '15.10.2026 [Lập - Công bố QH] BQL KKT - CV 1864 lấy ý kiến nhiệm vụ QHPK Khu cảng và dịch vụ cảng Long Toàn.pdf', thuMuc: LT, banSao: '' }); }
  catch (x) { log.push('DUYỆT CV1864 LỖI: ' + x.message); }

  // Đổi tên CV 9919
  const sd = getPath_('5. SỬ DỤNG ĐẤT (QHSDĐ - KHSDĐ)/0. Cấp tỉnh/2026', false);
  if (sd) { const i2 = sd.getFiles(); while (i2.hasNext()) { const f = i2.next(); if (/CV \(chưa số\) lấy ý kiến danh mục/.test(nf(f.getName()))) f.setName(nf(f.getName()).replace('CV (chưa số)', 'CV 9919')); } }

  Object.keys(thuMucDanhSo).forEach(p => danhSo_(getPath_(p, false)));

  // Sơ đồ: thêm dự án mới, dời nhóm Sử dụng đất xuống, xếp 2 xã cạnh nhau
  const ss = SpreadsheetApp.openById(SHEET_ID), sh = ss.getSheetByName(TAB_DUAN);
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 7).getValues();
  v.forEach((r, i) => {
    if (r[2] === 'Sử dụng đất' && r[5] !== '') sh.getRange(i + 2, 6).setValue(Number(r[5]) + 250);
    if (r[0] === 'lna') sh.getRange(i + 2, 5, 1, 2).setValues([[1450, 400]]);
  });
  const moi = [
    ['dx', 'KCN Đôn Xuân - Đôn Châu (QHPK)', 'KKT Định An', DX.replace(/\/2026$/, ''), 0, 1160, false],
    ['ltoan', 'Khu cảng và dịch vụ cảng Long Toàn (QHPK)', 'KKT Định An', LT.replace(/\/2026$/, ''), 240, 1160, false],
    ['nlqh', 'QH phân khu KCN Ngũ Lạc (điều chỉnh tổng thể)', 'KCN Ngũ Lạc', QP.replace(/\/2026$/, ''), 520, 1100, false],
    ['nlda', 'Dự án đầu tư hạ tầng KCN Ngũ Lạc (Green iP-2)', 'KCN Ngũ Lạc', DA.replace(/\/2026$/, ''), 520, 1200, false],
    ['lhuu', 'QHC xã Long Hữu đến 2050', 'QH chung xã', LH.replace(/\/2026$/, ''), 1450, 500, false],
    ['dt912', 'ĐT912 kéo dài (QL54 - QL53 Cầu Ngang)', 'Tỉnh – dự án', T912.replace(/\/2026$/, ''), 780, 570, false]
  ];
  const coSan = v.map(r => String(r[3]));
  const them = moi.filter(r => coSan.indexOf(r[3]) < 0);
  if (them.length) sh.getRange(sh.getLastRow() + 1, 1, them.length, 7).setValues(them);
  ss.getSheetByName(TAB_QUANHE).getRange(ss.getSheetByName(TAB_QUANHE).getLastRow() + 1, 1, 8, 4).setValues([
    ['kkt', 'dx', 'Cụ thể hóa', 'QHPK trong KKT'],
    ['kkt', 'ltoan', 'Cụ thể hóa', 'QHPK trong KKT'],
    ['kkt', 'nlqh', 'Cụ thể hóa', 'Điều chỉnh tổng thể QHPK KCN'],
    ['nlqh', 'nlda', 'Cụ thể hóa', 'Dự án hạ tầng theo QHPK'],
    ['nlda', 'gpmbnl', 'Cụ thể hóa', 'GPMB cho dự án hạ tầng'],
    ['qhvl', 'lhuu', 'Cụ thể hóa', 'QH chung xã tuân thủ QH tỉnh'],
    ['dt914', 'lhuu', 'Kết nối GT', 'ĐT914 đoạn qua xã Long Hữu (KH 204)'],
    ['qhvl', 'dt912', 'Cụ thể hóa', 'Dự án giao thông tỉnh']
  ]);
  quetToanBo();
  Logger.log(JSON.stringify(log));
}
