import { forwardRef } from 'react';
import { SIDO_OPTIONS } from '../data.js';

const SectionApply = forwardRef(function SectionApply({ form }, ref) {
  const { values, errors, refs, setValue, toggleRegion, guguns, handleSubmit, APPLY_REGIONS } = form;

  const fieldClass = (key) => `form-field${errors[key] ? ' is-error' : ''}`;
  const inputClass = (key, base) => `${base}${errors[key] ? ' is-error' : ''}`;

  return (
    <section ref={ref} id="apply" className="section-apply" aria-label="사업 설명회 참가 신청">
      <div className="section-apply__inner">
        <header className="section-apply__head">
          <h2 className="section-apply__title">사업 설명회 참가 신청</h2>
          <p className="section-apply__subtitle">
            신청 후 문자 또는 메일로 참여 안내드리며 필요 시 개별 상담도 가능합니다.
          </p>
        </header>

        <form className="apply-form" onSubmit={handleSubmit} noValidate>
          <div className="apply-form__grid">
            <div className={fieldClass('name')}>
              <label className="form-label" htmlFor="apply-name">
                이름 <span className="required">*</span>
              </label>
              <input
                ref={refs.name}
                type="text"
                id="apply-name"
                className={inputClass('name', 'form-input')}
                placeholder="이름을 입력하세요"
                value={values.name}
                onChange={(e) => setValue('name', e.target.value)}
                required
              />
            </div>

            <div className={fieldClass('phone')}>
              <label className="form-label" htmlFor="apply-phone">
                연락처 <span className="required">*</span>
              </label>
              <input
                ref={refs.phone}
                type="tel"
                id="apply-phone"
                className={inputClass('phone', 'form-input')}
                placeholder="010-0000-0000"
                inputMode="numeric"
                maxLength={13}
                value={values.phone}
                onChange={(e) => setValue('phone', e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="apply-academy">학원명</label>
              <input
                type="text"
                id="apply-academy"
                className="form-input"
                placeholder="00 영어학원"
                value={values.academy}
                onChange={(e) => setValue('academy', e.target.value)}
              />
            </div>

            <div className={fieldClass('sido')}>
              <label className="form-label" htmlFor="apply-sido">
                학원 소재지 - 시/도 <span className="required">*</span>
              </label>
              <select
                ref={refs.sido}
                id="apply-sido"
                className={inputClass('sido', 'form-select')}
                value={values.sido}
                onChange={(e) => setValue('sido', e.target.value)}
                required
              >
                <option value="">시/도 선택</option>
                {SIDO_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={`${fieldClass('gugun')} form-field--full`}>
              <label className="form-label" htmlFor="apply-gugun">
                학원 소재지 - 군/구 <span className="required">*</span>
              </label>
              <select
                ref={refs.gugun}
                id="apply-gugun"
                className={inputClass('gugun', 'form-select')}
                value={values.gugun}
                onChange={(e) => setValue('gugun', e.target.value)}
                disabled={!values.sido}
                required
              >
                {!values.sido ? (
                  <option value="">시/도를 먼저 선택해주세요</option>
                ) : (
                  <>
                    <option value="">군/구 선택</option>
                    {guguns.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          <div
            id="apply-region-field"
            ref={refs.region}
            className={`form-field form-field--full${errors.regions ? ' is-error' : ''}`}
          >
            <label className="form-label">
              참석 희망 지역 <span className="required">*</span>
              <span className="hint">(복수 선택 가능)</span>
            </label>
            <div className="region-grid">
              {APPLY_REGIONS.map((r) => (
                <label key={r.id} className="region-check">
                  <input
                    type="checkbox"
                    name="region"
                    value={r.id}
                    id={`region-${r.id}`}
                    checked={!!values.regions[r.id]}
                    onChange={(e) => toggleRegion(r.id, e.target.checked)}
                  />
                  <span className="region-check__box" aria-hidden="true" />
                  <span className="region-check__name">{r.name}</span>
                  <span className="region-check__date">{r.date}</span>
                </label>
              ))}
            </div>
            <p className="form-error-msg">참석 희망 지역을 1개 이상 선택해 주세요.</p>
          </div>

          <div className="form-field form-field--full">
            <label className="form-label" htmlFor="apply-message">추가 문의 사항</label>
            <textarea
              id="apply-message"
              className="form-textarea"
              placeholder="현재 운영중인 학원 규모나 궁금한 점을 자유롭게 적어주세요."
              value={values.message}
              onChange={(e) => setValue('message', e.target.value)}
            />
          </div>

          <div className="form-field form-field--full">
            <label className="form-label">현장 1:1 상담 신청</label>
            <div className="consult-box">
              <span className="consult-check__badge">패스트트랙</span>
              <label className="consult-check">
                <input
                  type="checkbox"
                  id="apply-consult"
                  checked={values.consult}
                  onChange={(e) => setValue('consult', e.target.checked)}
                />
                <span className="consult-check__box" aria-hidden="true" />
                <span className="consult-check__text">
                  (서울 한정) 현장 개별 상담을 신청합니다.
                </span>
              </label>
              <ul className="consult-list">
                <li>서울 행사는 강연과 함께 진행되므로, 신청하신 원장님부터 먼저 상담을 진행합니다.</li>
                <li>당일 상담 시간이 한정적이므로, 아카데미 상담이 필요하신 경우 반드시 개별 상담을 신청해 주세요.</li>
              </ul>
              <p className="consult-highlight">당일 현장 계약 시 특별 혜택을 드립니다.</p>
            </div>
          </div>

          <button type="submit" className="apply-submit">신청 완료하기</button>

          <ul className="apply-form__notes">
            <li>신청 완료 후 카카오톡 또는 문자로 확인 안내가 발송됩니다.</li>
            <li>수집된 개인정보는 행사 안내 및 리딩앤 아카데미 관련 정보 제공에 활용될 수 있습니다.</li>
          </ul>
        </form>
      </div>
    </section>
  );
});

export default SectionApply;
