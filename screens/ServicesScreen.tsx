import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ServicesScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'hair', name: 'Hair' },
    { id: 'face', name: 'Face' },
    { id: 'nails', name: 'Nails' },
    { id: 'spa', name: 'Spa' },
    { id: 'packages', name: 'Packages' },
  ];
  
  const services = [
    { 
      id: 1, 
      name: 'Haircut & Styling', 
      category: 'hair',
      price: '₹450',
      duration: '45 min',
      description: 'Professional haircut and styling by our expert stylists.',
      image: null,
      popular: true,
    },
    { 
      id: 2, 
      name: 'Hair Color', 
      category: 'hair',
      price: '₹1,200',
      duration: '90 min',
      description: 'Full hair coloring with premium products.',
      image: null,
      popular: false,
    },
    { 
      id: 3, 
      name: 'Beard Trim', 
      category: 'hair',
      price: '₹250',
      duration: '20 min',
      description: 'Precise beard trimming and shaping.',
      image: null,
      popular: true,
    },
    { 
      id: 4, 
      name: 'Facial', 
      category: 'face',
      price: '₹850',
      duration: '60 min',
      description: 'Deep cleansing facial with premium products.',
      image: null,
      popular: true,
    },
    { 
      id: 5, 
      name: 'Manicure', 
      category: 'nails',
      price: '₹350',
      duration: '30 min',
      description: 'Professional nail care for your hands.',
      image: null,
      popular: false,
    },
    { 
      id: 6, 
      name: 'Pedicure', 
      category: 'nails',
      price: '₹450',
      duration: '45 min',
      description: 'Complete foot care treatment.',
      image: null,
      popular: false,
    },
    { 
      id: 7, 
      name: 'Full Body Massage', 
      category: 'spa',
      price: '₹1,500',
      duration: '75 min',
      description: 'Relaxing full body massage to relieve stress and tension.',
      image: null,
      popular: true,
    },
    { 
      id: 8, 
      name: 'Bridal Package', 
      category: 'packages',
      price: '₹8,000',
      duration: '180 min',
      description: 'Complete bridal makeup, hair styling, and more.',
      image: null,
      popular: false,
    },
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.categoryTab, activeCategory === item.id && styles.activeCategoryTab]} 
      onPress={() => setActiveCategory(item.id)}
    >
      <Text 
        style={[styles.categoryText, activeCategory === item.id && styles.activeCategoryText]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <View style={styles.serviceImageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.serviceImage} />
        ) : (
          <View style={styles.servicePlaceholder}>
            <Ionicons name={getCategoryIcon(item.category)} size={30} color="#6A5AE0" />
          </View>
        )}
        {item.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
      </View>
      
      <View style={styles.serviceContent}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.servicePrice}>{item.price}</Text>
        </View>
        
        <Text style={styles.serviceDescription}>{item.description}</Text>
        
        <View style={styles.serviceFooter}>
          <View style={styles.serviceDuration}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
          
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'hair': return 'cut-outline';
      case 'face': return 'happy-outline';
      case 'nails': return 'hand-left-outline';
      case 'spa': return 'water-outline';
      case 'packages': return 'gift-outline';
      default: return 'pricetag-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
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

      {/* Categories */}
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      {/* Services List */}
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.servicesContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cut-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No services found</Text>
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
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E8EAFF',
    marginRight: 10,
  },
  activeCategoryTab: {
    backgroundColor: '#6A5AE0',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeCategoryText: {
    color: 'white',
  },
  servicesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },
  serviceImageContainer: {
    height: 120,
    backgroundColor: '#E8EAFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  servicePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF8A65',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  serviceContent: {
    padding: 15,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A5AE0',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  bookButton: {
    backgroundColor: '#6A5AE0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
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