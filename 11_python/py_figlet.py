import pyfiglet

def good_sentence(sentence):
    """
    입력된 문자열을 pyfiglet 형식으로 출력합니다.
    매개변수: sentence (str)
    반환: None — 출력만 수행
    """
    py_sentence = pyfiglet.figlet_format(sentence)
    print(py_sentence)
    
good_sentence("HAVE")
good_sentence("A")

good_sentence("GOOD")
good_sentence("Day")
