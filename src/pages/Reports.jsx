import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { useClinic } from '../context/ClinicContext';

function Reports() {
  const { state } = useClinic();

  // Revenue Chart Data
  const revenueOption = {
    title: {
      text: 'Monthly Revenue',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [1200, 1900, 3000, 5000, 2300, 2200],
      type: 'bar',
      itemStyle: {
        color: '#3B82F6'
      }
    }]
  };

  // Patient Demographics
  const demographicsOption = {
    title: {
      text: 'Patient Demographics',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: 35, name: 'Male' },
        { value: 45, name: 'Female' },
        { value: 20, name: 'Other' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  // Appointment Status Chart
  const appointmentStatusOption = {
    title: {
      text: 'Appointment Status',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'doughnut',
      radius: ['40%', '70%'],
      data: [
        { value: 60, name: 'Completed', itemStyle: { color: '#10B981' } },
        { value: 30, name: 'Scheduled', itemStyle: { color: '#3B82F6' } },
        { value: 10, name: 'Cancelled', itemStyle: { color: '#EF4444' } }
      ]
    }]
  };

  const stats = [
    {
      title: 'Total Patients',
      value: state.patients.length,
      color: 'text-blue-600'
    },
    {
      title: 'Total Appointments',
      value: state.appointments.length,
      color: 'text-green-600'
    },
    {
      title: 'Medical Records',
      value: state.medicalRecords.length,
      color: 'text-purple-600'
    },
    {
      title: 'Total Revenue',
      value: `$${state.bills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}`,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Comprehensive overview of clinic performance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <ReactECharts option={revenueOption} style={{ height: '300px' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <ReactECharts option={demographicsOption} style={{ height: '300px' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <ReactECharts option={appointmentStatusOption} style={{ height: '300px' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Daily Patients</span>
              <span className="font-semibold text-gray-900">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Most Common Diagnosis</span>
              <span className="font-semibold text-gray-900">Hypertension</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Success Rate</span>
              <span className="font-semibold text-green-600">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Consultation Time</span>
              <span className="font-semibold text-gray-900">25 min</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Reports;