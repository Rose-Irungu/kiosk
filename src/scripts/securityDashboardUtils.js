export function getTodaysDate() {
  const today = new Date();

  // Extract year, month, and day
  const year = today.getFullYear();
  // getMonth() returns a 0-based index (0 for January, 11 for December), so add 1.
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
  const day = today.getDate().toString().padStart(2, '0');

  // Format the date as YYYY-MM-DD
  return `${year}-${month}-${day}`;
}

const today = getTodaysDate();

export function todaysVisitors(stats){
  const visitorData = stats?.expected_visitors?.data;
  const todaysVisitors = visitorData.filter(visitor => visitor.created_at === today);
  return todaysVisitors;
}