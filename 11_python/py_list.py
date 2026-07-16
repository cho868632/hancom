colors = ["red", "green", "blue"]

print(colors[0])    # red    (첫 번째)
print(colors[-1])   # blue   (마지막)
print(colors[0:2])  # ['red', 'green']  (슬라이싱)

colors[-1] = "black"         # 값 변경
print(colors)
colors.append("pink")        # 끝에 추가
print(colors)
colors.insert(0, "white")    # 특정 위치에 삽입
print(colors)
colors.remove("white")       # 값으로 제거
print(colors)

numbers = [8, 5, 3, 2, 7]
print(numbers)
numbers.sort()               # 오름차순 정렬
print(numbers)
numbers.sort(reverse=True)   # 내림차순 정렬
print(numbers)
numbers.reverse()            # 순서 뒤집기
print(numbers)
print(2 in numbers)          # True (포함 여부)