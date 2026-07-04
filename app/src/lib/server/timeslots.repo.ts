import { getPool } from "@/lib/db";
import {
  hhmmToPgTime,
  mapTimeSlotRow,
  pgTimeToHHmm,
  type TimeSlot,
} from "@/lib/server/mappers";

export async function listActive(): Promise<TimeSlot[]> {
  const { rows } = await getPool().query(
    `SELECT id, slot_time FROM time_slots WHERE is_active = true ORDER BY slot_time`
  );
  return rows.map(mapTimeSlotRow);
}

export async function idByTime(time: string): Promise<string | null> {
  const { rows } = await getPool().query(
    `SELECT id FROM time_slots WHERE slot_time = $1`,
    [hhmmToPgTime(time)]
  );
  return rows[0] ? String(rows[0].id) : null;
}

export async function timeById(id: string): Promise<string | null> {
  const { rows } = await getPool().query(
    `SELECT slot_time FROM time_slots WHERE id = $1`,
    [id]
  );
  return rows[0] ? pgTimeToHHmm(rows[0].slot_time) : null;
}
