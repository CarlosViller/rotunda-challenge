/**
 * Parses a URL based on a specified format, extracting variable values and parameters.
 *
 * @param {string} format - The format string representing the expected structure of the URL,
 *   with variables marked by a colon (e.g., "/users/:userId/profile").
 * @param {string} url - The actual URL to be parsed.
 * 
 * @returns {Object|null} - An object containing variable values and parameters extracted
 *   from the URL based on the provided format. Returns null if there is a format mismatch.
 *
 * @example
 * const format = "/:version/api/:collection/:id";
 * const url = "/6/api/listings/3?sort=desc&limit=10";
 * const parsedResult = URLParser(format, url);
 * // Result: { version: '6', collection: 'listings', id: '3', sort: 'desc', limit: '10' }
} 
 */

// Return true if str is a number
const r = /[0-9]+$/;

function URLParser(format, url) {
  const formatParts = format.split("/");
  const urlParts = url.split("/");
  const result = {};

  //Format mismatch
  if (formatParts.length !== urlParts.length) {
    return null;
  }

  for (let i = 0; i < urlParts.length; i++) {
    const formatPart = formatParts[i];
    const urlPart = urlParts[i];

    if (formatPart.startsWith(":")) {
      const name = formatPart.substring(1);
      const [value, params] = urlPart.split("?");

      // Try to parse value to Number type, if succeed, use the parsed value, otherwise, use the original value
      result[name] = Number(value) || value;

      if (params) {
        params.split("&").forEach((param) => {
          const [key, value] = param.split("=");
          result[key] = Number(value) || value;
        });
      }
    }
  }

  return result;
}

const format = "/:version/api/:collection/:id";
const example = "/6/api/listings/3?sort=desc&limit=10";

console.log(URLParser(format, example));
