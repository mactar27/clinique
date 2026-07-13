const mysql = require('mysql2/promise');
require('dotenv').config();
async function main() {
  const connection = await mysql.createConnection({
    host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
    port: 4000,
    user: "2kuzvtvSomq6ci2.root",
    password: "JZCqW6hZkXMiKE5q",
    database: "clinique_db",
    ssl: { rejectUnauthorized: true }
  });
  
  const sql = `CREATE TABLE IF NOT EXISTS \`staff\` (
    \`id\` varchar(36) NOT NULL,
    \`first_name\` text NOT NULL,
    \`last_name\` text NOT NULL,
    \`role\` varchar(50) NOT NULL,
    \`specialty\` text,
    \`phone\` text NOT NULL,
    \`email\` text,
    \`status\` varchar(20) NOT NULL DEFAULT 'active',
    \`created_at\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`staff_id\` PRIMARY KEY(\`id\`)
  );`;
  
  await connection.execute(sql);
  
  // Also let's seed a few staff members
  const [rows] = await connection.execute("SELECT count(*) as c FROM staff");
  if (rows[0].c === 0) {
    await connection.execute(`INSERT INTO staff (id, first_name, last_name, role, specialty, phone, email) VALUES 
      (UUID(), 'Fatou', 'Diop', 'Médecin', 'Médecine générale', '77 123 45 67', 'fatou.diop@maimouna.sn'),
      (UUID(), 'Amadou', 'Sow', 'Infirmier', NULL, '77 987 65 43', 'amadou.sow@maimouna.sn'),
      (UUID(), 'Aissatou', 'Ndiaye', 'Réceptionniste', NULL, '78 111 22 33', 'accueil@maimouna.sn')
    `);
    console.log("Seeded staff");
  }

  console.log("Success");
  process.exit(0);
}
main().catch(console.error);
