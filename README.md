# OfflineID

An offline employee attendance system that performs face recognition directly on-device using TensorFlow Lite and FaceNet, without requiring an internet connection.

## Features

- Offline face recognition
- Face embedding generation using FaceNet
- Liveness detection before verification
- Automatic attendance logging
- Local SQLite database
- Local image storage
- Native Android TensorFlow Lite integration
- React Native cross-platform UI

---

## Tech Stack

### Frontend
- React Native
- TypeScript

### Machine Learning
- TensorFlow Lite
- FaceNet
- Cosine Similarity

### Storage
- SQLite
- Android File System

### Native Android
- Kotlin
- Native Modules
- Vision Camera

---

## Project Architecture

```
Camera
      │
      ▼
Vision Camera
      │
      ▼
Captured Face
      │
      ▼
TensorFlow Lite
      │
      ▼
FaceNet
      │
      ▼
128D Face Embedding
      │
      ▼
Cosine Similarity
      │
      ▼
SQLite Database
      │
      ▼
Attendance Recorded
```

---

## Project Structure

```
src
│
├── components
├── database
├── repositories
├── screens
├── services
├── utils
```

---

## How It Works

1. User completes liveness detection.
2. Camera captures a face image.
3. TensorFlow Lite runs the FaceNet model.
4. A face embedding is generated.
5. Cosine similarity compares the embedding against enrolled users.
6. If similarity exceeds the threshold, attendance is marked.
7. All processing happens locally on the device.

---

## Future Improvements

- Cloud synchronization
- Admin dashboard
- Multi-device support
- Face anti-spoofing
- Employee analytics
- Real-time attendance monitoring

---

