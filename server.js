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
      address: "123 Main St",
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
      address: "456 Oak Ave",
      ward: "Ward 2",
      phone: "+1 (555) 234-5678",
      email: "johnson@example.com",
      status: "active",
      memberCount: 3
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
    }
  ],
  dashboard: {
    totalFamilies: 2,
    totalMembers: 3,
    totalDonations: 700,
    sacramentsThisYear: 2,
    recentActivities: [
      {
        id: 1,
        description: "New family registered: Smith Family",
        user: "Admin",
        time: "2 hours ago"
      },
      {
        id: 2,
        description: "Donation received: $500 from John Smith",
        user: "Treasurer",
        time: "5 hours ago"
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
      }
    ]
  },
  reports: {
    monthlyDonations: [
      { name: "Jan", value: 1200 },
      { name: "Feb", value: 1500 },
      { name: "Mar", value: 1700 },
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
    description: "St. Mary's Parish is a vibrant Catholic community dedicated to serving God and neighbor."
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
  res.json({
    data: {
      baptisms: db.sacraments.filter(s => s.sacramentType === 'baptism').length,
      communions: db.sacraments.filter(s => s.sacramentType === 'communion').length,
      confirmations: db.sacraments.filter(s => s.sacramentType === 'confirmation').length,
      marriages: db.sacraments.filter(s => s.sacramentType === 'marriage').length
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

app.post('/api/sacraments/create', (req, res) => {
  const newSacrament = {
    id: db.sacraments.length + 1,
    ...req.body
  };
  db.sacraments.push(newSacrament);
  console.log('✅ New sacrament recorded:', newSacrament.sacramentType);
  res.json(newSacrament);
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

app.post('/api/donations/create', (req, res) => {
  const newDonation = {
    id: db.donations.length + 1,
    ...req.body
  };
  db.donations.push(newDonation);
  console.log('✅ New donation recorded:', newDonation.amount);
  res.json(newDonation);
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
    res.json({ data: [{ name: '2024', value: 15000 }] });
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
  console.log('   GET    /api/dashboard');
  console.log('   GET    /api/families');
  console.log('   GET    /api/members');
  console.log('   GET    /api/sacraments/records');
  console.log('   GET    /api/donations');
  console.log('   GET    /api/parish');
  console.log('\n✨ Server ready! Press Ctrl+C to stop.\n');
  console.log('='.repeat(60));
});