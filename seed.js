const { masterSequelize } = require('./src/config/database');
const User = require('./src/models/User');
const Company = require('./src/models/Company');

async function seed() {
  try {
    await masterSequelize.sync({ force: true });
    
    // Create a default company
    const company = await Company.create({
      name: 'Empresa Teste',
      ruc: '12345678901',
      db_host: 'localhost',
      db_port: 5432,
      db_name: 'yapenot',
      db_user: 'asist',
      db_password: 'admin123',
      db_ssl: false
    });

    // Create a global admin
    await User.create({
      name: 'Admin Global',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin_global'
    });

    // Create a company admin
    await User.create({
      name: 'Admin Empresa',
      email: 'empresa@test.com',
      password: 'password123',
      role: 'admin_empresa',
      company_id: company.id
    });

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
