import { useEffect, useRef, useState } from 'react';

/** 문의가 등록될 공개 저장소 */
const OWNER = 'kyhong222';
const REPO = 'mapleland-coin-calculator';
/** 서버리스 프록시 엔드포인트 (미설정 시 동일 출처 /api/feedback). 실패 시 GitHub 프리필로 폴백 */
const ENDPOINT = import.meta.env.VITE_FEEDBACK_ENDPOINT || '/api/feedback';

/* value 는 서버(api/feedback.js)의 TYPE_LABEL 키와 맞춰야 한다 */
const TYPES = [
  { value: 'idea', label: '상품 추가 · 건의', tag: '건의' },
  { value: 'bug', label: '오류 제보', tag: '오류' },
  { value: 'etc', label: '기타', tag: '기타' },
];

const TITLE_MAX = 120;
const BODY_MAX = 5000;

const tagOf = (type) => TYPES.find((t) => t.value === type)?.tag ?? '기타';

/** 이슈 본문 (내용 + 연락처) — 서버 폴백용으로도 같은 형식을 쓴다 */
function issueBody(body, contact) {
  const lines = [body.trim()];
  if (contact.trim()) lines.push('', '---', `연락처: ${contact.trim()}`);
  return lines.join('\n');
}

/** 백엔드 없이 GitHub 새 이슈 페이지를 채워서 여는 폴백 URL */
function prefillUrl(type, title, body, contact) {
  const q = new URLSearchParams({
    title: `[${tagOf(type)}] ${title.trim()}`,
    body: issueBody(body, contact),
  });
  return `https://github.com/${OWNER}/${REPO}/issues/new?${q.toString()}`;
}

export default function FeedbackDialog({ open, onClose }) {
  const [type, setType] = useState('idea');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [contact, setContact] = useState('');
  const [hp, setHp] = useState(''); // 허니팟(스팸봇 트랩) — 사람은 비워둠
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [resultUrl, setResultUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const titleRef = useRef(null);

  const canSubmit = title.trim() && body.trim() && status !== 'submitting';

  const reset = () => {
    setType('idea');
    setTitle('');
    setBody('');
    setContact('');
    setHp('');
    setStatus('idle');
    setResultUrl('');
    setErrorMsg('');
  };

  const handleClose = () => {
    if (status === 'submitting') return;
    onClose();
    setTimeout(reset, 200);
  };

  useEffect(() => {
    if (!open) return undefined;
    titleRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title: title.trim(),
          body: body.trim(),
          contact: contact.trim(),
          hp,
        }),
      });
      if (!res.ok) throw new Error(`서버 응답 오류 (${res.status})`);
      const data = await res.json().catch(() => ({}));
      setResultUrl(typeof data?.url === 'string' ? data.url : '');
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : '전송에 실패했습니다.');
      setStatus('error');
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="feedback-title" className="modal-title">
          문의하기
        </h2>

        {status === 'success' ? (
          <>
            <p className="modal-ok">문의가 정상적으로 접수되었습니다. 감사합니다!</p>
            {resultUrl && (
              <p className="modal-note">
                등록된 문의:{' '}
                <a href={resultUrl} target="_blank" rel="noopener noreferrer">
                  {resultUrl}
                </a>
              </p>
            )}
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={handleClose}>
                닫기
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={submit}>
            <p className="modal-note">
              추가했으면 하는 상품이나 건의사항을 남겨주세요. 접수된 내용은{' '}
              <b>공개 저장소의 이슈</b>로 등록되니 개인정보는 넣지 마세요.
            </p>

            <label className="field-label" htmlFor="fb-type">
              유형
            </label>
            <select
              id="fb-type"
              className="field-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            <label className="field-label" htmlFor="fb-title">
              제목 <span className="req">*</span>
            </label>
            <input
              id="fb-title"
              ref={titleRef}
              className="field-control"
              value={title}
              maxLength={TITLE_MAX}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 프리미엄 물약 상자 추가해주세요"
            />

            <label className="field-label" htmlFor="fb-body">
              내용 <span className="req">*</span>
            </label>
            <textarea
              id="fb-body"
              className="field-control"
              rows={5}
              value={body}
              maxLength={BODY_MAX}
              onChange={(e) => setBody(e.target.value)}
              placeholder="상품 추가 요청이라면 상품 이름과 캐시샵 포인트 가격을 적어주시면 빠릅니다."
            />
            <div className="field-count">
              {body.length} / {BODY_MAX}
            </div>

            <label className="field-label" htmlFor="fb-contact">
              연락처 (선택 · 공개됨)
            </label>
            <input
              id="fb-contact"
              className="field-control"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="답변 받을 이메일/디스코드 등"
            />

            {/* 허니팟: 화면에 보이지 않지만 봇이 채우면 서버에서 거른다 */}
            <div className="honeypot" aria-hidden="true">
              <input
                tabIndex={-1}
                autoComplete="off"
                name="website"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </div>

            {status === 'error' && (
              <p className="modal-error">
                전송에 실패했습니다{errorMsg ? ` (${errorMsg})` : ''}. 아래 버튼으로 GitHub에서
                직접 등록할 수 있어요.
              </p>
            )}

            <div className="modal-actions">
              {status === 'error' && (
                <a
                  className="btn btn-ghost modal-fallback"
                  href={prefillUrl(type, title, body, contact)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub에서 직접 등록
                </a>
              )}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleClose}
                disabled={status === 'submitting'}
              >
                취소
              </button>
              <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
                {status === 'submitting' ? '전송 중…' : '보내기'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
