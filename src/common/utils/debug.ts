/**
 * Helpers related to debugging
 */

import { getCurrentUTCTime } from "@/common/utils/time";

/**
 * Verify in environment variables if app is in debug mode
 *
 * @author Gregorio Alvarez <allgrego14@gmail.com>
 *
 * @return {boolean} true if in debug mode, otherwise false
 */
export function onDebugMode(): boolean {
  try {
    return process.env.NEXT_PUBLIC_APP_MODE === "debug";
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Prints in console as debug type if debug mode is on
 *
 * @author Gregorio Alvarez <allgrego14@gmail.com>
 *
 * @param {unknown[]} parameters Parameters to be printed
 *
 * @return {void}
 */
export function debugLog(...parameters: unknown[]): void {
  // Do nothing if not debug mode
  if (!onDebugMode()) return;

  // Display timestamp only Server Side
  if (typeof window === "undefined") {
    const prefix = `[${getCurrentUTCTime()}][DEBUG]`;
    console.debug(prefix, ...parameters);
    return;
  }

  // Otherwise, Client Side case
  console.debug(...parameters);
}

/**
 * Prints in console as error type if debug mode is on
 *
 * @author Gregorio Alvarez <allgrego14@gmail.com>
 *
 * @param {unknown[]} parameters Parameters to be printed
 *
 * @return {void}
 */
export function debugErrorLog(...parameters: unknown[]): void {
  // Do nothing if not debug mode
  if (!onDebugMode()) return;

  // Display timestamp only Server Side
  if (typeof window === "undefined") {
    const prefix = `[${getCurrentUTCTime()}][ERROR]`;
    console.error(prefix, ...parameters);
    return;
  }

  console.error(...parameters);
}
