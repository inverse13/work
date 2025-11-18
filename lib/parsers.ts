import Papa from 'papaparse'
import { parse as parseXml } from 'xml2js'
import FitParser from 'fit-parser'
import fs from 'fs' // For server-side, use Buffer in API

export async function parseWhoopCsv(file: Buffer) {
  const csv = Papa.parse(file.toString(), { header: true }).data
  return csv.map(row => ({
    date: row.date,
    strain: parseInt(row.strain),
    recovery: parseInt(row.recovery),
    sleep: parseFloat(row.sleep_hours),
    hrv: parseInt(row.hrv),
  }))
}

export async function parseAppleHealthXml(file: Buffer) {
  return new Promise((resolve, reject) => {
    parseXml(file.toString(), (err, result) => {
      if (err) reject(err)
      const records = result?.HealthData?.Record || []
      // Extract workouts, sleep, heart rate, etc. (simplified)
      resolve(records.filter(r => r.$.type.includes('Workout') || r.$.type.includes('Sleep') || r.$.type.includes('HeartRate')))
    })
  })
}

export async function parseGarminFit(file: Buffer) {
  return new Promise((resolve, reject) => {
    const parser = new FitParser()
    parser.parse(file, (err, data) => {
      if (err) reject(err)
      resolve(data?.sessions || []) // Activities, HR, etc.
    })
  })
}

export async function parseOuraJson(file: Buffer) {
  const data = JSON.parse(file.toString())
  return data.sleeps.map(s => ({
    date: s.day,
    sleep: s.total_sleep_duration / 3600, // hours
    hrv: s.hrv_average,
    recovery: s.readiness_score,
  }))
}
