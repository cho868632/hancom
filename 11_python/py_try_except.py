user_input = input("미터 값을 입력해주세요: ")

try:
    meters = float(user_input)   # 숫자 변환 시도
    feet = meters * 3.28084
    print(f"{meters}m는 {feet:.2f}ft입니다.")
except ValueError:
    print("숫자를 입력해주세요.")  # 변환 실패 시 실행
try:
    result = 10 / 0
except ZeroDivisionError:
    print("0으로 나눌 수 없어요!")
try:
    result = "나이: " + 20
except TypeError:
    print("문자열과 숫자는 바로 합칠 수 없어요! str(20) 으로 변환 필요")
