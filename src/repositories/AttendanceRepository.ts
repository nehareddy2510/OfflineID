import {
logAttendance,
getAttendanceLogs,
} from "../database/database";

class AttendanceRepository {
async mark(
userId: string,
userName: string,
status: string,
) {
logAttendance(
userId,
userName,
status,
);
}

async getLogs() {
return getAttendanceLogs();
}
}

export default new AttendanceRepository();
