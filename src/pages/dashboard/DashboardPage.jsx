import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../../api/dashboard';
import StatCard from '../../components/dashboard/StatCard/StatCard';
import DonationChart from '../../components/dashboard/DonationChart/DonationChart';
import MemberGrowthChart from '../../components/dashboard/MemberGrowthChart/MemberGrowthChart';
import Card from '../../components/common/Card/Card';
import Table from '../../components/common/Table/Table';
import { IoPeople, IoWallet, IoCalendar, IoBusiness } from 'react-icons/io5';
import './DashboardPage.css';

const DashboardPage = () => {
  const [donationData, setDonationData] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardAPI.getDashboardStats
  });

  const { data: donations } = useQuery({
    queryKey: ['monthly-donations'],
    queryFn: () => dashboardAPI.getMonthlyDonations(2024, 3)
  });

  const { data: growth } = useQuery({
    queryKey: ['member-growth'],
    queryFn: () => dashboardAPI.getMemberGrowth('monthly')
  });

  const { data: activities } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: () => dashboardAPI.getRecentActivities(5)
  });

  const { data: events } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: () => dashboardAPI.getUpcomingEvents(5)
  });

  useEffect(() => {
    if (donations?.data) {
      setDonationData(donations.data);
    }
    if (growth?.data) {
      setGrowthData(growth.data);
    }
    if (activities?.data) {
      setRecentActivities(activities.data);
    }
    if (events?.data) {
      setUpcomingEvents(events.data);
    }
  }, [donations, growth, activities, events]);

  const statCards = [
    {
      title: 'Total Families',
      value: stats?.data?.totalFamilies || 0,
      icon: <IoPeople />,
      trend: { positive: true, value: 12 },
      color: 'gold'
    },
    {
      title: 'Total Members',
      value: stats?.data?.totalMembers || 0,
      icon: <IoPeople />,
      trend: { positive: true, value: 8 },
      color: 'crimson'
    },
    {
      title: 'Total Donations',
      value: `$${stats?.data?.totalDonations?.toLocaleString() || 0}`,
      icon: <IoWallet />,
      trend: { positive: true, value: 15 },
      color: 'purple'
    },
    {
      title: 'Sacraments This Year',
      value: stats?.data?.sacramentsThisYear || 0,
      icon: <IoCalendar />,
      trend: { positive: true, value: 5 },
      color: 'blue'
    }
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

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to St. Mary's Parish Management System</p>
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            color={card.color}
          />
        ))}
      </div>

      <div className="charts-grid">
        <DonationChart 
          data={donationData} 
          type="bar" 
          title="Monthly Donations 2024" 
        />
        <MemberGrowthChart 
          data={growthData} 
          title="Member Growth" 
        />
      </div>

      <div className="activities-grid">
        <Card title="Recent Activities">
          <Table
            columns={activityColumns}
            data={recentActivities}
            emptyMessage="No recent activities"
            striped={false}
          />
        </Card>

        <Card title="Upcoming Events">
          <Table
            columns={eventColumns}
            data={upcomingEvents}
            emptyMessage="No upcoming events"
            striped={false}
          />
        </Card>
      </div>

      <div className="quick-links">
        <Card title="Quick Actions" className="quick-actions-card">
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => window.location.href = '/members/add'}>
              <IoPeople /> Add Member
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