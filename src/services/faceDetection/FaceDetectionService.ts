export interface FaceDetectionResult {
  success: boolean;
  faceCount: number;
  message: string;
}

class FaceDetectionService {
  async detect(imagePath: string): Promise<FaceDetectionResult> {
    // ML Kit will be integrated here later

    return {
      success: true,
      faceCount: 1,
      message: "Mock detection successful",
    };
  }
}

export default new FaceDetectionService();