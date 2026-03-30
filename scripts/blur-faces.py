"""
Face blurring script for Foresee Physio website images.
Uses OpenCV Haar cascade for face detection + Gaussian blur.
"""
import cv2
import os
import sys
from pathlib import Path

# Paths
IMAGES_DIR = Path(__file__).parent.parent / "public" / "images"
OUTPUT_DIR = IMAGES_DIR  # Overwrite in-place (originals backed up)
BACKUP_DIR = Path(__file__).parent.parent / "public" / "images_original"

# OpenCV face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
profile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_profileface.xml')

def detect_faces(img):
    """Detect faces using both frontal and profile cascades."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)

    # Frontal faces - multiple scale factors for better detection
    faces1 = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(20, 20))
    faces2 = face_cascade.detectMultiScale(gray, scaleFactor=1.05, minNeighbors=6, minSize=(30, 30))

    # Profile faces
    faces3 = profile_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(20, 20))

    # Flip and detect profile from other side
    flipped = cv2.flip(gray, 1)
    faces4_flipped = profile_cascade.detectMultiScale(flipped, scaleFactor=1.1, minNeighbors=4, minSize=(20, 20))

    # Mirror back the flipped detections
    h, w = gray.shape
    faces4 = []
    for (x, y, fw, fh) in faces4_flipped:
        faces4.append((w - x - fw, y, fw, fh))

    # Combine all detections
    all_faces = []
    for faces in [faces1, faces2, faces3, faces4]:
        if len(faces) > 0:
            for f in faces:
                all_faces.append(tuple(f))

    # Remove duplicates (faces that overlap significantly)
    if not all_faces:
        return []

    merged = []
    used = set()
    for i, (x1, y1, w1, h1) in enumerate(all_faces):
        if i in used:
            continue
        best = (x1, y1, w1, h1)
        for j, (x2, y2, w2, h2) in enumerate(all_faces):
            if j <= i or j in used:
                continue
            # Check overlap
            ox = max(0, min(x1+w1, x2+w2) - max(x1, x2))
            oy = max(0, min(y1+h1, y2+h2) - max(y1, y2))
            overlap = ox * oy
            area1 = w1 * h1
            area2 = w2 * h2
            if overlap > 0.3 * min(area1, area2):
                # Merge: take the larger one
                if area2 > area1:
                    best = (x2, y2, w2, h2)
                used.add(j)
        merged.append(best)
        used.add(i)

    return merged

def blur_face_region(img, x, y, w, h):
    """Apply strong Gaussian blur to a face region with padding."""
    ih, iw = img.shape[:2]

    # Expand region by 30% for better coverage (hair, forehead)
    pad_x = int(w * 0.3)
    pad_y = int(h * 0.35)

    x1 = max(0, x - pad_x)
    y1 = max(0, y - pad_y)
    x2 = min(iw, x + w + pad_x)
    y2 = min(ih, y + h + pad_y)

    # Extract region
    roi = img[y1:y2, x1:x2]

    # Apply very strong blur
    blur_size = max(int(w * 0.8) | 1, 31)  # Ensure odd number
    if blur_size % 2 == 0:
        blur_size += 1

    blurred = cv2.GaussianBlur(roi, (blur_size, blur_size), 30)

    # Apply pixelation on top for extra anonymization
    small = cv2.resize(roi, (max(8, w // 10), max(8, h // 10)), interpolation=cv2.INTER_LINEAR)
    pixelated = cv2.resize(small, (x2 - x1, y2 - y1), interpolation=cv2.INTER_NEAREST)

    # Blend blur + pixelation
    result = cv2.addWeighted(blurred, 0.5, pixelated, 0.5, 0)
    img[y1:y2, x1:x2] = result

    return img

def process_image(filepath):
    """Process a single image: detect faces and blur them."""
    img = cv2.imread(str(filepath))
    if img is None:
        print(f"  ⚠ Could not read: {filepath.name}")
        return False

    faces = detect_faces(img)

    if not faces:
        print(f"  [ ] No faces detected: {filepath.name}")
        return False

    print(f"  [x] Found {len(faces)} face(s) in: {filepath.name}")

    for (x, y, w, h) in faces:
        img = blur_face_region(img, x, y, w, h)

    # Save
    cv2.imwrite(str(filepath), img, [cv2.IMWRITE_JPEG_QUALITY, 92])
    return True

def main():
    print("=" * 60)
    print("Face Blurring Script for Foresee Physio")
    print("=" * 60)

    # Create backup
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)

    jpg_files = list(IMAGES_DIR.glob("*.jpg"))
    print(f"\nFound {len(jpg_files)} images to process")

    # Backup all originals first
    import shutil
    for f in jpg_files:
        backup_path = BACKUP_DIR / f.name
        if not backup_path.exists():
            shutil.copy2(f, backup_path)
    print(f"Originals backed up to: {BACKUP_DIR}")

    # Process each image
    blurred_count = 0
    for f in sorted(jpg_files):
        if process_image(f):
            blurred_count += 1

    print(f"\n{'=' * 60}")
    print(f"Done! Blurred faces in {blurred_count}/{len(jpg_files)} images")
    print(f"Originals preserved in: {BACKUP_DIR}")

if __name__ == "__main__":
    main()
