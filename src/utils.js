/**
 * utils.js
 * Shared helper functions for date formatting, validation, and Slack API calls.
 */

// Checks if two date objects represent the same calendar day.
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

// Formats a date to "dd-MMM-yyyy".
function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "dd-MMM-yyyy");
}

// Safely parses a date from the sheet.
function parseDate(rawDate) {
  let jd = rawDate instanceof Date ? rawDate : new Date(rawDate);
  return isNaN(jd) ? null : jd;
}

// Sends a JSON payload to Slack via Webhook.
function sendSlackNotification(url, text) {
  const payload = { text: text };
  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  });
}

// Ensures the sheet and headers exist.
function ensureSheetAndHeaders(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log(`Creating new sheet "${sheetName}"...`);
    sheet = ss.insertSheet(sheetName);
  }
  
  const expectedHeaders = ["Employee Name", "Joining Date", "Role", "Team"];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(expectedHeaders);
  } else {
    // Check and fix headers if needed
    const headers = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];
    for (let i = 0; i < expectedHeaders.length; i++) {
      if (headers[i] !== expectedHeaders[i]) {
        sheet.getRange(1, i + 1).setValue(expectedHeaders[i]);
      }
    }
  }
  return sheet;
}