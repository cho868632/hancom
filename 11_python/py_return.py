from termcolor import colored


def highlight(text):
    return colored(text, "yellow", "on_red", ["bold"])  # 꾸민 텍스트를 돌려줌


msg = highlight("중요 공지!")
print(msg)
