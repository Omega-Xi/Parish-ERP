const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database
// Mock database with historical data
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
    },
    {
      id: 4,
      email: "treasurer@parish.com",
      password: "treasurer123",
      name: "Michael Brown",
      role: "treasurer"
    }
  ],
  
  // Families with historical data (created over time)
  families: [
    { id: 1, familyId: "F001", familyName: "Smith Family", address: "123 Main St", ward: "Ward 1", phone: "+1 (555) 123-4567", email: "smith@example.com", status: "active", memberCount: 4, createdAt: "2024-01-15" },
    { id: 2, familyId: "F002", familyName: "Johnson Family", address: "456 Oak Ave", ward: "Ward 2", phone: "+1 (555) 234-5678", email: "johnson@example.com", status: "active", memberCount: 3, createdAt: "2024-01-20" },
    { id: 3, familyId: "F003", familyName: "Williams Family", address: "789 Pine St", ward: "Ward 1", phone: "+1 (555) 345-6789", email: "williams@example.com", status: "active", memberCount: 5, createdAt: "2024-02-01" },
    { id: 4, familyId: "F004", familyName: "Brown Family", address: "321 Elm St", ward: "Ward 3", phone: "+1 (555) 456-7890", email: "brown@example.com", status: "active", memberCount: 2, createdAt: "2024-02-10" },
    { id: 5, familyId: "F005", familyName: "Davis Family", address: "654 Maple Ave", ward: "Ward 2", phone: "+1 (555) 567-8901", email: "davis@example.com", status: "active", memberCount: 4, createdAt: "2024-02-15" },
    { id: 6, familyId: "F006", familyName: "Miller Family", address: "987 Cedar St", ward: "Ward 1", phone: "+1 (555) 678-9012", email: "miller@example.com", status: "active", memberCount: 3, createdAt: "2024-03-01" },
    { id: 7, familyId: "F007", familyName: "Wilson Family", address: "147 Birch Ave", ward: "Ward 3", phone: "+1 (555) 789-0123", email: "wilson@example.com", status: "active", memberCount: 4, createdAt: "2024-03-10" },
    { id: 8, familyId: "F008", familyName: "Moore Family", address: "258 Spruce St", ward: "Ward 2", phone: "+1 (555) 890-1234", email: "moore@example.com", status: "active", memberCount: 2, createdAt: "2024-03-15" },
    { id: 9, familyId: "F009", familyName: "Taylor Family", address: "369 Walnut Ave", ward: "Ward 1", phone: "+1 (555) 901-2345", email: "taylor@example.com", status: "active", memberCount: 3, createdAt: "2024-03-20" },
    { id: 10, familyId: "F010", familyName: "Anderson Family", address: "741 Cherry Ln", ward: "Ward 3", phone: "+1 (555) 012-3456", email: "anderson@example.com", status: "active", memberCount: 4, createdAt: "2024-03-25" }
  ],
  
  // Members with varied ages and family associations
  members: [
    { id: 1, memberId: "M001", name: "John Smith", familyId: 1, familyName: "Smith Family", dateOfBirth: "1985-03-15", gender: "male", phone: "+1 (555) 123-4567", email: "john.smith@example.com", status: "active", age: 39, joinedDate: "2024-01-15" },
    { id: 2, memberId: "M002", name: "Mary Smith", familyId: 1, familyName: "Smith Family", dateOfBirth: "1987-07-22", gender: "female", phone: "+1 (555) 123-4567", email: "mary.smith@example.com", status: "active", age: 37, joinedDate: "2024-01-15" },
    { id: 3, memberId: "M003", name: "James Johnson", familyId: 2, familyName: "Johnson Family", dateOfBirth: "1990-11-10", gender: "male", phone: "+1 (555) 234-5678", email: "james.johnson@example.com", status: "active", age: 34, joinedDate: "2024-01-20" },
    { id: 4, memberId: "M004", name: "Sarah Williams", familyId: 3, familyName: "Williams Family", dateOfBirth: "1992-05-20", gender: "female", phone: "+1 (555) 345-6789", email: "sarah.williams@example.com", status: "active", age: 32, joinedDate: "2024-02-01" },
    { id: 5, memberId: "M005", name: "Robert Brown", familyId: 4, familyName: "Brown Family", dateOfBirth: "1978-12-03", gender: "male", phone: "+1 (555) 456-7890", email: "robert.brown@example.com", status: "active", age: 46, joinedDate: "2024-02-10" },
    { id: 6, memberId: "M006", name: "Lisa Davis", familyId: 5, familyName: "Davis Family", dateOfBirth: "1983-09-18", gender: "female", phone: "+1 (555) 567-8901", email: "lisa.davis@example.com", status: "active", age: 41, joinedDate: "2024-02-15" },
    { id: 7, memberId: "M007", name: "Michael Miller", familyId: 6, familyName: "Miller Family", dateOfBirth: "1995-02-28", gender: "male", phone: "+1 (555) 678-9012", email: "michael.miller@example.com", status: "active", age: 29, joinedDate: "2024-03-01" },
    { id: 8, memberId: "M008", name: "Patricia Wilson", familyId: 7, familyName: "Wilson Family", dateOfBirth: "1980-06-14", gender: "female", phone: "+1 (555) 789-0123", email: "patricia.wilson@example.com", status: "active", age: 44, joinedDate: "2024-03-10" },
    { id: 9, memberId: "M009", name: "Thomas Moore", familyId: 8, familyName: "Moore Family", dateOfBirth: "1975-10-22", gender: "male", phone: "+1 (555) 890-1234", email: "thomas.moore@example.com", status: "active", age: 49, joinedDate: "2024-03-15" },
    { id: 10, memberId: "M010", name: "Jennifer Taylor", familyId: 9, familyName: "Taylor Family", dateOfBirth: "1988-04-05", gender: "female", phone: "+1 (555) 901-2345", email: "jennifer.taylor@example.com", status: "active", age: 36, joinedDate: "2024-03-20" },
    { id: 11, memberId: "M011", name: "David Anderson", familyId: 10, familyName: "Anderson Family", dateOfBirth: "1993-08-12", gender: "male", phone: "+1 (555) 012-3456", email: "david.anderson@example.com", status: "active", age: 31, joinedDate: "2024-03-25" }
  ],
  
  // Rich sacrament data spanning multiple years
  sacraments: [
    // Baptisms (2023-2024)
    { id: 1, memberId: 1, memberName: "John Smith", sacramentType: "baptism", date: "1985-04-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-1985-001", year: 1985 },
    { id: 2, memberId: 2, memberName: "Mary Smith", sacramentType: "baptism", date: "1987-08-10", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-1987-002", year: 1987 },
    { id: 3, memberId: 3, memberName: "James Johnson", sacramentType: "baptism", date: "1990-12-25", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-1990-003", year: 1990 },
    { id: 4, memberId: 4, memberName: "Sarah Williams", sacramentType: "baptism", date: "1992-05-20", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "BAP-1992-004", year: 1992 },
    { id: 5, memberId: 5, memberName: "Robert Brown", sacramentType: "baptism", date: "1978-12-03", priest: "Rev. Fr. John", church: "St. Mary's Church", certificateNumber: "BAP-1978-005", year: 1978 },
    { id: 6, memberId: 6, memberName: "Lisa Davis", sacramentType: "baptism", date: "1983-09-18", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-1983-006", year: 1983 },
    { id: 7, memberId: 7, memberName: "Michael Miller", sacramentType: "baptism", date: "1995-02-28", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "BAP-1995-007", year: 1995 },
    { id: 8, memberId: 8, memberName: "Patricia Wilson", sacramentType: "baptism", date: "1980-06-14", priest: "Rev. Fr. John", church: "St. Mary's Church", certificateNumber: "BAP-1980-008", year: 1980 },
    
    // First Communions
    { id: 9, memberId: 2, memberName: "Mary Smith", sacramentType: "communion", date: "1995-05-20", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "COM-1995-001", year: 1995 },
    { id: 10, memberId: 3, memberName: "James Johnson", sacramentType: "communion", date: "1998-04-10", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "COM-1998-002", year: 1998 },
    { id: 11, memberId: 4, memberName: "Sarah Williams", sacramentType: "communion", date: "2000-06-15", priest: "Rev. Fr. John", church: "St. Mary's Church", certificateNumber: "COM-2000-003", year: 2000 },
    { id: 12, memberId: 7, memberName: "Michael Miller", sacramentType: "communion", date: "2002-03-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "COM-2002-004", year: 2002 },
    
    // Confirmations
    { id: 13, memberId: 1, memberName: "John Smith", sacramentType: "confirmation", date: "1995-05-15", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "CON-1995-001", year: 1995 },
    { id: 14, memberId: 2, memberName: "Mary Smith", sacramentType: "confirmation", date: "2000-06-15", priest: "Rev. Fr. John", church: "St. Mary's Church", certificateNumber: "CON-2000-002", year: 2000 },
    { id: 15, memberId: 3, memberName: "James Johnson", sacramentType: "confirmation", date: "2005-04-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "CON-2005-003", year: 2005 },
    { id: 16, memberId: 4, memberName: "Sarah Williams", sacramentType: "confirmation", date: "2008-09-10", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "CON-2008-004", year: 2008 },
    
    // Marriages
    { id: 17, memberId: 1, memberName: "John Smith", sacramentType: "marriage", date: "2010-08-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "MAR-2010-001", year: 2010, spouseName: "Mary Smith" },
    { id: 18, memberId: 5, memberName: "Robert Brown", sacramentType: "marriage", date: "2005-06-10", priest: "Rev. Fr. John", church: "St. Mary's Church", certificateNumber: "MAR-2005-002", year: 2005, spouseName: "Sarah Brown" }
  ],
  
  // Monthly donation data for 2024 showing growth
  donations: [
    // January 2024
    { id: 1, memberId: 1, memberName: "John Smith", amount: 500, type: "tithe", date: "2024-01-05", paymentMethod: "cash", receiptNumber: "RCP-2024-001", month: 1, year: 2024 },
    { id: 2, memberId: 2, memberName: "Mary Smith", amount: 300, type: "offertory", date: "2024-01-12", paymentMethod: "online", receiptNumber: "RCP-2024-002", month: 1, year: 2024 },
    { id: 3, memberId: 3, memberName: "James Johnson", amount: 200, type: "tithe", date: "2024-01-19", paymentMethod: "cash", receiptNumber: "RCP-2024-003", month: 1, year: 2024 },
    { id: 4, memberId: 4, memberName: "Sarah Williams", amount: 150, type: "offertory", date: "2024-01-26", paymentMethod: "check", receiptNumber: "RCP-2024-004", month: 1, year: 2024 },
    
    // February 2024
    { id: 5, memberId: 1, memberName: "John Smith", amount: 550, type: "tithe", date: "2024-02-04", paymentMethod: "cash", receiptNumber: "RCP-2024-005", month: 2, year: 2024 },
    { id: 6, memberId: 2, memberName: "Mary Smith", amount: 320, type: "offertory", date: "2024-02-11", paymentMethod: "online", receiptNumber: "RCP-2024-006", month: 2, year: 2024 },
    { id: 7, memberId: 3, memberName: "James Johnson", amount: 220, type: "tithe", date: "2024-02-18", paymentMethod: "cash", receiptNumber: "RCP-2024-007", month: 2, year: 2024 },
    { id: 8, memberId: 5, memberName: "Robert Brown", amount: 1000, type: "building", date: "2024-02-20", paymentMethod: "check", receiptNumber: "RCP-2024-008", month: 2, year: 2024 },
    { id: 9, memberId: 4, memberName: "Sarah Williams", amount: 180, type: "offertory", date: "2024-02-25", paymentMethod: "cash", receiptNumber: "RCP-2024-009", month: 2, year: 2024 },
    
    // March 2024
    { id: 10, memberId: 1, memberName: "John Smith", amount: 600, type: "tithe", date: "2024-03-03", paymentMethod: "cash", receiptNumber: "RCP-2024-010", month: 3, year: 2024 },
    { id: 11, memberId: 2, memberName: "Mary Smith", amount: 350, type: "offertory", date: "2024-03-10", paymentMethod: "online", receiptNumber: "RCP-2024-011", month: 3, year: 2024 },
    { id: 12, memberId: 3, memberName: "James Johnson", amount: 250, type: "tithe", date: "2024-03-17", paymentMethod: "cash", receiptNumber: "RCP-2024-012", month: 3, year: 2024 },
    { id: 13, memberId: 6, memberName: "Lisa Davis", amount: 400, type: "tithe", date: "2024-03-19", paymentMethod: "online", receiptNumber: "RCP-2024-013", month: 3, year: 2024 },
    { id: 14, memberId: 4, memberName: "Sarah Williams", amount: 200, type: "offertory", date: "2024-03-24", paymentMethod: "cash", receiptNumber: "RCP-2024-014", month: 3, year: 2024 },
    { id: 15, memberId: 7, memberName: "Michael Miller", amount: 300, type: "tithe", date: "2024-03-26", paymentMethod: "cash", receiptNumber: "RCP-2024-015", month: 3, year: 2024 },
    
    // April 2024
    { id: 16, memberId: 1, memberName: "John Smith", amount: 620, type: "tithe", date: "2024-04-07", paymentMethod: "cash", receiptNumber: "RCP-2024-016", month: 4, year: 2024 },
    { id: 17, memberId: 2, memberName: "Mary Smith", amount: 380, type: "offertory", date: "2024-04-14", paymentMethod: "online", receiptNumber: "RCP-2024-017", month: 4, year: 2024 },
    { id: 18, memberId: 3, memberName: "James Johnson", amount: 280, type: "tithe", date: "2024-04-21", paymentMethod: "cash", receiptNumber: "RCP-2024-018", month: 4, year: 2024 },
    { id: 19, memberId: 8, memberName: "Patricia Wilson", amount: 500, type: "building", date: "2024-04-23", paymentMethod: "check", receiptNumber: "RCP-2024-019", month: 4, year: 2024 }
  ],
  
  // Dashboard with aggregated data
  dashboard: {
    totalFamilies: 10,
    totalMembers: 11,
    totalDonations: 6420,
    sacramentsThisYear: 0,
    recentActivities: [
      { id: 1, description: "New family registered: Anderson Family", user: "Admin", time: "2 hours ago" },
      { id: 2, description: "Donation received: $300 from Michael Miller", user: "Treasurer", time: "5 hours ago" },
      { id: 3, description: "New member added: David Anderson", user: "Secretary", time: "1 day ago" },
      { id: 4, description: "Marriage recorded: Robert and Sarah Brown", user: "Priest", time: "2 days ago" },
      { id: 5, description: "First Communion for Michael Miller", user: "Priest", time: "3 days ago" },
      { id: 6, description: "Donation received: $500 from Patricia Wilson", user: "Treasurer", time: "5 days ago" }
    ],
    upcomingEvents: [
      { id: 1, title: "Sunday Mass", date: "2024-03-24", location: "Main Church", time: "10:00 AM" },
      { id: 2, title: "Bible Study", date: "2024-03-25", location: "Parish Hall", time: "7:00 PM" },
      { id: 3, title: "Youth Group Meeting", date: "2024-03-26", location: "Youth Center", time: "6:30 PM" },
      { id: 4, title: "Choir Practice", date: "2024-03-27", location: "Church", time: "7:00 PM" },
      { id: 5, title: "Easter Vigil Mass", date: "2024-03-30", location: "Main Church", time: "8:00 PM" }
    ],
    monthlyStats: {
      families: { jan: 2, feb: 3, mar: 5, apr: 10 },
      members: { jan: 3, feb: 4, mar: 6, apr: 11 },
      donations: { jan: 1150, feb: 2270, mar: 2100, apr: 1780 }
    }
  },
  
  // Reports with month-by-month data showing growth
  reports: {
    monthlyDonations: [
      { name: "Jan", value: 1150 },
      { name: "Feb", value: 2270 },
      { name: "Mar", value: 2100 },
      { name: "Apr", value: 1780 },
      { name: "May", value: 0 },
      { name: "Jun", value: 0 }
    ],
    memberGrowth: [
      { period: "Jan", members: 3, newMembers: 3, families: 2 },
      { period: "Feb", members: 4, newMembers: 1, families: 3 },
      { period: "Mar", members: 7, newMembers: 3, families: 5 },
      { period: "Apr", members: 11, newMembers: 4, families: 10 },
      { period: "May", members: 11, newMembers: 0, families: 10 },
      { period: "Jun", members: 11, newMembers: 0, families: 10 }
    ],
    familyGrowth: [
      { period: "Jan", families: 2, growth: 0 },
      { period: "Feb", families: 3, growth: 50 },
      { period: "Mar", families: 5, growth: 66 },
      { period: "Apr", families: 10, growth: 100 },
      { period: "May", families: 10, growth: 0 },
      { period: "Jun", families: 10, growth: 0 }
    ],
    donationTypes: [
      { name: "Tithe", value: 3520 },
      { name: "Offertory", value: 1780 },
      { name: "Building", value: 1120 },
      { name: "Charity", value: 0 },
      { name: "Other", value: 0 }
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