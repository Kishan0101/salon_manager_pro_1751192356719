import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function CustomersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const customers = [
    { 
      id: 1, 
      name: 'Priya Sharma', 
      phone: '+91 98765 43210', 
      email: 'priya.s@example.com',
      lastVisit: '2 days ago',
      totalVisits: 8,
      totalSpent: '₹4,850',
      preferredServices: ['Haircut', 'Hair Color', 'Facial'],
      profileImage: null
    },
    { 
      id: 2, 
      name: 'Rahul Verma', 
      phone: '+91 87654 32109', 
      email: 'rahul.v@example.com',
      lastVisit: 'Today',
      totalVisits: 5,
      totalSpent: '₹2,350',
      preferredServices: ['Beard Trim', 'Haircut'],
      profileImage: null
    },
    { 
      id: 3, 
      name: 'Ananya Patel', 
      phone: '+91 76543 21098', 
      email: 'ananya.p@example.com',
      lastVisit: '1 week ago',
      totalVisits: 12,
      totalSpent: '₹8,750',
      preferredServices: ['Facial', 'Manicure', 'Pedicure'],
      profileImage: null
    },
    { 
      id: 4, 
      name: 'Vikram Singh', 
      phone: '+91 65432 10987', 
      email: 'vikram.s@example.com',
      lastVisit: '3 days ago',
      totalVisits: 3,
      totalSpent: '₹1,850',
      preferredServices: ['Hair Color', 'Haircut'],
      profileImage: null
    },
    { 
      id: 5, 
      name: 'Neha Gupta', 
      phone: '+91 54321 09876', 
      email: 'neha.g@example.com',
      lastVisit: '2 weeks ago',
      totalVisits: 7,
      totalSpent: '₹5,200',
      preferredServices: ['Manicure', 'Pedicure', 'Facial'],
      profileImage: null
    },
  ];

  const filteredCustomers = searchQuery
    ? customers.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : customers;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity style={styles.customerCard}>
      <View style={styles.customerHeader}>
        <View style={styles.avatarContainer}>
          {item.profileImage ? (
            <Image source={{ uri: item.profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>{getInitials(item.name)}</Text>
            </View>
          )}
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.customerContact}>{item.phone}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#6A5AE0" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.customerDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Last Visit</Text>
          <Text style={styles.detailValue}>{item.lastVisit}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Visits</Text>
          <Text style={styles.detailValue}>{item.totalVisits}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Spent</Text>
          <Text style={styles.detailValue}>{item.totalSpent}</Text>
        </View>
      </View>
      
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesLabel}>Preferred Services:</Text>
        <View style={styles.serviceTagsContainer}>
          {item.preferredServices.map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>{service}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.customerActions}>
        <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
          <Ionicons name="call" size={18} color="#6A5AE0" />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.messageButton]}>
          <Ionicons name="chatbubble" size={18} color="#6A5AE0" />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.appointmentButton]}>
          <Ionicons name="calendar" size={18} color="#6A5AE0" />
          <Text style={styles.actionText}>Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customers</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Customer List */}
      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomerItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No customers found</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  customerCard: {
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
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6A5AE020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A5AE0',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  customerContact: {
    fontSize: 14,
    color: '#666',
  },
  moreButton: {
    padding: 5,
  },
  customerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  servicesContainer: {
    marginBottom: 15,
  },
  servicesLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  serviceTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    backgroundColor: '#E8EAFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceTagText: {
    fontSize: 12,
    color: '#6A5AE0',
  },
  customerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#6A5AE0',
    marginLeft: 5,
  },
  callButton: {
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
  },
  messageButton: {
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
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