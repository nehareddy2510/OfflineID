import {
  logAttendance,
  getAttendanceLogs,
} from '../database/database';

class AttendanceRepository {

  async markPresent(
    userId: string,
    userName: string,
  ) {

    logAttendance(
      userId,
      userName,
      'present',
    );

  }

  async markFailed() {

    logAttendance(
      'unknown',
      'Unknown',
      'failed',
    );

  }

  async getLogs() {

    return getAttendanceLogs();

  }

}

export default new AttendanceRepository();

