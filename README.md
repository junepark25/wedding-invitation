# Philip & Charrine Wedding Invitation

GitHub Pages 배포용 정적 모바일 청첩장 템플릿입니다.

## GitHub Pages 배포
1. GitHub에서 새 Public repository를 만듭니다. 예: `wedding-invitation`
2. 이 폴더 안의 파일을 repository 최상위(root)에 업로드합니다.
3. GitHub `Settings` → `Pages`
4. `Deploy from a branch` 선택
5. Branch: `main`, Folder: `/(root)` 선택 후 Save
6. 배포가 완료되면 `https://사용자명.github.io/wedding-invitation/` 형태로 접속합니다.

## 나중에 사진 교체
현재 회색 PHOTO 영역은 자리표시자입니다.
사진을 `images/` 폴더에 넣고 HTML의 해당 `photo-placeholder` 영역을 `<img>` 태그로 교체하면 됩니다.

권장 파일명:
- images/cover.jpg
- images/story.jpg
- images/philip.jpg
- images/charrine.jpg
- images/map-korea.png

## 아직 연결하지 않은 기능
- 한국/자카르타 지도 외부 링크
- RSVP 데이터 저장/전송
- 실제 갤러리 슬라이더
- 실제 웨딩 사진

이 기능들은 공개 URL 생성 후 순차적으로 추가할 수 있습니다.
