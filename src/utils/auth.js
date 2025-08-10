export const getUserInfo = () => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        console.error('Error parsing user info:', error);
        return null;
    }
};

export const getUserRole = () => {
    const userInfo = getUserInfo();
    return userInfo?.role || null;
};

export const isAuthenticated = () => {
    const userInfo = getUserInfo();
    return userInfo && userInfo.is_active;
};