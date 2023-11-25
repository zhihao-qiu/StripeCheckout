import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DAYS_ARRAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function getDayName(dayIndex: number) {
  return DAYS_ARRAY[dayIndex]
}

/**
 * The getDateFrom function is used to calculate a new Date by adding or subtracting a specified number of days from a given startDate.
 * Depending on the sign of amountOfDays, it either moves forward or backward in time.
 * @param startDate The initial date from which the calculation starts
 * @param amountOfDays The number of days to add or subtract from the startDate. Positive values move the date forward in time, and negative values move the date backward in time.
 * @returns A new Date object representing the calculated date.
 *
 *  Examples:
 *
 *  Moving forward in time:
 *
 *  const startDate = new Date(2023, 0, 1); // January 1, 2023
 *  const daysToAdd = 7; // Add 7 days to move forward
 *  const newDate = getDateFrom(startDate, daysToAdd);
 *  console.log(newDate); // Result: January 8, 2023
 *
 *  Moving backward in time:
 *
 *  const startDate = new Date(2023, 0, 1); // January 1, 2023
 *  const daysToSubtract = -7; // Subtract 7 days to move backward
 *  const newDate = getDateFrom(startDate, daysToSubtract);
 *  console.log(newDate); // Result: December 25, 2022
 */
export function getDateFrom(startDate: Date, amountOfDays: number): Date {
  const currentDate = new Date(startDate)
  currentDate.setDate(currentDate.getDate() + amountOfDays)
  return currentDate
}

/**
 * Formats a numeric value as a currency string in Canadian Dollars (CAD).
 *
 * @param amount - The numeric value to be formatted as currency.
 * @returns A string representing the `amount` formatted as a currency in CAD.
 */
export function dollarFormat(amount: number) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount)
  return formatted
}

// list of postal codes in service
const POSTAL_CODE_ARRAY = ['L4HL3P', 'L6ZL7L', 'L4GM4C']

/**
 * Verifies if given postal code is part of the accepted postal codes.
 *
 * @param postalCode - The postal code to be verified.
 * @returns boolean.
 */
export function isPostalCodeValid(postalCode: string) {
  const postalCodeCleaned = postalCode.trim().replace(/\s/g, '').toUpperCase()
  return POSTAL_CODE_ARRAY.includes(postalCodeCleaned)
}
