import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  // Mock data
  const upcomingAppointments = [
    { id: 1, customer: 'Priya Sharma', service: 'Haircut & Styling', time: '10:30 AM', date: 'Today' },
    { id: 2, customer: 'Rahul Verma', service: 'Beard Trim', time: '11:45 AM', date: 'Today' },
    { id: 3, customer: 'Ananya Patel', service: 'Full Facial', time: '2:15 PM', date: 'Today' },
  ];

  const stats = [
    { title: 'Appointments', value: '24', icon: 'calendar', color: '#6A5AE0' },
    { title: 'Customers', value: '156', icon: 'people', color: '#FF8A65' },
    { title: 'Revenue', value: '₹12,450', icon: 'cash', color: '#4CAF50' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Salon Manager</Text>
            <Text style={styles.date}>June 29, 2025</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#6A5AE0" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <LinearGradient
              key={index}
              colors={['#ffffff', '#f8f9ff']}
              style={styles.statCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${stat.color}20` }]}>
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#6A5AE020' }]}>
                <Ionicons name="add-circle" size={24} color="#6A5AE0" />
              </View>
              <Text style={styles.actionText}>New Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#FF8A6520' }]}>
                <Ionicons name="person-add" size={24} color="#FF8A65" />
              </View>
              <Text style={styles.actionText}>Add Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#4CAF5020' }]}>
                <Ionicons name="cash" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.actionText}>New Payment</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Appointments */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentTime}>
                <Text style={styles.timeText}>{appointment.time}</Text>
                <Text style={styles.dateText}>{appointment.date}</Text>
              </View>
              <View style={styles.appointmentDetails}>
                <Text style={styles.customerName}>{appointment.customer}</Text>
                <Text style={styles.serviceText}>{appointment.service}</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-vertical" size={20} color="#6A5AE0" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Performance Chart */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Monthly Performance</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Revenue Chart</Text>
            {/* In a real app, you would use a charting library here */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  profileButton: {
    padding: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: '31%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6A5AE0',
    fontWeight: '600',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: '31%',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  appointmentTime: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
    paddingRight: 10,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6A5AE0',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  appointmentDetails: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  serviceText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  moreButton: {
    padding: 5,
    justifyContent: 'center',
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  chartText: {
    fontSize: 16,
    color: '#999',
  },
});