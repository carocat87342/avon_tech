import momentTZ from "moment-timezone";

const timeZoneNames = momentTZ.tz.names();

const timeZones = timeZoneNames.map((item) => {
  const formattedZone = momentTZ.tz(item).format("z, Z");
  return ({
    label: formattedZone,
    value: formattedZone.split(",")[1].trim(),
  });
});

export const TIMEZONES = [
  ...timeZones,
];

export const CURRENT_TIMEZONE = momentTZ.tz(momentTZ.tz.guess()).zoneAbbr();
