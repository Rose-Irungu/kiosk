export default function filterCurrent(devices, isCurrent) {
  if (!Array.isArray(devices)) {
    throw new Error("Expected an array of visitors.");
  }

  return devices.filter(device => device.is_current === isCurrent);
}