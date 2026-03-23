const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database
const db = {
  users: [
    {
      id: 1,
      email: "admin@parish.com",
      password: "password",
      name: "Admin User",
      role: "admin"
    },
    {
      id: 2,
      email: "secretary@parish.com",
      password: "secretary123",
      name: "Mary Johnson",
      role: "secretary"
    },
    {
      id: 3,
      email: "priest@parish.com",
      password: "priest123",
      name: "Rev. Fr. John Doe",
      role: "priest"
    }
  ],
  families: [
    {
      id: 1,
      familyId: "F001",
      familyName: "Smith Family",
      address: "123 Main St, Parish City",
      ward: "Ward 1",
      phone: "+1 (555) 123-4567",
      email: "smith@example.com",
      status: "active",
      memberCount: 4
    },
    {
      id: 2,
      familyId: "F002",
      familyName: "Johnson Family",
      address: "456 Oak Ave, Parish City",
      ward: "Ward 2",
      phone: "+1 (555) 234-5678",
      email: "johnson@example.com",
      status: "active",
      memberCount: 3
    },
    {
      id: 3,
      familyId: "F003",
      familyName: "Williams Family",
      address: "789 Pine St, Parish City",
      ward: "Ward 1",
      phone: "+1 (555) 345-6789",
      email: "williams@example.com",
      status: "active",
      memberCount: 5
    }
  ],
  members: [
    {
      id: 1,
      memberId: "M001",
      name: "John Smith",
      familyId: 1,
      familyName: "Smith Family",
      dateOfBirth: "1985-03-15",
      gender: "male",
      phone: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      status: "active",
      age: 39
    },
    {
      id: 2,
      memberId: "M002",
      name: "Mary Smith",
      familyId: 1,
      familyName: "Smith Family",
      dateOfBirth: "1987-07-22",
      gender: "female",
      phone: "+1 (555) 123-4567",
      email: "mary.smith@example.com",
      status: "active",
      age: 37
    },
    {
      id: 3,
      memberId: "M003",
      name: "James Johnson",
      familyId: 2,
      familyName: "Johnson Family",
      dateOfBirth: "1990-11-10",
      gender: "male",
      phone: "+1 (555) 234-5678",
      email: "james.johnson@example.com",
      status: "active",
      age: 34
    },
    {
      id: 4,
      memberId: "M004",
      name: "Sarah Williams",
      familyId: 3,
      familyName: "Williams Family",
      dateOfBirth: "1992-05-20",
      gender: "female",
      phone: "+1 (555) 345-6789",
      email: "sarah.williams@example.com",
      status: "active",
      age: 32
    }
  ],
  sacraments: [
    {
      id: 1,
      memberId: 1,
      memberName: "John Smith",
      sacramentType: "baptism",
      date: "1985-04-20",
      priest: "Rev. Fr. Thomas",
      church: "St. Mary's Church",
      certificateNumber: "BAP-2024-001"
    },
    {
      id: 2,
      memberId: 1,
      memberName: "John Smith",
      sacramentType: "confirmation",
      date: "1995-05-15",
      priest: "Rev. Fr. Michael",
      church: "St. Mary's Church",
      certificateNumber: "CON-2024-001"
    },
    {
      id: 3,
      memberId: 2,
      memberName: "Mary Smith",
      sacramentType: "baptism",
      date: "1987-08-10",
      priest: "Rev. Fr. Thomas",
      church: "St. Mary's Church",
      certificateNumber: "BAP-2024-002"
    },
    {
      id: 4,
      memberId: 2,
      memberName: "Mary Smith",
      sacramentType: "communion",
      date: "1995-05-20",
      priest: "Rev. Fr. Michael",
      church: "St. Mary's Church",
      certificateNumber: "COM-2024-001"
    },
    {
      id: 5,
      memberId: 2,
      memberName: "Mary Smith",
      sacramentType: "confirmation",
      date: "2000-06-15",
      priest: "Rev. Fr. John",
      church: "St. Mary's Church",
      certificateNumber: "CON-2024-002"
    },
    {
      id: 6,
      memberId: 3,
      memberName: "James Johnson",
      sacramentType: "baptism",
      date: "1990-12-25",
      priest: "Rev. Fr. Thomas",
      church: "St. Mary's Church",
      certificateNumber: "BAP-2024-003"
    },
    {
      id: 7,
      memberId: 3,
      memberName: "James Johnson",
      sacramentType: "communion",
      date: "1998-04-10",
      priest: "Rev. Fr. Michael",
      church: "St. Mary's Church",
      certificateNumber: "COM-2024-002"
    }
  ],
  donations: [
    {
      id: 1,
      memberId: 1,
      memberName: "John Smith",
      amount: 500,
      type: "tithe",
      date: "2024-03-01",
      paymentMethod: "cash",
      receiptNumber: "RCP-2024-001"
    },
    {
      id: 2,
      memberId: 2,
      memberName: "Mary Smith",
      amount: 200,
      type: "offertory",
      date: "2024-03-15",
      paymentMethod: "online",
      receiptNumber: "RCP-2024-002"
    },
    {
      id: 3,
      memberId: 3,
      memberName: "James Johnson",
      amount: 1000,
      type: "building",
      date: "2024-03-10",
      paymentMethod: "check",
      receiptNumber: "RCP-2024-003"
    },
    {
      id: 4,
      memberId: 4,
      memberName: "Sarah Williams",
      amount: 150,
      type: "offertory",
      date: "2024-03-20",
      paymentMethod: "cash",
      receiptNumber: "RCP-2024-004"
    }
  ],
  dashboard: {
    totalFamilies: 3,
    totalMembers: 4,
    totalDonations: 1850,
    sacramentsThisYear: 0,
    recentActivities: [
      {
        id: 1,
        description: "New family registered: Williams Family",
        user: "Admin",
        time: "1 day ago"
      },
      {
        id: 2,
        description: "Donation received: $1000 from James Johnson",
        user: "Treasurer",
        time: "2 days ago"
      },
      {
        id: 3,
        description: "New member added: Sarah Williams",
        user: "Secretary",
        time: "3 days ago"
      },
      {
        id: 4,
        description: "Donation received: $500 from John Smith",
        user: "Treasurer",
        time: "1 week ago"
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: "Sunday Mass",
        date: "2024-03-24",
        location: "Main Church",
        time: "10:00 AM"
      },
      {
        id: 2,
        title: "Bible Study",
        date: "2024-03-25",
        location: "Parish Hall",
        time: "7:00 PM"
      },
      {
        id: 3,
        title: "Youth Group Meeting",
        date: "2024-03-26",
        location: "Youth Center",
        time: "6:30 PM"
      },
      {
        id: 4,
        title: "Choir Practice",
        date: "2024-03-27",
        location: "Church",
        time: "7:00 PM"
      }
    ]
  },
  reports: {
    monthlyDonations: [
      { name: "Jan", value: 1200 },
      { name: "Feb", value: 1500 },
      { name: "Mar", value: 1850 },
      { name: "Apr", value: 1400 },
      { name: "May", value: 1800 },
      { name: "Jun", value: 1600 }
    ],
    memberGrowth: [
      { period: "Jan", members: 45, newMembers: 5 },
      { period: "Feb", members: 48, newMembers: 3 },
      { period: "Mar", members: 52, newMembers: 4 },
      { period: "Apr", members: 55, newMembers: 3 },
      { period: "May", members: 58, newMembers: 3 },
      { period: "Jun", members: 62, newMembers: 4 }
    ]
  },
  parish: {
    id: 1,
    name: "St. Mary's Parish",
    address: "123 Church Street, Parish City",
    phone: "+1 (555) 123-4567",
    email: "parish@stmarys.org",
    priest: "Rev. Fr. John Doe",
    established: "1900",
    description: "St. Mary's Parish is a vibrant Catholic community dedicated to serving God and neighbor. We welcome all to join us in faith, worship, and service."
  }
};

// ============ AUTH ENDPOINTS ============
app.post('/api/auth/login', (req, res) => {
  console.log('📝 Login attempt:', req.body.email);
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    console.log('✅ Login successful:', user.email);
    res.json({
      success: true,
      user: userWithoutPassword,
      accessToken: 'mock-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    });
  } else {
    console.log('❌ Login failed for:', email);
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  console.log('📝 Logout');
  res.json({ success: true });
});

// ============ DASHBOARD ENDPOINTS ============
app.get('/api/dashboard', (req, res) => {
  console.log('📊 Dashboard requested');
  res.json({ data: db.dashboard });
});

app.get('/api/dashboard/recent-activities', (req, res) => {
  res.json({ data: db.dashboard.recentActivities });
});

app.get('/api/dashboard/upcoming-events', (req, res) => {
  res.json({ data: db.dashboard.upcomingEvents });
});

app.get('/api/dashboard/sacrament-stats', (req, res) => {
  console.log('📊 Sacrament stats requested');
  const baptisms = db.sacraments.filter(s => s.sacramentType === 'baptism').length;
  const communions = db.sacraments.filter(s => s.sacramentType === 'communion').length;
  const confirmations = db.sacraments.filter(s => s.sacramentType === 'confirmation').length;
  const marriages = db.sacraments.filter(s => s.sacramentType === 'marriage').length;
  const total = baptisms + communions + confirmations + marriages;
  
  res.json({
    data: {
      baptisms,
      communions,
      confirmations,
      marriages,
      total
    }
  });
});

// ============ FAMILIES ENDPOINTS ============
app.get('/api/families', (req, res) => {
  console.log('👨‍👩‍👧‍👦 Families list requested');
  res.json({ 
    families: db.families, 
    total: db.families.length 
  });
});

app.get('/api/families/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const family = db.families.find(f => f.id === id);
  if (family) {
    res.json(family);
  } else {
    res.status(404).json({ message: 'Family not found' });
  }
});

app.post('/api/families/create', (req, res) => {
  const newFamily = {
    id: db.families.length + 1,
    familyId: `F00${db.families.length + 1}`,
    ...req.body,
    status: 'active',
    memberCount: 0
  };
  db.families.push(newFamily);
  console.log('✅ New family created:', newFamily.familyName);
  res.json(newFamily);
});

app.put('/api/families/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.families.findIndex(f => f.id === id);
  if (index !== -1) {
    db.families[index] = { ...db.families[index], ...req.body };
    console.log('✅ Family updated:', db.families[index].familyName);
    res.json(db.families[index]);
  } else {
    res.status(404).json({ message: 'Family not found' });
  }
});

app.delete('/api/families/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.families.findIndex(f => f.id === id);
  if (index !== -1) {
    const deleted = db.families.splice(index, 1);
    console.log('✅ Family deleted:', deleted[0].familyName);
    res.json({ success: true, message: 'Family deleted successfully' });
  } else {
    res.status(404).json({ message: 'Family not found' });
  }
});

app.get('/api/families/:id/members', (req, res) => {
  const familyId = parseInt(req.params.id);
  const members = db.members.filter(m => m.familyId === familyId);
  res.json(members);
});

// ============ MEMBERS ENDPOINTS ============
app.get('/api/members', (req, res) => {
  console.log('👤 Members list requested');
  res.json({ 
    members: db.members, 
    total: db.members.length 
  });
});

app.get('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const member = db.members.find(m => m.id === id);
  if (member) {
    res.json(member);
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

app.post('/api/members/create', (req, res) => {
  const newMember = {
    id: db.members.length + 1,
    memberId: `M00${db.members.length + 1}`,
    ...req.body,
    status: 'active'
  };
  db.members.push(newMember);
  console.log('✅ New member created:', newMember.name);
  res.json(newMember);
});

app.put('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.members.findIndex(m => m.id === id);
  if (index !== -1) {
    db.members[index] = { ...db.members[index], ...req.body };
    console.log('✅ Member updated:', db.members[index].name);
    res.json(db.members[index]);
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

app.delete('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.members.findIndex(m => m.id === id);
  if (index !== -1) {
    const deleted = db.members.splice(index, 1);
    console.log('✅ Member deleted:', deleted[0].name);
    res.json({ success: true, message: 'Member deleted successfully' });
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

app.get('/api/members/:id/sacraments', (req, res) => {
  const memberId = parseInt(req.params.id);
  const sacraments = db.sacraments.filter(s => s.memberId === memberId);
  res.json(sacraments);
});

app.get('/api/members/:id/donations', (req, res) => {
  const memberId = parseInt(req.params.id);
  const donations = db.donations.filter(d => d.memberId === memberId);
  res.json(donations);
});

app.get('/api/members/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const results = db.members.filter(m => 
    m.name.toLowerCase().includes(query) || 
    m.memberId.toLowerCase().includes(query)
  );
  res.json(results);
});

// ============ SACRAMENTS ENDPOINTS ============
app.get('/api/sacraments/dashboard', (req, res) => {
  const currentYear = new Date().getFullYear();
  const thisYearSacraments = db.sacraments.filter(s => {
    const sacramentYear = new Date(s.date).getFullYear();
    return sacramentYear === currentYear;
  });
  
  res.json({
    data: {
      baptisms: db.sacraments.filter(s => s.sacramentType === 'baptism').length,
      communions: db.sacraments.filter(s => s.sacramentType === 'communion').length,
      confirmations: db.sacraments.filter(s => s.sacramentType === 'confirmation').length,
      marriages: db.sacraments.filter(s => s.sacramentType === 'marriage').length,
      thisYear: {
        baptisms: thisYearSacraments.filter(s => s.sacramentType === 'baptism').length,
        communions: thisYearSacraments.filter(s => s.sacramentType === 'communion').length,
        confirmations: thisYearSacraments.filter(s => s.sacramentType === 'confirmation').length,
        marriages: thisYearSacraments.filter(s => s.sacramentType === 'marriage').length,
        total: thisYearSacraments.length
      }
    }
  });
});

app.get('/api/sacraments/records', (req, res) => {
  console.log('📜 Sacraments records requested');
  res.json({ 
    sacraments: db.sacraments, 
    total: db.sacraments.length 
  });
});

app.get('/api/sacraments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sacrament = db.sacraments.find(s => s.id === id);
  if (sacrament) {
    res.json(sacrament);
  } else {
    res.status(404).json({ message: 'Sacrament record not found' });
  }
});

app.post('/api/sacraments/create', (req, res) => {
  const newSacrament = {
    id: db.sacraments.length + 1,
    ...req.body
  };
  db.sacraments.push(newSacrament);
  console.log('✅ New sacrament recorded:', newSacrament.sacramentType);
  res.json(newSacrament);
});

app.put('/api/sacraments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.sacraments.findIndex(s => s.id === id);
  if (index !== -1) {
    db.sacraments[index] = { ...db.sacraments[index], ...req.body };
    console.log('✅ Sacrament updated:', db.sacraments[index].sacramentType);
    res.json(db.sacraments[index]);
  } else {
    res.status(404).json({ message: 'Sacrament not found' });
  }
});

app.delete('/api/sacraments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.sacraments.findIndex(s => s.id === id);
  if (index !== -1) {
    const deleted = db.sacraments.splice(index, 1);
    console.log('✅ Sacrament deleted:', deleted[0].sacramentType);
    res.json({ success: true, message: 'Sacrament deleted successfully' });
  } else {
    res.status(404).json({ message: 'Sacrament not found' });
  }
});

app.get('/api/sacraments/types', (req, res) => {
  res.json(['baptism', 'communion', 'confirmation', 'marriage']);
});

// ============ DONATIONS ENDPOINTS ============
app.get('/api/donations', (req, res) => {
  console.log('💰 Donations list requested');
  res.json({ 
    donations: db.donations, 
    total: db.donations.length,
    totalAmount: db.donations.reduce((sum, d) => sum + d.amount, 0)
  });
});

app.get('/api/donations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const donation = db.donations.find(d => d.id === id);
  if (donation) {
    res.json(donation);
  } else {
    res.status(404).json({ message: 'Donation not found' });
  }
});

app.post('/api/donations/create', (req, res) => {
  const newDonation = {
    id: db.donations.length + 1,
    ...req.body
  };
  db.donations.push(newDonation);
  console.log('✅ New donation recorded:', newDonation.amount);
  res.json(newDonation);
});

app.put('/api/donations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.donations.findIndex(d => d.id === id);
  if (index !== -1) {
    db.donations[index] = { ...db.donations[index], ...req.body };
    console.log('✅ Donation updated:', db.donations[index].amount);
    res.json(db.donations[index]);
  } else {
    res.status(404).json({ message: 'Donation not found' });
  }
});

app.delete('/api/donations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.donations.findIndex(d => d.id === id);
  if (index !== -1) {
    const deleted = db.donations.splice(index, 1);
    console.log('✅ Donation deleted:', deleted[0].amount);
    res.json({ success: true, message: 'Donation deleted successfully' });
  } else {
    res.status(404).json({ message: 'Donation not found' });
  }
});

app.get('/api/donations/types', (req, res) => {
  res.json(['tithe', 'offertory', 'building', 'charity', 'other']);
});

// ============ REPORTS ENDPOINTS ============
app.get('/api/reports/monthly-donations', (req, res) => {
  res.json({ data: db.reports.monthlyDonations });
});

app.get('/api/reports/member-growth', (req, res) => {
  res.json({ data: db.reports.memberGrowth });
});

app.get('/api/reports/donations/:type', (req, res) => {
  const { type } = req.params;
  const { year } = req.query;
  
  if (type === 'monthly') {
    res.json({ data: db.reports.monthlyDonations });
  } else if (type === 'yearly') {
    res.json({ data: [{ name: year || '2024', value: 18500 }] });
  } else {
    res.json({ data: [] });
  }
});

// ============ PARISH ENDPOINTS ============
app.get('/api/parish', (req, res) => {
  console.log('⛪ Parish details requested');
  res.json({ data: db.parish });
});

app.put('/api/parish/update', (req, res) => {
  db.parish = { ...db.parish, ...req.body };
  console.log('✅ Parish details updated');
  res.json(db.parish);
});

app.get('/api/parish/mass-schedules', (req, res) => {
  res.json({
    data: {
      weekdays: "Monday - Friday: 6:30 AM, 7:30 AM",
      saturday: "7:00 AM, 6:00 PM (Vigil Mass)",
      sunday: "7:00 AM, 9:00 AM, 11:00 AM, 5:00 PM"
    }
  });
});

// ============ CONTACT ENDPOINTS ============
app.post('/api/contact/send', (req, res) => {
  console.log('📧 Contact form submission received:');
  console.log('   From:', req.body.name, `(${req.body.email})`);
  console.log('   Subject:', req.body.subject);
  console.log('   Message:', req.body.message);
  
  res.json({ 
    success: true, 
    message: 'Message received! We will get back to you soon.'
  });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 MOCK BACKEND SERVER IS RUNNING!');
  console.log('='.repeat(60));
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log('\n📋 TEST CREDENTIALS:');
  console.log('   ┌─────────────────────────────────────┐');
  console.log('   │ Email: admin@parish.com            │');
  console.log('   │ Password: password                  │');
  console.log('   ├─────────────────────────────────────┤');
  console.log('   │ Email: secretary@parish.com        │');
  console.log('   │ Password: secretary123              │');
  console.log('   ├─────────────────────────────────────┤');
  console.log('   │ Email: priest@parish.com           │');
  console.log('   │ Password: priest123                 │');
  console.log('   └─────────────────────────────────────┘');
  console.log('\n📊 API ENDPOINTS:');
  console.log('   POST   /api/auth/login');
  console.log('   POST   /api/auth/logout');
  console.log('   GET    /api/dashboard');
  console.log('   GET    /api/dashboard/recent-activities');
  console.log('   GET    /api/dashboard/upcoming-events');
  console.log('   GET    /api/dashboard/sacrament-stats');
  console.log('   GET    /api/families');
  console.log('   POST   /api/families/create');
  console.log('   PUT    /api/families/:id');
  console.log('   DELETE /api/families/:id');
  console.log('   GET    /api/members');
  console.log('   POST   /api/members/create');
  console.log('   PUT    /api/members/:id');
  console.log('   DELETE /api/members/:id');
  console.log('   GET    /api/sacraments/records');
  console.log('   POST   /api/sacraments/create');
  console.log('   GET    /api/donations');
  console.log('   POST   /api/donations/create');
  console.log('   GET    /api/parish');
  console.log('   PUT    /api/parish/update');
  console.log('   POST   /api/contact/send');
  console.log('\n📊 DATA SUMMARY:');
  console.log(`   👨‍👩‍👧‍👦 Families: ${db.families.length}`);
  console.log(`   👤 Members: ${db.members.length}`);
  console.log(`   ✝️ Sacraments: ${db.sacraments.length}`);
  console.log(`   💰 Donations: ${db.donations.length}`);
  console.log('\n✨ Server ready! Press Ctrl+C to stop.\n');
  console.log('='.repeat(60));
});