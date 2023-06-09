/**
 * Helpers related to Next.js and others routes setup and handling
 *
 * @author Gregorio Alvarez <allgrego14@gmail.com>
 *
 */

import { debugErrorLog } from "@/common/utils/debug";
import { BACKEND_BASE_URL } from "@/common/utils/fetch";

/**
 * Unique alias of each route
 */
type RoutesAlias =
  // Pages
  | "index"

  // API
  | "api-national-identity-cne-get-person-data"
  | "api-rates-bcv-get-rates"
  | "api-rates-monitor-dolar-get-rates"

  // Services
  | "service-cne-cid-search"
  | "service-bcv-get-rates"
  | "service-monitor-dolar-get-rates";

/**
 * NextJS and other routes
 */
export const routes: Record<RoutesAlias, string> = {
  /**
   * Pages
   */
  index: "/",

  /**
   * Next.js API
   */
  // National Identity - CNE
  "api-national-identity-cne-get-person-data": "/api/cne/person",
  "api-rates-bcv-get-rates": "/api/bcv/rates",
  "api-rates-monitor-dolar-get-rates": "/api/monitor-dolar/rates",
  /**
   * Services/Providers API
   */
  "service-cne-cid-search": `${BACKEND_BASE_URL}/v1/cne/search/cid`,
  "service-bcv-get-rates": `${BACKEND_BASE_URL}/v1/bcv/rates`,
  "service-monitor-dolar-get-rates": `${BACKEND_BASE_URL}/v1/monitor-dolar/rates`,
};

/**
 * Get a route from an ALIAS with parameters if any.
 *
 * For example, from getRoute('api-get-cities',[123,456]) you'd get "/api/geodata/countries/123/states/456/cities"
 * And with no parameters, from getRoute('api-get-cities') you'd get "/api/geodata/countries/:countryId/states/456/:cityId"
 *
 * @author Gregorio Alvarez <allgrego14@gmail.com>
 *
 * @param {RoutesAlias} routesAlias Alias of route according to routes declared above
 * @param {(string | number)[]} parameters array of values to be replaced if route has wildcard (order is important)
 *
 * @return {string} resulting route
 */
export function getRoute(
  routesAlias: RoutesAlias,
  parameters?: (string | number)[]
): string {
  try {
    const index = Object.keys(routes).find((key) => routesAlias === key) as
      | RoutesAlias
      | undefined;

    if (!index) throw new Error(`Invalid route alias: ${routesAlias}`);

    let path = routes[index];

    const matches = Array.from(path.matchAll(/(\/:\w+)/gim));

    if (!matches || !parameters) return path;

    const wildcards = matches.map((matchDetails) => matchDetails[0]);

    if (wildcards.length > parameters.length) {
      debugErrorLog(
        `Missing parameters for route "${path}". Alias: "${routesAlias}". Provided parameters: [${parameters.join(
          ","
        )}]`
      );
    }

    wildcards.forEach((wildcard, index) => {
      if (!parameters[index]) return;
      path = path.replace(wildcard, `/${String(parameters[index])}`);
    });

    return path;
  } catch (error) {
    debugErrorLog("Error in getRoute function", error);
    throw error;
  }
}
