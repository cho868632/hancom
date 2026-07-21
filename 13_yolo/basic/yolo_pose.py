import os
from ultralytics import YOLO
import cv2

model = YOLO("yolo26s-pose.pt")

image_path = "images/pose.png"
res = model(image_path)


res_img = res[0].plot()

base_name = os.path.splitext(os.path.basename(image_path))[0]  # "image"


output_image_path = f"images/{base_name}_predict.jpg"
cv2.imwrite(output_image_path, res_img)
print(f"예측 결과 이미지가 잘 저장 되었습니다. {output_image_path}")
