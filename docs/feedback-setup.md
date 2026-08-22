# 문의하기(피드백) 설정 가이드

앱 우상단 **문의하기** 버튼 → 모달에서 유형/제목/내용 입력 → 서버리스 함수가 숨긴 토큰으로
GitHub 이슈를 생성합니다. 사용자는 GitHub 계정이 없어도 됩니다.

```
[브라우저 모달]  --POST /api/feedback-->  [서버리스 함수 + 토큰]  --REST-->  [GitHub 이슈]
```

함수가 없거나 실패하면 모달이 자동으로 **GitHub 새 이슈 페이지 프리필** 링크로 폴백합니다.

`mapleland-setting-v2` 저장소의 문의하기와 동일한 구조입니다.

---

## 1. GitHub 토큰 발급 (Fine-grained PAT 권장)

1. GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate new token
2. **Repository access**: Only select repositories → `mapleland-coin-calculator` 만 선택
3. **Permissions** → Repository permissions → **Issues: Read and write**
4. 생성된 토큰(`github_pat_...`) 복사 — 한 번만 보이므로 잘 보관

> 토큰은 **절대** 프론트 코드나 저장소에 넣지 마세요. 배포 플랫폼 환경변수에만 저장합니다.
> `VITE_` 접두사가 붙은 값은 빌드 결과에 그대로 박히므로 토큰에 쓰면 안 됩니다.

## 2. 배포 (Vercel)

`api/feedback.js` 가 Vercel Node Function으로 자동 인식됩니다.

Project Settings → **Environment Variables**:

| 이름 | 필수 | 값 |
|---|---|---|
| `GITHUB_TOKEN` | ✅ | 1단계에서 발급한 PAT |
| `GITHUB_OWNER` | | `kyhong222` (기본값) |
| `GITHUB_REPO` | | `mapleland-coin-calculator` (기본값) |
| `ALLOWED_ORIGIN` | | CORS 허용 출처. 전체 허용은 미설정(`*`) |

프론트와 함수가 같은 Vercel 도메인이면 `VITE_FEEDBACK_ENDPOINT`는 비워두면 됩니다(기본 `/api/feedback`).

## 3. 접수되는 이슈 형태

- 제목: `[건의] 사용자가 쓴 제목` (유형에 따라 `[오류]` / `[기타]`)
- 라벨: `user-feedback`, 유형 태그
- 본문 끝에 `type=idea` 같은 접수 경로 표시가 붙습니다
- 연락처를 적으면 본문 하단에 함께 기록됩니다 (공개되므로 모달에서 안내함)

## 4. 스팸 방지

- **허니팟**: 모달의 숨김 필드를 봇이 채우면 서버가 조용히 무시합니다(이슈 생성 안 함).
- **길이 제한**: 제목 120자 / 내용 5000자 / 연락처 120자.
- 필요 시 Vercel의 IP 레이트리밋이나 캡차(hCaptcha, Turnstile 등)를 추가로 붙일 수 있습니다.

## 5. 로컬 개발

`vite dev`는 `api/`를 실행하지 않으므로, 로컬에서 실제 이슈 생성까지 확인하려면
`vercel dev`를 쓰거나 배포본으로 테스트하세요. 미설정 상태에서는 전송이 실패하고
모달이 **GitHub에서 직접 등록** 폴백 버튼을 보여줍니다.
