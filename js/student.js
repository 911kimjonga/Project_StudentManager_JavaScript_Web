// 학생 객체 생성
class Student {
  constructor(ssn, name, korean, english, math) {
    this.ssn = ssn;
    this.name = name;
    this.korean = korean;
    this.english = english;
    this.math = math;
  }

  static schoolName = '가나다라 초등학교';

  // 총점 계산
  getSum() {
    return parseInt(this.korean) + parseInt(this.english) + parseInt(this.math);
  }

  // 평균 계산
  getAvg() {
    return this.getSum() / 3;
  }

  toString() {
    return `${this.ssn} \t ${this.name} \t ${this.korean} \t ${this.english} \t ${this.math} \t ${this.getSum()} \t ${this.getAvg()}`;
  }
}

export { Student }