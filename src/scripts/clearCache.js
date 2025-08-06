import toast from "react-hot-toast";
export default async function clearCache(navigate, route) {
  try {
    // Clear relevant localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');

    sessionStorage.clear();

    // Clear all cookies 
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });

    console.log(' Cache and cookies cleared');
    // Optional: Notify server to kill session/token
    // await fetch('/api/logout', { method: 'POST' });
    toast.success(' Cache and cookies cleared');

  } catch (error) {
    console.error(`Cache clear failed: ${error}`);
  } finally {
    setTimeout(() => {
      navigate(route);
    }, 4000);
  }
}
