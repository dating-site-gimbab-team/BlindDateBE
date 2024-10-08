	1.	public/: 정적 파일들을 보관하는 폴더입니다. 이미지, 아이콘, 글꼴 등을 여기에 저장합니다.
	2.	src/: 모든 소스 코드가 위치하는 폴더입니다. 프로젝트의 크기가 커질 경우 src 디렉토리를 사용하는 것이 좋습니다.
	•	components/: 모든 React 컴포넌트를 보관하는 폴더입니다.
	•	common/: 여러 곳에서 재사용 가능한 일반적인 컴포넌트를 저장합니다.
	•	layout/: 레이아웃 관련 컴포넌트를 저장합니다.
	•	ui/: 버튼, 모달, 입력란 등 UI 요소 컴포넌트를 저장합니다.
	•	hooks/: 커스텀 훅을 보관하는 폴더입니다. Zustand와 관련된 상태 로직을 캡슐화할 수 있습니다.
	•	pages/: Next.js의 페이지들이 위치합니다. api/ 폴더는 API 라우트를 위한 디렉토리입니다. index.tsx는 기본적으로 루트 경로에 매핑되는 페이지입니다.
	•	stores/: Zustand 상태 관리를 위한 스토어들을 보관하는 폴더입니다. 예를 들어, useStore.ts 파일에 Zustand 상태 로직을 구현할 수 있습니다.
	•	styles/: 전역 스타일 파일이나 CSS Modules를 저장하는 폴더입니다. 스타일 관련 로직을 이곳에 배치합니다.
	•	utils/: 유틸리티 함수들을 보관하는 폴더입니다. 프로젝트 전반에 걸쳐 재사용 가능한 함수들을 여기에 저장합니다.
	•	types/: TypeScript 타입 정의를 위한 폴더입니다. 프로젝트 내에서 사용하는 공통 타입이나 인터페이스를 이곳에 정의합니다.
	3.	.env.local: 환경 변수를 저장하는 파일입니다. 비밀 정보나 API 키 등을 여기에 저장합니다.
	4.	next.config.js: Next.js의 설정 파일입니다.
	5.	tsconfig.json: TypeScript 설정 파일입니다.