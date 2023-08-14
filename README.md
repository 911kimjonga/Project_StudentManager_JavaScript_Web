# Project_StudentManager_JavaScript_Web
## 개요
* 학생 성적 관리 어플리케이션(Student Manager Application)

---
## 주요 기능
* 학생 성적 정보 출력
* 신규 학생 성적 정보 등록
* 기존 학생 정보 삭제
* 학생 학번, 이름, 성적 순 정렬
* Web LocalStorage를 이용한 학생 정보 저장 및 불러오기

---
## 제작 및 실행 환경
* HTML : HTML5
* CSS : CSS3
* JavaScript : ECMAScript6 이상

---
## 실행법
1. VScode 설치 후 Live Server 확장 설치 
2. 해당 프로젝트 폴더 오픈 후 index.html 파일 Live Server로 실행

---
## 주요 파일
* index.html : 실행을 위한 메인 HTML 문서
* app.js : 여러 js 파일의 모듈화를 위한 집합 JavaScript 파일
* student.js : 단일 학생 정보 저장을 위한 클래스
* student-repository.js : 여러 학생 정보를 배열로 저장하기 위한 클래스
* event-handler.js : HTML 내의 이벤트 실행을 위한 이벤트 핸들러 클래스
* validator.js : 이벤트 처리시 JavaScript 내에서 유효성 검사를 하기 위한 클래스

---
## 사용 및 설명
* 실행시 자동으로 Web LocalStorage에 있는 학생 정보 메모리 상으로 로딩하여 출력
* 등록
    * 학생 정보 (학번, 이름, 성적) 모두 입력 후 등록 버튼 클릭시 메모리 상에 학생 정보 등록
* 삭제
    * 학번 입력 후 삭제 버튼 클릭시 해당 학번의 학생 정보 메모리 상에서 삭제
* 저장
    * 저장 버튼 클릭시 현재 메모리 상에 존재하는 학생 정보 Web LocalStorage에 저장
* 검색
    * 검색버튼 좌측에 조건(학번/이름) 선택 후 검색을 원하는 특정 학생의 해당 조건에 맞는 값(학번/이름)을 입력한 후 검색 버튼을 누르면 해당 학생 정보 출력
* 정렬
    * 정렬하고 자 하는 조건에 맞는 테이블 헤더를 클릭시 해당 조건으로 자동 정렬 

---
## 업데이트 내역
### v1.0
* 학생 성적 정보을 메모리 상에서 등록, 삭제 가능
* 메모리 상의 학생 성적 정보를 WebStorage 를 통해 반영구적 저장 및 로드가 가능
* 학생의 평균 성적으로 학생의 석차를 출력하고 전체 학생의 평균 점수도 출력
* 특정 학생에 대해서 검색 가능
* 원하는 조건으로 학생 전체 정렬 가능
