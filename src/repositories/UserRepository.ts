import {
  enrollUser,
  getAllUsers,
  getUserByEmployeeId,
  deleteUser,
} from '../database/database';

class UserRepository {

  async create(
    id: string,
    name: string,
    employeeId: string,
    imagePath: string,
    embedding: string,
  ) {

    enrollUser(
      id,
      name,
      employeeId,
      imagePath,
      embedding,
    );

  }

  async getAll() {

    return getAllUsers();

  }

  async getByEmployeeId(
    employeeId: string,
  ) {

    return getUserByEmployeeId(
      employeeId,
    );

  }

  async delete(
    id: string,
  ) {

    deleteUser(
      id,
    );

  }

}

export default new UserRepository();
