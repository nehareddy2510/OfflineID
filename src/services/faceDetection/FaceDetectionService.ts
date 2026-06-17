import {NativeModules} from 'react-native';

const {FaceDetection} = NativeModules;

export interface FaceDetectionResult {

  faceCount: number;

  headY: number;

  headZ: number;

  leftEye: number;

  rightEye: number;

}

class FaceDetectionService {

  async detect(
    imagePath: string,
  ): Promise<FaceDetectionResult> {

    return await FaceDetection.detect(
      imagePath,
    );

  }

  async hasExactlyOneFace(
    imagePath: string,
  ): Promise<boolean> {

    const result =
      await this.detect(
        imagePath,
      );

    return (
      result.faceCount === 1
    );

  }

}

export default new FaceDetectionService();
