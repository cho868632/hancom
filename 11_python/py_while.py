number = 5
while number > 0:
    print(number)
    number -= 1
print("발사!")
# 5
# 4
# 3
# 2
# 1
# 발사!
lap = 1
while lap <= 3:
    print(f"회전목마 {lap}바퀴!")
    lap += 1
print("끝!")
# 회전목마 1바퀴!
# 회전목마 2바퀴!
# 회전목마 3바퀴!
# 끝!


def meters_to_feet(meters):
    return meters * 3.28084


while True:
    user_input = input("미터 값을 입력해주세요: ")
    try:
        meters = float(user_input)
        feet = meters_to_feet(meters)
        print(f"{meters}m는 {feet:.2f}ft입니다.")
        break          # 성공하면 루프 종료
    except ValueError:
        print("숫자를 입력해주세요. 다시 시도하세요.")
