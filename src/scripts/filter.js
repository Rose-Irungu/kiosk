export default function filterVisitorsByDate(jsonObject, filterCriteria) {
  const data = jsonObject.data || [];

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // "YYYY-MM-DD"

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff)).toISOString().split('T')[0];
  };

  const getStartOfMonth = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];
  };

  const weekStart = getStartOfWeek(now);
  const monthStart = getStartOfMonth(now);

  // Filter out only checked-out visitors first
  const checkedOutVisitors = data.filter(item => item.check_out);

  let filteredVisitors = [];

  switch (filterCriteria.toLowerCase()) {
    case 'today':
      filteredVisitors = checkedOutVisitors.filter(item => {
        const checkOutDate = new Date(item.check_out).toISOString().split('T')[0];
        return checkOutDate === currentDate;
      });
      break;

    case 'this_week':
      filteredVisitors = checkedOutVisitors.filter(item => {
        const checkOutDate = new Date(item.check_out).toISOString().split('T')[0];
        return checkOutDate >= weekStart && checkOutDate <= currentDate;
      });
      break;

    case 'this_month':
      filteredVisitors = checkedOutVisitors.filter(item => {
        const checkOutDate = new Date(item.check_out).toISOString().split('T')[0];
        return checkOutDate >= monthStart && checkOutDate <= currentDate;
      });
      break;

    default:
      console.warn(`Invalid filter criteria: "${filterCriteria}". Returning all checked-out users.`);
      filteredVisitors = checkedOutVisitors;
  }

  return filteredVisitors;
}
