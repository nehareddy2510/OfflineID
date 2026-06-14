
import {open} from 'react-native-quick-sqlite';

const db = open({
  name: 'offlineid.db',
  location: 'default',
});

export function initDB() {
  db.execute(`
    CREATE TABLE IF NOT EXISTS enrolled_users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      employee_id TEXT NOT NULL UNIQUE,
      image_path TEXT NOT NULL,
      embedding TEXT,
      created_at INTEGER NOT NULL
    );
  `);

  try {
    db.execute(`
      ALTER TABLE enrolled_users
      ADD COLUMN embedding TEXT;
    `);
  } catch (e) {}

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
  imagePath: string,
  embedding: string | null = null,
) {
  db.execute(
    `
    INSERT OR REPLACE INTO enrolled_users
    (
      id,
      name,
      employee_id,
      image_path,
      embedding,
      created_at
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      id,
      name,
      employeeId,
      imagePath,
      embedding,
      Date.now(),
    ],
  );
}

export function getAllUsers() {
  const result = db.execute(`
    SELECT *
    FROM enrolled_users
    ORDER BY created_at DESC
  `);

  return result.rows?._array ?? [];
}

export function getUserByEmployeeId(employeeId: string) {
  const result = db.execute(
    `
    SELECT *
    FROM enrolled_users
    WHERE employee_id = ?
    `,
    [employeeId],
  );

  return result.rows?._array?.[0] ?? null;
}

export function deleteUser(id: string) {
  db.execute(
    `
    DELETE FROM enrolled_users
    WHERE id = ?
    `,
    [id],
  );
}

export function logAttendance(
  userId: string,
  userName: string,
  status: string,
) {
  const id = `${userId}_${Date.now()}`;

  db.execute(
    `
    INSERT INTO attendance_logs
    (
      id,
      user_id,
      user_name,
      timestamp,
      status
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      id,
      userId,
      userName,
      Date.now(),
      status,
    ],
  );
}

export function getAttendanceLogs() {
  const result = db.execute(`
    SELECT *
    FROM attendance_logs
    ORDER BY timestamp DESC
    LIMIT 100
  `);

  return result.rows?._array ?? [];
}

