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
const POSTAL_CODE_ARRAY = [
  'M1B',
  'M1C',
  'M1E',
  'M1G',
  'M1H',
  'M1J',
  'M1K',
  'M1L',
  'M1M',
  'M1N',
  'M1P',
  'M1R',
  'M1S',
  'M1T',
  'M1V',
  'M1W',
  'M1X',
  'M2H',
  'M2J',
  'M2K',
  'M2L',
  'M2M',
  'M2N',
  'M2P',
  'M2R',
  'M3A',
  'M3B',
  'M3C',
  'M3H',
  'M3J',
  'M3K',
  'M3L',
  'M3M',
  'M3N',
  'M4A',
  'M4B',
  'M4C',
  'M4E',
  'M4G',
  'M4H',
  'M4J',
  'M4K',
  'M4L',
  'M4M',
  'M4N',
  'M4P',
  'M4R',
  'M4S',
  'M4T',
  'M4V',
  'M4W',
  'M4X',
  'M4Y',
  'M5A',
  'M5B',
  'M5C',
  'M5E',
  'M5G',
  'M5H',
  'M5J',
  'M5K',
  'M5L',
  'M5M',
  'M5N',
  'M5P',
  'M5R',
  'M5S',
  'M5T',
  'M5V',
  'M5W',
  'M5X',
  'M6A',
  'M6B',
  'M6C',
  'M6E',
  'M6G',
  'M6H',
  'M6J',
  'M6K',
  'M6L',
  'M6M',
  'M6N',
  'M6P',
  'M6R',
  'M6S',
  'M7A',
  'M7R',
  'M7Y',
  'M8V',
  'M8W',
  'M8X',
  'M8Y',
  'M8Z',
  'M9A',
  'M9B',
  'M9C',
  'M9L',
  'M9M',
  'M9N',
  'M9P',
  'M9R',
  'M9V',
  'M9W',
  'L0H',
  'L0J',
  'L1S',
  'L1T',
  'L1V',
  'L1W',
  'L1X',
  'L1Y',
  'L1Z',
  'L3P',
  'L3R',
  'L3S',
  'L3T',
  'L3X',
  'L3Y',
  'L4A',
  'L4B',
  'L4C',
  'L4E',
  'L4G',
  'L4H',
  'L4J',
  'L4K',
  'L4L',
  'L4S',
  'L4T',
  'L4V',
  'L4W',
  'L4X',
  'L4Y',
  'L4Z',
  'L5A',
  'L5B',
  'L5C',
  'L5E',
  'L5G',
  'L5H',
  'L5J',
  'L5K',
  'L5L',
  'L5M',
  'L5N',
  'L5P',
  'L5R',
  'L5S',
  'L5T',
  'L5V',
  'L5W',
  'L6A',
  'L6B',
  'L6C',
  'L6E',
  'L6G',
  'L6P',
  'L6R',
  'L6S',
  'L6T',
  'L6V',
  'L6W',
  'L6X',
  'L6Y',
  'L6Z',
  'L7A',
  'L7B',
  'L7C',
  'L7E',
  'L7G',
  'L9L',
  'L9N',
  'L9P',
]

/**
 * Verifies if given postal code is part of the accepted postal codes.
 *
 * @param postalCode - The postal code to be verified.
 * @returns boolean.
 */
export function isPostalCodeValid(postalCode: string) {
  const postalCodeCleaned = postalCode
    .trim()
    .replace(/\s/g, '')
    .toUpperCase()
    .slice(0, 3)
  return POSTAL_CODE_ARRAY.includes(postalCodeCleaned)
}
