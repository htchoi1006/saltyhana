# saltyhana

디지털 하나로 금융서비스 개발 5기 <br/>
1팀 **짭짤하나**입니다. 🧂

# Github 소스 코드 버전 관리 규칙

- 생성자: 최혁태
- 생성 일시: 2024년 10월 19일 오후 8:36

## 원칙

- https://github.com/htchoi1006/saltyhana 에서 각 개인 레포지토리로 fork를 해서 개발을 진행한다.

## 규칙

- 개인 레포지토리는 `develop` 에서 sync하거나 `develop` 으로 pull request를 하고 merge를 한다.
- `develop` → `master` → deploy
- frontend의 경우 메인 레포지토리에 `develop/frontend` 브렌치에서 merge를 한 후에 테스트 후`develop` 으로 merge한다.

## 브랜치

### 원칙

- 브랜치 명에서 띄어쓰기가 발생할 경우 `-` 로 한다
  - ex) websocket/add-new-function

### 전략

- `master` : production 브랜치
  - 작업자는 master 브랜치에 PR을 올리면 안된다.
  - master 브랜치는 새로운 버전이 릴리즈 될때 사용되어야한다.
- `develop` : 개발서버 브랜치
  - develop 브랜치에 커밋을 하면 안된다.
  - develop 브랜치에 PR을 허용하고 merge를 하면 안된다.
- `<dir>/<feat>` : Task 개발 브랜치
  - dir — 디렉토리 기준으로 명명한다.
    - page, layout, component, hook, util 등
  - feat — 개발 중 세부 기능으로 명명한다.
    - ex) page/login, component/styled-input 등
  - 본인이 작업하고 있는 내용을 수시로 remote server(github)에 수시로 push 한다.

## Commit

### 예시

`feat`. 메인페이지 페이지네이션 구현

- 메인페이지 페이지네이션구현

- 메인페이지 검색 구현

### 커밋 분류

- `feat` : 새로운 기능에 대한 커밋
- `add` : feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성
- `fix` : 버그 수정에 대한 커밋
- `build` : 빌드 관련 파일 수정에 대한 커밋
- `chore` : 그 외 자잘한 수정에 대한 커밋
- `ci` : CI관련 설정 수정에 대한 커밋
- `docs` : 문서 수정에 대한 커밋
- `style` : 코드 스타일 혹은 포맷 등에 관한 커밋
- `refact` : 코드 리팩토링에 대한 커밋
- `test` : 테스트 코드 수정에 대한 커밋
- `docs` : README나 WIKI 등의 문서 개정

```
git commit - m “feat. OO기능 개발”
```

# prettier git-hook 설정

```
npx husky init
```

./.husky/pre-commit 내용을
`npx lint-staged`으로 변경
