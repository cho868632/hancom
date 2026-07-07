// 1. Dog 클래스 — 강아지를 찍어내는 "틀"
class Dog {
  constructor(name) {
    // new로 만들 때 자동 호출, 받은 이름을 보관
    this.name = name; // this = 지금 만들어지는 객체 자신
  }
  bark() {
    // 메서드 — 모든 Dog 객체가 함께 쓰는 동작
    return `${this.name}: 멍멍!`;
  }
}

class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  info() {
    return `고양이 이름은 ${this.name}이고 나이는 ${this.age}살 입니다`;
  }
}

// 2. 결과 칸 찾기
const out = document.querySelector("#out");
const info_out = document.querySelector("#info_out");

// 3. 틀로 객체(인스턴스) 두 개 찍어내기 (new)
const poppy = new Dog("뽀삐"); // 변수명은 의미 있게 (a·b 대신)
const choco = new Dog("초코");
const navi = new Cat("나비", 10);

// 4. 버튼 누르면 각 객체가 자기 이름으로 짖기 (화살표 함수)
document.querySelector("#bark").addEventListener("click", () => {
  out.textContent = `${poppy.bark()}  ${choco.bark()}`;
});
document.querySelector("#info").addEventListener("click", () => {
  info_out.textContent = `${navi.info()}  `;
});
