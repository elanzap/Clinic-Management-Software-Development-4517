import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useClinic } from '../context/ClinicContext';
import StatsCard from '../components/StatsCard';
import RecentAppointments from '../components/RecentAppointments';
import PatientChart from '../components/PatientChart';

const { FiUsers, FiCalendar, FiDollarSign, FiTrendingUp } = FiIcons;

function Dashboard() {
  const { state } = useClinic();
  
  const todayAppointments = state.appointments.filter(
    apt => apt.date === new Date().toISOString().split('T')[0]
  ).length;
  
  const pendingBills = state.bills.filter(bill => bill.status === 'Pending').length;
  const totalRevenue = state.bills.reduce((sum, bill) => sum + bill.amount, 0);

  const stats = [
    {
      title: 'Total Patients',
      value: state.patients.length,
      icon: FiUsers,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Today\'s Appointments',
      value: todayAppointments,
      icon: FiCalendar,
      color: 'green',
      change: '+5%'
    },
    {
      title: 'Pending Bills',
      value: pendingBills,
      icon: FiDollarSign,
      color: 'yellow',
      change: '-8%'
    },
    {
      title: 'Monthly Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: FiTrendingUp,
      color: 'purple',
      change: '+23%'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Dr. Smith</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <PatientChart />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <RecentAppointments appointments={state.appointments.slice(0, 5)} />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;