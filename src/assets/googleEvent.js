const CLIENT_ID = "1005893304579-cvbbrt18bh42fi7e27cahhso6h8gar14.apps.googleusercontent.com"
const API_KEY = "AIzaSyAwoehN9FTVQrrnBG9-DPCOqmmJ08SXSp8"
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";
let tokenClient;
let gapiInited = false;
let gisInited = false;
function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
  gisInited = true;
  console.log("token");
  console.log(tokenClient);
}
function createGoogleEvent(eventDetails) {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    await scheduleEvent(eventDetails);
  };
  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    tokenClient.requestAccessToken({ prompt: "" });
  }
}
function scheduleEvent(eventDetails) {
  const event = {
    summary: eventDetails.taskName,
    description: eventDetails.description,
    start: {
      dateTime: eventDetails.startTime,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: "America/Los_Angeles",
    },
    attendees: [{ email: eventDetails.email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
  request.execute(function (event) {
    console.info("Event created: " + event.htmlLink);
  });
}