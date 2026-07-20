from PIL import Image, ImageEnhance, ImageOps
import matplotlib.pyplot as plt
from pathlib import Path

img = Image.open("captured_images/result_20260720_091955.jpg")

# # 이미지 회전
# img_rotated = img.rotate(90)

# # 밝기 조절
# enhancer = ImageEnhance.Brightness(img)
# img_brightness = enhancer.enhance(0.5)

# # 좌우반전
# img_flip = ImageOps.mirror(img)

# fig, ax = plt.subplots(2, 3, figsize=(20, 10))

# ax[0, 0].imshow(img)
# ax[0, 0].axis('off')
# ax[0, 0].set_title("Original")

# ax[0, 1].imshow(img_rotated)
# ax[0, 1].axis('off')
# ax[0, 1].set_title("Rotated")

# ax[0, 2].imshow(img_brightness)
# ax[0, 2].axis('off')
# ax[0, 2].set_title("Brightness")

# ax[1, 0].imshow(img_flip)
# ax[1, 0].axis('off')
# ax[1, 0].set_title("Flip")

# plt.show()


aug = [
    ("Original", img), ("Rotated", img.rotate(90)), ("Brightness",
                                                     ImageEnhance.Brightness(img).enhance(0.5)), ("Flip", ImageOps.mirror(img)),
]
# 증강 이미지 저장
out_dir = Path("captured_images")
for title, image in aug:
    out_path = out_dir / f"aug_{title.lower()}.jpg"
    image.save(out_path)
    print(f"saved: {out_path}")

rows, cols = 2, 3
fig, ax = plt.subplots(rows, cols, figsize=(20, 10))
axes = ax.flatten()
for axis, (title, image) in zip(axes, aug):
    axis.imshow(image)
    axis.axis('off')
    axis.set_title(title)
for axis in axes[len(aug):]:
    axis.axis('off')

plt.tight_layout()
plt.show()
