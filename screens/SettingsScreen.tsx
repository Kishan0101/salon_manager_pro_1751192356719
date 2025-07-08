import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoBackup, setAutoBackup] = React.useState(true);
  
  const settingsSections = [
    {
      title: 'Business Settings',
      items: [
        { 
          id: 'business-profile', 
          title: 'Business Profile', 
          icon: 'business-outline',
          iconColor: '#6A5AE0',
          type: 'link',
          description: 'Update your salon details and logo'
        },
        { 
          id: 'working-hours', 
          title: 'Working Hours', 
          icon: 'time-outline',
          iconColor: '#FF8A65',
          type: 'link',
          description: 'Set your salon operating hours'
        },
        { 
          id: 'locations', 
          title: 'Locations', 
          icon: 'location-outline',
          iconColor: '#4CAF50',
          type: 'link',
          description: 'Manage multiple salon branches'
        },
        { 
          id: 'staff', 
          title: 'Staff Management', 
          icon: 'people-outline',
          iconColor: '#2196F3',
          type: 'link',
          description: 'Add and manage your salon staff'
        },
      ]
    },
    {
      title: 'App Settings',
      items: [
        { 
          id: 'notifications', 
          title: 'Notifications', 
          icon: 'notifications-outline',
          iconColor: '#FF9800',
          type: 'toggle',
          value: notifications,
          onToggle: () => setNotifications(!notifications),
          description: 'Enable push notifications'
        },
        { 
          id: 'dark-mode', 
          title: 'Dark Mode', 
          icon: 'moon-outline',
          iconColor: '#9C27B0',
          type: 'toggle',
          value: darkMode,
          onToggle: () => setDarkMode(!darkMode),
          description: 'Enable dark theme'
        },
        { 
          id: 'auto-backup', 
          title: 'Auto Backup', 
          icon: 'cloud-upload-outline',
          iconColor: '#03A9F4',
          type: 'toggle',
          value: autoBackup,
          onToggle: () => setAutoBackup(!autoBackup),
          description: 'Automatically backup your data'
        },
      ]
    },
    {
      title: 'Billing & Subscription',
      items: [
        { 
          id: 'subscription', 
          title: 'Subscription Plan', 
          icon: 'card-outline',
          iconColor: '#4CAF50',
          type: 'link',
          description: 'Currently on Basic Plan (₹499/month)',
          badge: 'Basic'
        },
        { 
          id: 'payment-history', 
          title: 'Payment History', 
          icon: 'receipt-outline',
          iconColor: '#607D8B',
          type: 'link',
          description: 'View your payment records'
        },
        { 
          id: 'billing-info', 
          title: 'Billing Information', 
          icon: 'document-text-outline',
          iconColor: '#795548',
          type: 'link',
          description: 'Update your billing details'
        },
      ]
    },
    {
      title: 'Support & Help',
      items: [
        { 
          id: 'help-center', 
          title: 'Help Center', 
          icon: 'help-circle-outline',
          iconColor: '#2196F3',
          type: 'link',
          description: 'Get help with using the app'
        },
        { 
          id: 'contact-support', 
          title: 'Contact Support', 
          icon: 'chatbubble-ellipses-outline',
          iconColor: '#FF5722',
          type: 'link',
          description: 'Reach out to our support team'
        },
        { 
          id: 'feedback', 
          title: 'Send Feedback', 
          icon: 'star-outline',
          iconColor: '#FFC107',
          type: 'link',
          description: 'Help us improve our app'
        },
      ]
    },
  ];

  const renderSettingItem = (item) => {
    return (
      <TouchableOpacity 
        key={item.id} 
        style={styles.settingItem}
        onPress={() => item.type !== 'toggle' && console.log(`Navigate to ${item.id}`)}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}15` }]}>
          <Ionicons name={item.icon} size={22} color={item.iconColor} />
        </View>
        
        <View style={styles.settingContent}>
          <View style={styles.settingHeader}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </View>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
        
        {item.type === 'toggle' ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#E8EAFF', true: '#6A5AE080' }}
            thumbColor={item.value ? '#6A5AE0' : '#f4f3f4'}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#999" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Profile Section */}
      <TouchableOpacity style={styles.profileSection}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitials}>SM</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Salon Manager</Text>
          <Text style={styles.profileEmail}>manager@glamoursalon.com</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      {/* Settings List */}
      <ScrollView style={styles.settingsList} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(item => renderSettingItem(item))}
            </View>
          </View>
        ))}
        
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6A5AE020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileInitials: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A5AE0',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  settingsList: {
    flex: 1,
  },
  settingsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#999',
  },
  badge: {
    backgroundColor: '#6A5AE020',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#6A5AE0',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginVertical: 20,
  },
});