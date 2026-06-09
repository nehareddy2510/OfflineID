import {open} from 'react-native-quick-sqlite';

const db = open({name: 'offlineid.db', location: 'default'});

export function initDB() {
  db.execute(`
    CREATE TABLE IF NOT EXISTS enrolled_users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      employee_id TEXT NOT NULL UNIQUE,
      photo_base64 TEXT NOT NULL,
      enrolled_at INTEGER NOT NULL
    );
  `);
  db.execute(`
    CREATE TABLE IF NOT EXISTS attendance_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      status TEXT NOT NULL
    );
  `);
}

export function enrollUser(
  id: string,
  name: string,
  employeeId: string,
  photoBase64: string,
) {
  db.execute(
    `INSERT OR REPLACE INTO enrolled_users (id, name, employee_id, photo_base64, enrolled_at)
     VALUES (?, ?, ?, ?, ?)`,
    [id, name, employeeId, photoBase64, Date.now()],
  );
}

export function getAllUsers() {
  const result = db.execute('SELECT * FROM enrolled_users');
  return result.rows?._array ?? [];
}

export function logAttendance(
  userId: string,
  userName: string,
  status: string,
) {
  const id = `${userId}_${Date.now()}`;
  db.execute(
    `INSERT INTO attendance_logs (id, user_id, user_name, timestamp, status)
     VALUES (?, ?, ?, ?, ?)`,
    [id, userId, userName, Date.now(), status],
  );
}

export function getAttendanceLogs() {
  const result = db.execute(
    'SELECT * FROM attendance_logs ORDER BY timestamp DESC LIMIT 100',
  );
  return result.rows?._array ?? [];
}