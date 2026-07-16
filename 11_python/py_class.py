class Dog:                          # 강아지 설계도(틀)
    def __init__(self, name, age):  # 생성자 — 강아지 만들 때 이름·나이 넣기
        self.name = name            # 자기 이름 저장
        self.age = age              # 자기 나이 저장

    def bark(self):                 # 강아지가 할 수 있는 일: 짖기
        print(f"{self.name}: 멍멍!")


# 같은 틀로 강아지 두 마리 만들기
dog1 = Dog("뽀삐", 3)
dog2 = Dog("초코", 5)

dog1.bark()       # 뽀삐: 멍멍!
dog2.bark()       # 초코: 멍멍!
print(dog2.age)   # 5


class World:
    def __init__(self, name):
        self.name = name

    def hello(self):
        print(f"hello, {self.name}!!")


asia = World("korea")
asia.hello()
