import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../../api/dashboard';
import { familiesAPI } from '../../api/families';
import { membersAPI } from '../../api/members';
import { donationsAPI } from '../../api/donations';
import StatCard from '../../components/dashboard/StatCard/StatCard';
import DonationChart from '../../components/dashboard/DonationChart/DonationChart';
import MemberGrowthChart from '../../components/dashboard/MemberGrowthChart/MemberGrowthChart';
import Card from '../../components/common/Card/Card';
import Table from '../../components/common/Table/Table';
import { 
  IoPeople, 
  IoWallet, 
  IoCalendar, 
  IoBusiness,
  IoPersonAdd,
  IoWater,
  IoWine,
  IoHeart
} from 'react-icons/io5';
import './DashboardPage.css';

const DashboardPage = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalFamilies: 0,
    totalMembers: 0,
    totalDonations: 0
  });
  const [sacramentStats, setSacramentStats] = useState({
    baptisms: 0,
    communions: 0,
    confirmations: 0,
    marriages: 0,
    total: 0
  });

  // Fetch dashboard statistics
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      try {
        const [familiesRes, membersRes, donationsRes] = await Promise.all([
          familiesAPI.getAllFamilies({ limit: 1 }),
          membersAPI.getAllMembers({ limit: 1 }),
          donationsAPI.getAllDonations({ limit: 100 })
        ]);
        
        return {
          totalFamilies: familiesRes?.data?.total || 0,
          totalMembers: membersRes?.data?.total || 0,
          totalDonations: donationsRes?.data?.totalAmount || 0
        };
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return {
          totalFamilies: 0,
          totalMembers: 0,
          totalDonations: 0
        };
      }
    }
  });

  // Fetch sacrament statistics - FIXED: Access the data correctly
  const { data: sacramentsData } = useQuery({
    queryKey: ['sacrament-stats'],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getSacramentStats();
        console.log('Raw API response:', response);
        // The data is in response.data.data
        const sacramentData = response?.data?.data || response?.data || {
          baptisms: 0,
          communions: 0,
          confirmations: 0,
          marriages: 0,
          total: 0
        };
        console.log('Extracted sacrament data:', sacramentData);
        return sacramentData;
      } catch (error) {
        console.error('Error fetching sacrament stats:', error);
        return {
          baptisms: 0,
          communions: 0,
          confirmations: 0,
          marriages: 0,
          total: 0
        };
      }
    }
  });

  // Fetch monthly donations for chart
  const { data: donations } = useQuery({
    queryKey: ['monthly-donations'],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getMonthlyDonations(2024, 3);
        return response?.data || [
          { name: "Jan", value: 0 },
          { name: "Feb", value: 0 },
          { name: "Mar", value: 0 },
          { name: "Apr", value: 0 },
          { name: "May", value: 0 },
          { name: "Jun", value: 0 }
        ];
      } catch (error) {
        console.error('Error fetching monthly donations:', error);
        return [
          { name: "Jan", value: 0 },
          { name: "Feb", value: 0 },
          { name: "Mar", value: 0 },
          { name: "Apr", value: 0 },
          { name: "May", value: 0 },
          { name: "Jun", value: 0 }
        ];
      }
    }
  });

  // Fetch member growth data
  const { data: growth } = useQuery({
    queryKey: ['member-growth'],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getMemberGrowth('monthly');
        return response?.data || [
          { period: "Jan", members: 0, newMembers: 0 },
          { period: "Feb", members: 0, newMembers: 0 },
          { period: "Mar", members: 0, newMembers: 0 }
        ];
      } catch (error) {
        console.error('Error fetching member growth:', error);
        return [
          { period: "Jan", members: 0, newMembers: 0 },
          { period: "Feb", members: 0, newMembers: 0 },
          { period: "Mar", members: 0, newMembers: 0 }
        ];
      }
    }
  });

  // Fetch recent activities
  const { data: activities } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getRecentActivities(5);
        return response?.data || [];
      } catch (error) {
        console.error('Error fetching recent activities:', error);
        return [];
      }
    }
  });

  // Fetch upcoming events
  const { data: events } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      try {
        const response = await dashboardAPI.getUpcomingEvents(5);
        return response?.data || [];
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
        return [];
      }
    }
  });

  // Update state when data loads
  useEffect(() => {
    if (stats) {
      setDashboardStats(stats);
    }
  }, [stats]);

  useEffect(() => {
    if (sacramentsData) {
      console.log('Setting sacrament stats to:', sacramentsData);
      setSacramentStats(sacramentsData);
    }
  }, [sacramentsData]);

  // Stat cards configuration
  const statCards = [
    {
      title: 'Total Families',
      value: dashboardStats?.totalFamilies?.toLocaleString() || '0',
      icon: <IoPeople />,
      color: 'gold',
      link: '/families'
    },
    {
      title: 'Total Members',
      value: dashboardStats?.totalMembers?.toLocaleString() || '0',
      icon: <IoPeople />,
      color: 'crimson',
      link: '/members'
    },
    {
      title: 'Total Donations',
      value: `$${(dashboardStats?.totalDonations || 0).toLocaleString()}`,
      icon: <IoWallet />,
      color: 'purple',
      link: '/donations'
    },
    {
      title: 'Total Sacraments',
      value: (sacramentStats?.total || 0).toLocaleString(),
      icon: <IoCalendar />,
      color: 'blue',
      link: '/sacraments'
    }
  ];

  const sacramentBreakdown = [
    { name: 'Baptisms', value: sacramentStats?.baptisms || 0, icon: <IoWater />, color: '#4169E1' },
    { name: 'Communions', value: sacramentStats?.communions || 0, icon: <IoWine />, color: '#D4AF37' },
    { name: 'Confirmations', value: sacramentStats?.confirmations || 0, icon: <IoHeart />, color: '#8B0000' },
    { name: 'Marriages', value: sacramentStats?.marriages || 0, icon: <IoHeart />, color: '#6A0DAD' }
  ];

  const activityColumns = [
    { key: 'description', title: 'Activity' },
    { key: 'user', title: 'User' },
    { key: 'time', title: 'Time', width: '150px' }
  ];

  const eventColumns = [
    { key: 'title', title: 'Event' },
    { key: 'date', title: 'Date', width: '120px' },
    { key: 'location', title: 'Location', width: '150px' }
  ];

  if (statsLoading) {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
        <div className="stats-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="stat-card-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p className="error-text">Error loading dashboard data. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to St. Mary's Parish Management System</p>
      </div>

      {/* Debug info - shows what data we're getting */}
      <div style={{ 
        background: '#f0f0f0', 
        padding: '10px', 
        marginBottom: '20px', 
        borderRadius: '5px',
        fontSize: '12px',
        display: 'none' // Remove this after testing, or change to 'block' to see the debug info
      }}>
        <strong>Debug Info:</strong><br/>
        Baptisms: {sacramentStats.baptisms}<br/>
        Communions: {sacramentStats.communions}<br/>
        Confirmations: {sacramentStats.confirmations}<br/>
        Marriages: {sacramentStats.marriages}<br/>
        Total Sacraments: {sacramentStats.total}
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} onClick={() => window.location.href = card.link} className="stat-card-clickable">
            <StatCard
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
            />
          </div>
        ))}
      </div>

      {/* Sacrament Breakdown Section */}
      <div className="sacrament-breakdown">
        <Card title="Sacrament Statistics">
          <div className="sacrament-stats-grid">
            {sacramentBreakdown.map((sacrament, index) => (
              <div key={index} className="sacrament-stat-item">
                <div className="sacrament-icon" style={{ color: sacrament.color }}>
                  {sacrament.icon}
                </div>
                <div className="sacrament-info">
                  <h4>{sacrament.name}</h4>
                  <p className="sacrament-count">{sacrament.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="charts-grid">
        <DonationChart 
          data={donations || []} 
          type="bar" 
          title="Monthly Donations 2024" 
        />
        <MemberGrowthChart 
          data={growth || []} 
          title="Member Growth" 
        />
      </div>

      <div className="activities-grid">
        <Card title="Recent Activities">
          <Table
            columns={activityColumns}
            data={activities || []}
            emptyMessage="No recent activities"
            striped={false}
          />
        </Card>

        <Card title="Upcoming Events">
          <Table
            columns={eventColumns}
            data={events || []}
            emptyMessage="No upcoming events"
            striped={false}
          />
        </Card>
      </div>

      <div className="quick-links">
        <Card title="Quick Actions" className="quick-actions-card">
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => window.location.href = '/members/add'}>
              <IoPersonAdd /> Add Member
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/families/add'}>
              <IoBusiness /> Add Family
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/donations/add'}>
              <IoWallet /> Record Donation
            </button>
            <button className="quick-action-btn" onClick={() => window.location.href = '/sacraments/add'}>
              <IoCalendar /> Record Sacrament
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;