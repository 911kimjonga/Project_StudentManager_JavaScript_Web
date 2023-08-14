import { Student } from "./student.js";
import { Validator } from "./validator.js";
import { studentRepository } from "./app.js";

// 이벤트 처리 객체화
class EventHandler {
  constructor() { }

  // ================ event Method ====================
  eventRegist() {

    // 시작 시 데이터 로딩 및 출력
    document.addEventListener('DOMContentLoaded', event => {
      this.loadStudent(event);
      this.findAllStudent(event);
    });

    // 검색창 기본이벤트 해제
    document.searchForm.searchT.addEventListener('keypress', event => {
      if (event.keyCode == 13) {
        event.preventDefault();
      }
    });

    // 등록
    document.inputForm.addB.addEventListener('click', event => {
      this.addStudent(event);
    });

    // 삭제
    document.inputForm.delB.addEventListener('click', event => {
      this.removeStudent(event);
    });

    // 저장
    document.searchForm.saveB.addEventListener('click', event => {
      this.saveStudent(event);
    });

    // 검색
    document.searchForm.searchB.addEventListener('click', event => {
      if (document.searchForm.searchC.value === 'ssn') {
        this.findbyNumStudent(event);
      } else if (document.searchForm.searchC.value === 'name') {
        this.findbyNameStudent(event);
      }
    });

    // 정렬
    document.tableForm.ssn.addEventListener('click', event => {
      this.sortSSn(event);
      this.activeReset(event);
      this.sortActive('tdSsn')
      this.setSortCondition('학번');
    });

    document.tableForm.name.addEventListener('click', event => {
      this.sortName(event);
      this.activeReset(event);
      this.sortActive('tdName')
      this.setSortCondition('이름');
    });

    document.tableForm.kor.addEventListener('click', event => {
      this.sortKor(event);
      this.activeReset(event);
      this.sortActive('tdKor')
      this.setSortCondition('국어');
    });

    document.tableForm.eng.addEventListener('click', event => {
      this.sortEng(event);
      this.activeReset(event);
      this.sortActive('tdEng')
      this.setSortCondition('영어');
    });

    document.tableForm.math.addEventListener('click', event => {
      this.sortMath(event);
      this.activeReset(event);
      this.sortActive('tdMath')
      this.setSortCondition('수학');
    });

    document.tableForm.sum.addEventListener('click', event => {
      this.sortSum(event);
      this.activeReset(event);
      this.sortActive('tdSum')
      this.setSortCondition('총점');
    });

    document.tableForm.avg.addEventListener('click', event => {
      this.sortAvg(event);
      this.activeReset(event);
      this.sortActive('tdAvg')
      this.setSortCondition('평균');
    });

    document.tableForm.rank.addEventListener('click', event => {
      this.sortRank(event);
      this.activeReset(event);
      this.sortActive('tdRank')
      this.setSortCondition('등수');
    });
  }

  //================ Data LocalStorage Save/Load Method ====================
  // JSON 저장
  saveStudent(event) {
    let listJson = [];
    listJson = JSON.stringify(studentRepository.students, ['ssn', 'name', 'korean', 'english', 'math']);
    localStorage.studentList = listJson;
  }

  // JSON 로드
  loadStudent(event) {
    try {
      let list = JSON.parse(localStorage.studentList);
      list.forEach(e => {
        const student = new Student(e.ssn, e.name, e.korean, e.english, e.math);
        studentRepository.addStudent(student);
      });
    } catch (error) {
      studentRepository;
    }
  }

  // ================ Student regist/delete Method ====================
  // 학생 등록
  addStudent(event) {
    const ssn = parseInt(document.inputForm.ssn.value);
    const name = document.inputForm.name.value;
    const kor = parseInt(document.inputForm.kor.value);
    const eng = parseInt(document.inputForm.eng.value);
    const math = parseInt(document.inputForm.math.value);

    if (!Validator.hasText(ssn)) {
      this.errorModal('학번을 입력해 주세요.', () => document.inputForm.ssn.focus());
      document.inputForm.ssn.value = '';
      return;
    } else if (!Validator.hasText(name)) {
      this.errorModal('이름을 입력해 주세요', () => document.inputForm.name.focus());
      document.inputForm.name.value = '';
      return;
    } else if (!Validator.hasText(kor)) {
      this.errorModal('국어점수를 입력해 주세요', () => document.inputForm.kor.focus());
      document.inputForm.kor.value = '';
      return;
    } else if (!Validator.hasText(eng)) {
      this.errorModal('영어점수를 입력해 주세요', () => document.inputForm.eng.focus());
      document.inputForm.eng.value = '';
      return;
    } else if (!Validator.hasText(math)) {
      this.errorModal('수학점수를 입력해 주세요', () => document.inputForm.math.focus());
      document.inputForm.math.value = '';
      return;
    }

    if (!Validator.isNumber(ssn)) {
      this.errorModal('학번은 숫자로 입력해 주세요', () => document.inputForm.ssn.focus());
      document.inputForm.ssn.value = '';
      return;
    } else if (!Validator.isName(name)) {
      this.errorModal('이름은 2 ~ 10자 사이의 공백 없는 한글로 입력해 주세요', () => document.inputForm.name.focus());
      document.inputForm.name.value = '';
      return;
    } else if (!Validator.isScore(kor)) {
      this.errorModal('국어점수는 0부터 100 사이의 숫자로 입력해 주세요', () => document.inputForm.kor.focus());
      document.inputForm.kor.value = '';
      return;
    } else if (!Validator.isScore(eng)) {
      this.errorModal('영어점수는 0부터 100 사이의 숫자로 입력해 주세요', () => document.inputForm.eng.focus());
      document.inputForm.eng.value = '';
      return;
    } else if (!Validator.isScore(math)) {
      this.errorModal('수학점수는 0부터 100 사이의 숫자로 입력해 주세요', () => document.inputForm.math.focus());
      document.inputForm.math.value = '';
      return;
    }

    const student = new Student(ssn, name, kor, eng, math);
    studentRepository.addStudent(student);

    this.findAllStudent(event);
    document.inputForm.ssn.value = '';
    document.inputForm.name.value = '';
    document.inputForm.kor.value = '';
    document.inputForm.eng.value = '';
    document.inputForm.math.value = '';
  }

  // 학생 삭제
  removeStudent(event) {
    const ssn = parseInt(document.inputForm.ssn.value);

    if (!Validator.hasText(ssn)) {
      this.errorModal('삭제할 학생의 학번을 입력해 주세요', () => document.inputForm.ssn.focus());
      return;
    } else if (!Validator.isNumber(ssn)) {
      this.errorModal('학번은 숫자로 입력해 주세요', () => document.inputForm.ssn.focus());
      document.inputForm.ssn.value = '';
      return;
    }

    let deleted = studentRepository.removeBySsn(ssn);
    if (!deleted) {
      this.warningModal('해당하는 학생이 존재하지 않습니다.', () => document.inputForm.ssn.focus());
    }
    this.findAllStudent(event);
    document.inputForm.ssn.value = '';
  }

  // 학생 목록 조회
  findAllStudent(event) {
    let list = this.rankStudent();
    this.tableViewer(list);
    this.sortSSn(event);
  }

  // 등수가 포함된 학생 정보 생성
  rankStudent() {
    let list = studentRepository.findBySort((num1, num2) => num2.getAvg() - num1.getAvg());
    console.dir(list);
    let RankedList = [];
    list.forEach((e, i) => {
      e.rank = i + 1;
      RankedList.push(e);
    });
    return RankedList;
  }

  // ================ search Method ====================
  // 학번으로 학생 목록 조회
  findbyNumStudent(event) {
    this.activeReset();
    const searchSsn = parseInt(document.searchForm.searchT.value);

    if (!Validator.hasText(searchSsn)) {
      this.findAllStudent(event);
      return;
    } else if (!Validator.isNumber(searchSsn)) {
      this.errorModal('학번은 숫자로 입력해 주세요', () => document.inputForm.ssn.focus());
      document.searchForm.searchT.value = '';
      return;
    }

    let list = studentRepository.findBySsn(searchSsn);
    if (list.length == 0) {
      this.warningModal('해당하는 학생이 존재하지 않습니다.', () => document.searchForm.searchT.focus());
      document.searchForm.searchT.value = '';
      this.findAllStudent(event);
      return;
    }

    let tBodyList = this.tBodyCreate(list);
    document.querySelector('tbody').innerHTML = tBodyList;
    document.querySelector('tfoot').innerHTML = '';
    document.searchForm.searchT.value = '';
  }

  // 이름으로 학생 목록 조회
  findbyNameStudent(event) {
    this.activeReset();
    const searchName = document.searchForm.searchT.value;

    if (!Validator.hasText(searchName)) {
      this.findAllStudent(event);
      return;
    } else if (!Validator.isName(searchName)) {
      this.errorModal('이름은 2 ~ 10자 사이의 공백 없는 한글로만 입력해 주세요', document.searchForm.searchT.focus());
      document.searchForm.searchT.value = '';
      return;
    }

    let list = studentRepository.findByName(searchName);
    if (list.length == 0) {
      this.warningModal('해당하는 학생이 존재하지 않습니다.', () => document.searchForm.searchT.focus());
      document.searchForm.searchT.value = '';
      this.findAllStudent(event);
      return;
    }

    let tBodyList = this.tBodyCreate(list);
    document.querySelector('tbody').innerHTML = tBodyList;
    document.querySelector('tfoot').innerHTML = '';
    document.searchForm.searchT.value = '';
  }

  // ================ sort Method ====================
  // 학번으로 정렬
  sortSSn(event) {
    let list = studentRepository.findBySort((num1, num2) => num1.ssn - num2.ssn);
    this.tableViewer(list);
  }

  // 이름으로 정렬
  sortName(event) {
    let list = studentRepository.findBySort((num1, num2) => num1.ssn - num2.ssn);
    list = studentRepository.findBySort((num1, num2) => num1.name.localeCompare(num2.name));
    this.tableViewer(list);
  }

  // 국어 점수로 정렬
  sortKor(event) {
    let list = studentRepository.findBySort((num1, num2) => num1.ssn - num2.ssn);
    list = studentRepository.findBySort((num1, num2) => num2.korean - num1.korean);
    this.tableViewer(list);
  }

  // 영어 점수로 정렬
  sortEng(event) {
    let list = studentRepository.findBySort((num1, num2) => num1.ssn - num2.ssn);
    list = studentRepository.findBySort((num1, num2) => num2.english - num1.english);
    this.tableViewer(list);
  }

  // 수학 점수로 정렬
  sortMath(event) {
    let list = studentRepository.findBySort((num1, num2) => num1.ssn - num2.ssn);
    list = studentRepository.findBySort((num1, num2) => num2.math - num1.math);
    this.tableViewer(list);
  }

  // 총점으로 정렬
  sortSum(event) {
    let list = studentRepository.findBySort((num1, num2) => num1.ssn - num2.ssn);
    list = studentRepository.findBySort((num1, num2) => num2.getSum() - num1.getSum());
    this.tableViewer(list);
  }

  // 평균 점수로 정렬
  sortAvg(event) {
    let list = studentRepository.findBySort((num1, num2) => num1.ssn - num2.ssn);
    list = studentRepository.findBySort((num1, num2) => num2.getAvg() - num1.getAvg());
    this.tableViewer(list);
  }

  // 등수로 정렬
  sortRank(event) {
    let list = studentRepository.findBySort((num1, num2) => num1.ssn - num2.ssn);
    list = studentRepository.findBySort((num1, num2) => num1.rank - num2.rank);
    this.tableViewer(list);
  }

  // ================ table Method ====================
  // 테이블 표시
  tableViewer(list) {
    let tBodyList = this.tBodyCreate(list);
    let tFootList = this.tFootCreate(list);
    document.querySelector('tbody').innerHTML = tBodyList;
    document.querySelector('tfoot').innerHTML = tFootList;
  }

  // 테이블 HTML문 변경
  tBodyCreate(list) {
    let tbody = '';
    for (const i of list) {
      tbody += '<tr>';
      tbody += '  <td name="tdSsn">' + i.ssn + '</td>';
      tbody += '  <td name="tdName">' + i.name + '</td>';
      tbody += '  <td name="tdKor">' + i.korean + '</td>';
      tbody += '  <td name="tdEng">' + i.english + '</td>';
      tbody += '  <td name="tdMath">' + i.math + '</td>';
      tbody += '  <td name="tdSum">' + i.getSum() + '</td>';
      tbody += '  <td name="tdAvg">' + i.getAvg().toFixed(2) + '</td>';
      tbody += '  <td name="tdRank">' + i.rank + '</td>';
      tbody += '</tr>';
    }
    return tbody;
  }

  // 테이블 전체 평균 HTML문 변경
  tFootCreate(list) {
    let tfoot = '';
    let avgSum = 0;
    list.forEach(i => avgSum += i.getAvg());
    let allAvg = avgSum / list.length;

    tfoot += '<tr>';
    tfoot += '  <td class="fw-bold" colspan="5">전체 평균</td>';
    tfoot += '  <td colspan="3">' + allAvg.toFixed(2) + '</td>';
    tfoot += '</tr>';

    return tfoot;
  }

  // 테이블 헤더 강조 초기화
  activeReset(event) {
    let tableHeads = document.getElementsByTagName('th');
    for (const e of tableHeads) {
      e.setAttribute('class', '');
    }
  }

  // 정렬 시 강조 표시
  sortActive(name) {
    let tableNames = document.getElementsByName(name);
    for (const e of tableNames) {
      e.setAttribute('class', 'table-active')
    }
  }

  // 현재 정렬 조건 표시
  setSortCondition(condition) {
    let sortCondition = document.querySelector('#sortCondition');
    sortCondition.setAttribute('placeholder', condition);
  }

  // ================ modal Method ====================
  // 유효성 검사시 오류창
  errorModal(text, close) {
    Swal.fire({
      icon: 'error',
      title: '오류',
      text: text,
      didClose: close,
    })
  }

  // 검색 결과 존재하지 않을 시 경고창
  warningModal(text, close) {
    Swal.fire({
      icon: 'warning',
      title: '존재하지 않음',
      text: text,
      didClose: close,
    })
  }
}

export { EventHandler }