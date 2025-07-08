import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data
  const appointments = {
    upcoming: [
      { id: 1, customer: 'Priya Sharma', service: 'Haircut & Styling', time: '10:30 AM', date: 'Today', status: 'confirmed' },
      { id: 2, customer: 'Rahul Verma', service: 'Beard Trim', time: '11:45 AM', date: 'Today', status: 'confirmed' },
      { id: 3, customer: 'Ananya Patel', service: 'Full Facial', time: '2:15 PM', date: 'Today', status: 'pending' },
      { id: 4, customer: 'Vikram Singh', service: 'Hair Color', time: '4:00 PM', date: 'Tomorrow', status: 'confirmed' },
      { id: 5, customer: 'Neha Gupta', service: 'Manicure', time: '11:00 AM', date: 'Tomorrow', status: 'pending' },
    ],
    past: [
      { id: 6, customer: 'Arjun Kumar', service: 'Haircut', time: '3:30 PM', date: 'Yesterday', status: 'completed' },
      { id: 7, customer: 'Meera Reddy', service: 'Spa Treatment', time: '1:15 PM', date: 'Yesterday', status: 'completed' },
      { id: 8, customer: 'Raj Malhotra', service: 'Beard Trim', time: '11:00 AM', date: '28 Jun', status: 'completed' },
      { id: 9, customer: 'Sonia Verma', service: 'Hair Styling', time: '4:45 PM', date: '27 Jun', status: 'no-show' },
    ],
    cancelled: [
      { id: 10, customer: 'Karan Khanna', service: 'Full Body Massage', time: '2:00 PM', date: 'Yesterday', status: 'cancelled' },
      { id: 11, customer: 'Pooja Sharma', service: 'Pedicure', time: '10:30 AM', date: '28 Jun', status: 'cancelled' },
    ]
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'completed': return '#2196F3';
      case 'cancelled': return '#F44336';
      case 'no-show': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      case 'no-show': return 'No Show';
      default: return status;
    }
  };

  const renderAppointmentItem = ({ item }) => (
    <TouchableOpacity style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.appointmentTime}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.customerInfo}>
          <Ionicons name="person" size={16} color="#666" />
          <Text style={styles.customerName}>{item.customer}</Text>
        </View>
        <View style={styles.serviceInfo}>
          <Ionicons name="cut" size={16} color="#666" />
          <Text style={styles.serviceText}>{item.service}</Text>
        </View>
      </View>
      
      <View style={styles.appointmentActions}>
        <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
          <Ionicons name="call" size={18} color="#6A5AE0" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.messageButton]}>
          <Ionicons name="chatbubble" size={18} color="#6A5AE0" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.moreButton]}>
          <Ionicons name="ellipsis-horizontal" size={18} color="#6A5AE0" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]} 
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]} 
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]} 
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      {/* Appointment List */}
      <FlatList
        data={appointments[activeTab]}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No appointments found</Text>
          </View>
        }
      />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#6A5AE0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#E8EAFF',
  },
  activeTab: {
    backgroundColor: '#6A5AE0',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentDetails: {
    marginBottom: 15,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  callButton: {
    backgroundColor: '#6A5AE020',
  },
  messageButton: {
    backgroundColor: '#6A5AE020',
  },
  moreButton: {
    backgroundColor: '#6A5AE020',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});