import { useEffect, useRef, useState, useCallback } from 'react';
import { ADMIN_AREAS, APPLY_REGIONS } from './data.js';

/**
 * 글로벌 헤더 표시 여부 — Hero를 지나면 true, 신청폼(섹션 9) 진입 시 false.
 *
 * @param {React.RefObject<HTMLElement>} heroRef
 * @param {React.RefObject<HTMLElement>} applyRef
 * @returns {boolean} visible
 */
export function useHeaderVisibility(heroRef, applyRef) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY || 0;
      const hero = heroRef.current;
      const apply = applyRef.current;
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      const applyTop = apply ? apply.offsetTop : Number.POSITIVE_INFINITY;
      setVisible(scrollY >= heroBottom - 80 && scrollY < applyTop - 80);
    };
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler, { passive: true });
    handler();
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [heroRef, applyRef]);

  return visible;
}

/**
 * 신청 폼 상태/검증 훅
 * - 이름: 한글/영문/공백 필터 (IME 안전)
 * - 전화: 010-nnnn-nnnn 자동 포맷 + 완성 검증
 * - 시/도 → 군/구 cascading
 * - 지역 다중 선택
 * - 에러 자동 해제
 */
export function useApplyForm() {
  const [values, setValues] = useState({
    name: '',
    phone: '',
    academy: '',
    sido: '',
    gugun: '',
    message: '',
    consult: false,
    regions: {},          // { seoul: true, suwon: false, ... }
  });
  const [errors, setErrors] = useState({});  // { name: true, phone: true, regions: true, ... }

  const refs = {
    name: useRef(null),
    phone: useRef(null),
    sido: useRef(null),
    gugun: useRef(null),
    region: useRef(null),
  };

  /* ---------- 입력 필터링 ---------- */
  const filterName = (v) => v.replace(/[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '');

  const formatPhone = (v) => {
    const digits = (v || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const isValidPhone = (v) => /^\d{3}-\d{4}-\d{4}$/.test((v || '').trim());

  /* ---------- setter ---------- */
  const setValue = useCallback((field, raw) => {
    setValues((prev) => {
      let v = raw;
      if (field === 'name') v = filterName(raw);
      if (field === 'phone') v = formatPhone(raw);
      const next = { ...prev, [field]: v };
      // 시/도가 바뀌면 군/구 초기화
      if (field === 'sido') next.gugun = '';
      return next;
    });
    // 에러 자동 해제 (값이 채워졌을 때만)
    setErrors((prev) => {
      const value = field === 'phone' ? formatPhone(raw) : (field === 'name' ? filterName(raw) : raw);
      const ok =
        field === 'phone'  ? isValidPhone(value) :
        field === 'sido'   ? !!value :
        field === 'gugun'  ? !!value :
                              (typeof value === 'string' && value.trim() !== '');
      if (ok) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  /* ---------- 지역 체크박스 ---------- */
  const toggleRegion = useCallback((id, checked) => {
    setValues((prev) => ({ ...prev, regions: { ...prev.regions, [id]: checked } }));
    setErrors((prev) => {
      // 하나라도 체크되면 region 에러 해제
      const checkedAny =
        checked ||
        Object.entries(values.regions || {}).some(([k, v]) => v && k !== id);
      if (checkedAny) {
        const { regions: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, [values.regions]);

  /* 카드(섹션 7)에서 지역을 자동 선택 + 폼으로 스크롤 */
  const setRegionFromCard = useCallback((regionId) => {
    setValues((prev) => ({ ...prev, regions: { ...prev.regions, [regionId]: true } }));
    const apply = document.getElementById('apply');
    if (apply) {
      apply.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        if (refs.name.current) refs.name.current.focus({ preventScroll: true });
      }, 600);
    }
  }, []);

  /* ---------- 검증 ---------- */
  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = true;
    if (!isValidPhone(values.phone)) e.phone = true;
    if (!values.sido) e.sido = true;
    if (!values.gugun) e.gugun = true;
    const anyRegion = Object.values(values.regions).some(Boolean);
    if (!anyRegion) e.regions = true;
    setErrors(e);
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    const order = ['name', 'phone', 'sido', 'gugun', 'regions'];
    const firstKey = order.find((k) => e[k]);
    if (firstKey) {
      const target = refs[firstKey === 'regions' ? 'region' : firstKey].current;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (firstKey !== 'regions') {
          setTimeout(() => target.focus({ preventScroll: true }), 400);
        }
      }
      return;
    }
    alert('신청이 접수되었습니다. 카카오톡 또는 문자로 안내드릴게요.');
  };

  /* ---------- 시/도 기준 군/구 옵션 ---------- */
  const guguns = values.sido && ADMIN_AREAS[values.sido] ? ADMIN_AREAS[values.sido] : [];

  return {
    values,
    errors,
    refs,
    setValue,
    toggleRegion,
    setRegionFromCard,
    guguns,
    handleSubmit,
    APPLY_REGIONS,
  };
}
