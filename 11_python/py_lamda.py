import pyfiglet


# 람다 양식
# 함수명 = lambda 매개변수 : 반환값


def add(a, b):
    return a+b


def lambda_add(a, b): return a+b


def deco_text(text): return pyfiglet.figlet_format(text)


print(deco_text("t"))
