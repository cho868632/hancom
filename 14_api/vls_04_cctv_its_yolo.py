from ultralytics import YOLO
import cv2
from vls_03_cctv_its_def import its_cctv

test_url = its_cctv(30)

cam = cv2.VideoCapture(test_url)

model = YOLO("yolo26s.pt")

while cam.isOpened():            # 스트림 살아있는 동안 반복
    success, frame = cam.read()    # 다음 프레임 1장 가져옴
    if not success:               # 프레임 못 받으면 종료
        print("프레임 읽기 실패 . . .")
        break

    results = model(frame)         # 탐지 실행 → 박스·라벨 결과
    annotated = results[0].plot()    # 결과를 그림 위에 박스로 그리기

    cv2.namedWindow("OPENAPI", cv2.WINDOW_NORMAL)   # 창 크기 자유 조절
    cv2.imshow("OPENAPI", annotated)                # 화면에 표시

    # (왜 waitKey & 0xFF?) 1ms 대기하며 키 입력 받음 → q 누르면 루프 탈출
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# 6. 자원 해제
#    (왜?) cap·창 점유 그대로 두면 다음 실행 시 카메라 잠김 → 리소스 누수
cam.release()                       # 스트림 닫기
cv2.destroyAllWindows()                # 모든 창 닫기
