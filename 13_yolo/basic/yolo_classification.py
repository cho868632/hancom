from ultralytics import YOLO
import cv2

model = YOLO("yolo26n-cls.pt")

res = model("/images/images.webp")

res_img = res[0].plot()

# 상위 5개 예측 클래스와 확률 출력
names = res[0].names
probs = res[0].probs
for i in probs.top5:
    print(f"{names[i]}: {probs.data[i]:.4f}")

output_image_path = "classfiedimg.jpg"
cv2.imwrite(output_image_path, res_img)
print(f"예측 결과 이미지가 잘 저장 되었습니다. {output_image_path}")
