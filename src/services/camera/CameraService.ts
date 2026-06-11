import RNFS from 'react-native-fs';

class CameraService {
  async savePhoto(
    originalPath: string,
    employeeId: string,
  ): Promise<string> {
    const usersFolder = `${RNFS.DocumentDirectoryPath}/users`;

    const exists = await RNFS.exists(usersFolder);

    if (!exists) {
      await RNFS.mkdir(usersFolder);
    }

    const destinationPath = `${usersFolder}/${employeeId}.jpg`;

    await RNFS.copyFile(originalPath, destinationPath);

    return destinationPath;
  }
}

export default new CameraService();