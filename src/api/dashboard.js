import axiosInstance from './axiosConfig';

export const dashboardAPI = {
  getDashboardStats: () => {
    return axiosInstance.get('/dashboard');
  },
  
  getMonthlyDonations: (year, month) => {
    return axiosInstance.get('/reports/monthly-donations', {
      params: { year, month }
    });
  },
  
  getYearlyDonations: (year) => {
    return axiosInstance.get('/reports/yearly-donations', {
      params: { year }
    });
  },
  
  getMemberGrowth: (period = 'monthly') => {
    return axiosInstance.get('/reports/member-growth', {
      params: { period }
    });
  },
  
  getRecentActivities: (limit = 10) => {
    return axiosInstance.get('/dashboard/recent-activities', {
      params: { limit }
    });
  },
  
  getUpcomingEvents: (limit = 5) => {
    return axiosInstance.get('/dashboard/upcoming-events', {
      params: { limit }
    });
  },
  
  getSacramentStats: () => {
    return axiosInstance.get('/dashboard/sacrament-stats');
  }
};