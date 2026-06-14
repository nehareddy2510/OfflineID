import {NativeModules} from 'react-native';

const {FaceRecognition} = NativeModules;

class FaceRecognitionService {

  async getEmbedding(
    imagePath: string,
  ): Promise<number[]> {

    return await FaceRecognition.getEmbedding(
      imagePath,
    );

  }

}

export default new FaceRecognitionService();