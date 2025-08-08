export default function filterCurrent(visitors, isCurrent) {
  if (!Array.isArray(visitors)) {
    throw new Error("Expected an array of visitors.");
  }

  return visitors.filter(visitor => visitor.is_current === isCurrent);
}