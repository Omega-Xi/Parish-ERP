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
    { id: 1, email: "admin@parish.com", password: "password", name: "Admin User", role: "admin" },
    { id: 2, email: "secretary@parish.com", password: "secretary123", name: "Mary Johnson", role: "secretary" },
    { id: 3, email: "priest@parish.com", password: "priest123", name: "Rev. Fr. John Doe", role: "priest" },
    { id: 4, email: "treasurer@parish.com", password: "treasurer123", name: "Michael Brown", role: "treasurer" }
  ],
  
  // Families 2024-2026
  families: [
    // 2024 Families (Jan-Apr)
    { id: 1, familyId: "F001", familyName: "Smith Family", address: "123 Main St", ward: "Ward 1", phone: "+1 (555) 123-4567", email: "smith@example.com", status: "active", memberCount: 4, createdAt: "2024-01-15" },
    { id: 2, familyId: "F002", familyName: "Johnson Family", address: "456 Oak Ave", ward: "Ward 2", phone: "+1 (555) 234-5678", email: "johnson@example.com", status: "active", memberCount: 3, createdAt: "2024-01-20" },
    { id: 3, familyId: "F003", familyName: "Williams Family", address: "789 Pine St", ward: "Ward 1", phone: "+1 (555) 345-6789", email: "williams@example.com", status: "active", memberCount: 5, createdAt: "2024-02-01" },
    { id: 4, familyId: "F004", familyName: "Brown Family", address: "321 Elm St", ward: "Ward 3", phone: "+1 (555) 456-7890", email: "brown@example.com", status: "active", memberCount: 2, createdAt: "2024-02-10" },
    { id: 5, familyId: "F005", familyName: "Davis Family", address: "654 Maple Ave", ward: "Ward 2", phone: "+1 (555) 567-8901", email: "davis@example.com", status: "active", memberCount: 4, createdAt: "2024-02-15" },
    { id: 6, familyId: "F006", familyName: "Miller Family", address: "987 Cedar St", ward: "Ward 1", phone: "+1 (555) 678-9012", email: "miller@example.com", status: "active", memberCount: 3, createdAt: "2024-03-01" },
    { id: 7, familyId: "F007", familyName: "Wilson Family", address: "147 Birch Ave", ward: "Ward 3", phone: "+1 (555) 789-0123", email: "wilson@example.com", status: "active", memberCount: 4, createdAt: "2024-03-10" },
    { id: 8, familyId: "F008", familyName: "Moore Family", address: "258 Spruce St", ward: "Ward 2", phone: "+1 (555) 890-1234", email: "moore@example.com", status: "active", memberCount: 2, createdAt: "2024-03-15" },
    { id: 9, familyId: "F009", familyName: "Taylor Family", address: "369 Walnut Ave", ward: "Ward 1", phone: "+1 (555) 901-2345", email: "taylor@example.com", status: "active", memberCount: 3, createdAt: "2024-03-20" },
    { id: 10, familyId: "F010", familyName: "Anderson Family", address: "741 Cherry Ln", ward: "Ward 3", phone: "+1 (555) 012-3456", email: "anderson@example.com", status: "active", memberCount: 4, createdAt: "2024-03-25" },
    
    // 2025 Families
    { id: 11, familyId: "F011", familyName: "Martinez Family", address: "852 Oak St", ward: "Ward 2", phone: "+1 (555) 111-2222", email: "martinez@example.com", status: "active", memberCount: 3, createdAt: "2025-02-10" },
    { id: 12, familyId: "F012", familyName: "Garcia Family", address: "963 Pine Ave", ward: "Ward 1", phone: "+1 (555) 333-4444", email: "garcia@example.com", status: "active", memberCount: 4, createdAt: "2025-03-15" },
    { id: 13, familyId: "F013", familyName: "Rodriguez Family", address: "741 Maple Dr", ward: "Ward 3", phone: "+1 (555) 555-6666", email: "rodriguez@example.com", status: "active", memberCount: 2, createdAt: "2025-04-20" },
    { id: 14, familyId: "F014", familyName: "Lopez Family", address: "159 Cedar Rd", ward: "Ward 1", phone: "+1 (555) 777-8888", email: "lopez@example.com", status: "active", memberCount: 5, createdAt: "2025-06-05" },
    { id: 15, familyId: "F015", familyName: "Gonzalez Family", address: "753 Birch Ln", ward: "Ward 2", phone: "+1 (555) 999-0000", email: "gonzalez@example.com", status: "active", memberCount: 3, createdAt: "2025-09-12" },
    
    // 2026 Families (Current Year)
    { id: 16, familyId: "F016", familyName: "Perez Family", address: "357 Spruce St", ward: "Ward 3", phone: "+1 (555) 111-3333", email: "perez@example.com", status: "active", memberCount: 4, createdAt: "2026-01-15" },
    { id: 17, familyId: "F017", familyName: "Sanchez Family", address: "246 Walnut Ave", ward: "Ward 1", phone: "+1 (555) 444-5555", email: "sanchez@example.com", status: "active", memberCount: 3, createdAt: "2026-02-20" },
    { id: 18, familyId: "F018", familyName: "Ramirez Family", address: "135 Cherry Ln", ward: "Ward 2", phone: "+1 (555) 666-7777", email: "ramirez@example.com", status: "active", memberCount: 5, createdAt: "2026-03-10" }
  ],
  
  // Members 2024-2026
  members: [
    // 2024 Members
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
    { id: 11, memberId: "M011", name: "David Anderson", familyId: 10, familyName: "Anderson Family", dateOfBirth: "1993-08-12", gender: "male", phone: "+1 (555) 012-3456", email: "david.anderson@example.com", status: "active", age: 31, joinedDate: "2024-03-25" },
    
    // 2025 Members
    { id: 12, memberId: "M012", name: "Carlos Martinez", familyId: 11, familyName: "Martinez Family", dateOfBirth: "1985-07-15", gender: "male", phone: "+1 (555) 111-2222", email: "carlos.martinez@example.com", status: "active", age: 40, joinedDate: "2025-02-10" },
    { id: 13, memberId: "M013", name: "Elena Martinez", familyId: 11, familyName: "Martinez Family", dateOfBirth: "1987-03-22", gender: "female", phone: "+1 (555) 111-2222", email: "elena.martinez@example.com", status: "active", age: 38, joinedDate: "2025-02-10" },
    { id: 14, memberId: "M014", name: "Antonio Garcia", familyId: 12, familyName: "Garcia Family", dateOfBirth: "1990-11-10", gender: "male", phone: "+1 (555) 333-4444", email: "antonio.garcia@example.com", status: "active", age: 35, joinedDate: "2025-03-15" },
    { id: 15, memberId: "M015", name: "Sofia Garcia", familyId: 12, familyName: "Garcia Family", dateOfBirth: "1992-08-20", gender: "female", phone: "+1 (555) 333-4444", email: "sofia.garcia@example.com", status: "active", age: 33, joinedDate: "2025-03-15" },
    { id: 16, memberId: "M016", name: "Luis Rodriguez", familyId: 13, familyName: "Rodriguez Family", dateOfBirth: "1988-05-18", gender: "male", phone: "+1 (555) 555-6666", email: "luis.rodriguez@example.com", status: "active", age: 37, joinedDate: "2025-04-20" },
    
    // 2026 Members (Current Year)
    { id: 17, memberId: "M017", name: "Maria Perez", familyId: 16, familyName: "Perez Family", dateOfBirth: "1991-09-25", gender: "female", phone: "+1 (555) 111-3333", email: "maria.perez@example.com", status: "active", age: 35, joinedDate: "2026-01-15" },
    { id: 18, memberId: "M018", name: "Jose Perez", familyId: 16, familyName: "Perez Family", dateOfBirth: "1989-12-10", gender: "male", phone: "+1 (555) 111-3333", email: "jose.perez@example.com", status: "active", age: 37, joinedDate: "2026-01-15" },
    { id: 19, memberId: "M019", name: "Ana Sanchez", familyId: 17, familyName: "Sanchez Family", dateOfBirth: "1993-04-12", gender: "female", phone: "+1 (555) 444-5555", email: "ana.sanchez@example.com", status: "active", age: 33, joinedDate: "2026-02-20" },
    { id: 20, memberId: "M020", name: "Diego Sanchez", familyId: 17, familyName: "Sanchez Family", dateOfBirth: "1995-07-30", gender: "male", phone: "+1 (555) 444-5555", email: "diego.sanchez@example.com", status: "active", age: 31, joinedDate: "2026-02-20" },
    { id: 21, memberId: "M021", name: "Carmen Ramirez", familyId: 18, familyName: "Ramirez Family", dateOfBirth: "1986-11-08", gender: "female", phone: "+1 (555) 666-7777", email: "carmen.ramirez@example.com", status: "active", age: 40, joinedDate: "2026-03-10" },
    { id: 22, memberId: "M022", name: "Fernando Ramirez", familyId: 18, familyName: "Ramirez Family", dateOfBirth: "1988-02-14", gender: "male", phone: "+1 (555) 666-7777", email: "fernando.ramirez@example.com", status: "active", age: 38, joinedDate: "2026-03-10" }
  ],
  
  // Sacraments 2024-2026
  sacraments: [
    // 2024 Sacraments
    { id: 1, memberId: 1, memberName: "John Smith", sacramentType: "baptism", date: "2024-01-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2024-001", year: 2024 },
    { id: 2, memberId: 2, memberName: "Mary Smith", sacramentType: "communion", date: "2024-02-15", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "COM-2024-001", year: 2024 },
    { id: 3, memberId: 7, memberName: "Michael Miller", sacramentType: "baptism", date: "2024-03-05", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2024-002", year: 2024 },
    { id: 4, memberId: 3, memberName: "James Johnson", sacramentType: "confirmation", date: "2024-04-10", priest: "Rev. Fr. John", church: "St. Mary's Church", certificateNumber: "CON-2024-001", year: 2024 },
    
    // 2025 Sacraments
    { id: 5, memberId: 12, memberName: "Carlos Martinez", sacramentType: "baptism", date: "2025-02-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2025-001", year: 2025 },
    { id: 6, memberId: 13, memberName: "Elena Martinez", sacramentType: "communion", date: "2025-03-15", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "COM-2025-001", year: 2025 },
    { id: 7, memberId: 14, memberName: "Antonio Garcia", sacramentType: "baptism", date: "2025-03-25", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2025-002", year: 2025 },
    { id: 8, memberId: 16, memberName: "Luis Rodriguez", sacramentType: "confirmation", date: "2025-05-10", priest: "Rev. Fr. John", church: "St. Mary's Church", certificateNumber: "CON-2025-001", year: 2025 },
    { id: 9, memberId: 15, memberName: "Sofia Garcia", sacramentType: "marriage", date: "2025-06-20", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "MAR-2025-001", year: 2025, spouseName: "Antonio Garcia" },
    
    // 2026 Sacraments (Current Year)
    { id: 10, memberId: 17, memberName: "Maria Perez", sacramentType: "baptism", date: "2026-01-25", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2026-001", year: 2026 },
    { id: 11, memberId: 19, memberName: "Ana Sanchez", sacramentType: "communion", date: "2026-02-28", priest: "Rev. Fr. Michael", church: "St. Mary's Church", certificateNumber: "COM-2026-001", year: 2026 },
    { id: 12, memberId: 21, memberName: "Carmen Ramirez", sacramentType: "baptism", date: "2026-03-15", priest: "Rev. Fr. Thomas", church: "St. Mary's Church", certificateNumber: "BAP-2026-002", year: 2026 }
  ],
  
  // Donations 2024-2026
  donations: [
    // 2024 Donations
    { id: 1, memberId: 1, memberName: "John Smith", amount: 500, type: "tithe", date: "2024-01-05", paymentMethod: "cash", receiptNumber: "RCP-2024-001", month: 1, year: 2024 },
    { id: 2, memberId: 2, memberName: "Mary Smith", amount: 300, type: "offertory", date: "2024-01-12", paymentMethod: "online", receiptNumber: "RCP-2024-002", month: 1, year: 2024 },
    { id: 3, memberId: 3, memberName: "James Johnson", amount: 200, type: "tithe", date: "2024-02-18", paymentMethod: "cash", receiptNumber: "RCP-2024-003", month: 2, year: 2024 },
    { id: 4, memberId: 4, memberName: "Sarah Williams", amount: 150, type: "offertory", date: "2024-02-26", paymentMethod: "check", receiptNumber: "RCP-2024-004", month: 2, year: 2024 },
    { id: 5, memberId: 7, memberName: "Michael Miller", amount: 400, type: "tithe", date: "2024-03-19", paymentMethod: "online", receiptNumber: "RCP-2024-005", month: 3, year: 2024 },
    { id: 6, memberId: 8, memberName: "Patricia Wilson", amount: 600, type: "building", date: "2024-03-23", paymentMethod: "check", receiptNumber: "RCP-2024-006", month: 3, year: 2024 },
    
    // 2025 Donations
    { id: 7, memberId: 12, memberName: "Carlos Martinez", amount: 550, type: "tithe", date: "2025-02-10", paymentMethod: "cash", receiptNumber: "RCP-2025-001", month: 2, year: 2025 },
    { id: 8, memberId: 13, memberName: "Elena Martinez", amount: 350, type: "offertory", date: "2025-02-20", paymentMethod: "online", receiptNumber: "RCP-2025-002", month: 2, year: 2025 },
    { id: 9, memberId: 14, memberName: "Antonio Garcia", amount: 400, type: "tithe", date: "2025-03-15", paymentMethod: "cash", receiptNumber: "RCP-2025-003", month: 3, year: 2025 },
    { id: 10, memberId: 16, memberName: "Luis Rodriguez", amount: 700, type: "building", date: "2025-04-20", paymentMethod: "check", receiptNumber: "RCP-2025-004", month: 4, year: 2025 },
    { id: 11, memberId: 15, memberName: "Sofia Garcia", amount: 300, type: "offertory", date: "2025-05-10", paymentMethod: "cash", receiptNumber: "RCP-2025-005", month: 5, year: 2025 },
    { id: 12, memberId: 1, memberName: "John Smith", amount: 600, type: "tithe", date: "2025-06-05", paymentMethod: "cash", receiptNumber: "RCP-2025-006", month: 6, year: 2025 },
    
    // 2026 Donations (Current Year)
    { id: 13, memberId: 17, memberName: "Maria Perez", amount: 450, type: "tithe", date: "2026-01-20", paymentMethod: "cash", receiptNumber: "RCP-2026-001", month: 1, year: 2026 },
    { id: 14, memberId: 18, memberName: "Jose Perez", amount: 350, type: "offertory", date: "2026-01-25", paymentMethod: "online", receiptNumber: "RCP-2026-002", month: 1, year: 2026 },
    { id: 15, memberId: 19, memberName: "Ana Sanchez", amount: 500, type: "tithe", date: "2026-02-15", paymentMethod: "cash", receiptNumber: "RCP-2026-003", month: 2, year: 2026 },
    { id: 16, memberId: 20, memberName: "Diego Sanchez", amount: 300, type: "offertory", date: "2026-02-22", paymentMethod: "online", receiptNumber: "RCP-2026-004", month: 2, year: 2026 },
    { id: 17, memberId: 21, memberName: "Carmen Ramirez", amount: 600, type: "tithe", date: "2026-03-10", paymentMethod: "cash", receiptNumber: "RCP-2026-005", month: 3, year: 2026 },
    { id: 18, memberId: 22, memberName: "Fernando Ramirez", amount: 400, type: "building", date: "2026-03-18", paymentMethod: "check", receiptNumber: "RCP-2026-006", month: 3, year: 2026 }
  ],
  
  // Dashboard with aggregated data
  dashboard: {
    totalFamilies: 18,
    totalMembers: 22,
    totalDonations: 7600,
    sacramentsThisYear: 3,
    recentActivities: [
      { id: 1, description: "New family registered: Ramirez Family", user: "Admin", time: "2 hours ago" },
      { id: 2, description: "Donation received: $400 from Fernando Ramirez", user: "Treasurer", time: "5 hours ago" },
      { id: 3, description: "Baptism recorded for Carmen Ramirez", user: "Priest", time: "1 day ago" },
      { id: 4, description: "New member added: Fernando Ramirez", user: "Secretary", time: "2 days ago" },
      { id: 5, description: "First Communion for Ana Sanchez", user: "Priest", time: "3 days ago" }
    ],
    upcomingEvents: [
      { id: 1, title: "Sunday Mass", date: "2026-03-24", location: "Main Church", time: "10:00 AM" },
      { id: 2, title: "Bible Study", date: "2026-03-25", location: "Parish Hall", time: "7:00 PM" },
      { id: 3, title: "Youth Group Meeting", date: "2026-03-26", location: "Youth Center", time: "6:30 PM" },
      { id: 4, title: "Easter Vigil Mass", date: "2026-03-30", location: "Main Church", time: "8:00 PM" },
      { id: 5, title: "Easter Sunday Mass", date: "2026-03-31", location: "Main Church", time: "10:00 AM" }
    ],
    monthlyStats: {
      families: { jan: 16, feb: 17, mar: 18 },
      members: { jan: 19, feb: 21, mar: 22 },
      donations: { jan: 800, feb: 800, mar: 1000 }
    }
  },
  
  // Reports with month-by-month data
  reports: {
    monthlyDonations: [
      { name: "Jan", value: 800 },
      { name: "Feb", value: 800 },
      { name: "Mar", value: 1000 },
      { name: "Apr", value: 0 },
      { name: "May", value: 0 },
      { name: "Jun", value: 0 }
    ],
    memberGrowth: [
      { period: "Jan", members: 19, newMembers: 2 },
      { period: "Feb", members: 21, newMembers: 2 },
      { period: "Mar", members: 22, newMembers: 1 },
      { period: "Apr", members: 22, newMembers: 0 },
      { period: "May", members: 22, newMembers: 0 },
      { period: "Jun", members: 22, newMembers: 0 }
    ],
    donationTypes: [
      { name: "Tithe", value: 3800 },
      { name: "Offertory", value: 1900 },
      { name: "Building", value: 1700 },
      { name: "Charity", value: 200 },
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

// ============ TRENDS ENDPOINT ============
app.get('/api/dashboard/trends', (req, res) => {
  try {
    // Get current date
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    // Calculate previous month
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;
    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear = currentYear - 1;
    }
    
    // Get first day of current month and previous month
    const currentMonthStart = new Date(currentYear, currentMonth - 1, 1);
    const previousMonthStart = new Date(previousYear, previousMonth - 1, 1);
    
    // Families this month vs last month
    const familiesThisMonth = db.families.filter(f => {
      const createdDate = new Date(f.createdAt);
      return createdDate >= currentMonthStart;
    }).length;
    
    const familiesLastMonth = db.families.filter(f => {
      const createdDate = new Date(f.createdAt);
      return createdDate >= previousMonthStart && createdDate < currentMonthStart;
    }).length;
    
    // Members this month vs last month
    const membersThisMonth = db.members.filter(m => {
      const joinedDate = new Date(m.joinedDate);
      return joinedDate >= currentMonthStart;
    }).length;
    
    const membersLastMonth = db.members.filter(m => {
      const joinedDate = new Date(m.joinedDate);
      return joinedDate >= previousMonthStart && joinedDate < currentMonthStart;
    }).length;
    
    // Donations this month vs last month
    const donationsThisMonth = db.donations
      .filter(d => {
        const donationDate = new Date(d.date);
        return donationDate >= currentMonthStart;
      })
      .reduce((sum, d) => sum + d.amount, 0);
    
    const donationsLastMonth = db.donations
      .filter(d => {
        const donationDate = new Date(d.date);
        return donationDate >= previousMonthStart && donationDate < currentMonthStart;
      })
      .reduce((sum, d) => sum + d.amount, 0);
    
    // Sacraments this year vs last year
    const sacramentsThisYear = db.sacraments.filter(s => {
      const sacramentDate = new Date(s.date);
      return sacramentDate.getFullYear() === currentYear;
    }).length;
    
    const sacramentsLastYear = db.sacraments.filter(s => {
      const sacramentDate = new Date(s.date);
      return sacramentDate.getFullYear() === currentYear - 1;
    }).length;
    
    const calculateTrend = (current, previous) => {
      if (previous === 0 && current === 0) return { positive: true, value: 0 };
      if (previous === 0) return { positive: true, value: 100 };
      const change = ((current - previous) / previous) * 100;
      return {
        positive: change >= 0,
        value: Math.abs(Math.round(change))
      };
    };
    
    res.json({
      data: {
        families: calculateTrend(familiesThisMonth, familiesLastMonth),
        members: calculateTrend(membersThisMonth, membersLastMonth),
        donations: calculateTrend(donationsThisMonth, donationsLastMonth),
        sacraments: calculateTrend(sacramentsThisYear, sacramentsLastYear)
      }
    });
  } catch (error) {
    console.error('Error calculating trends:', error);
    res.status(500).json({ 
      data: {
        families: { positive: true, value: 0 },
        members: { positive: true, value: 0 },
        donations: { positive: true, value: 0 },
        sacraments: { positive: true, value: 0 }
      }
    });
  }
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