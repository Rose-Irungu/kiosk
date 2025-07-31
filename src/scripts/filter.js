 //Filters visitors based on created_at and a given time range
 
 //{Object} data - The entire JSON response object
 //{String} filter - "today" | "this_week" | "this_month"
 //{Array} Filtered visitor list
 
export default function filterVisitorsByDate(data, filter) {
  if (!data?.visitors?.data) return [];

  const now = new Date();

  // Normalize to start of day
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let cutoffDate;

  switch (filter) {
    case "today":
      cutoffDate = startOfToday;
      break;

    case "this_week":
      // 7 days ago from now
      cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;

    case "this_month":
      // 30 days ago from now
      cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;

    default:
      console.warn("Invalid filter option. Use 'today', 'this_week' or 'this_month'.");
      return [];
  }

  return data.visitors.data.filter(visitor => {
    const createdAt = new Date(visitor.created_at);
    return createdAt >= cutoffDate;
  });
}
