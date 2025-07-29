import mysql from 'mysql2/promise';

interface Link {
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
}

// Create a single connection pool that will be reused.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Increased timeout for remote connections
  connectTimeout: 10000,
});

// Helper function to create the table if it doesn't exist.
// This function is now called only once when the module is first loaded.
async function setupDatabase() {
    let connection;
    try {
        console.log("Attempting to connect to the database and set up the table...");
        connection = await pool.getConnection();
        await connection.query(`
            CREATE TABLE IF NOT EXISTS links (
                shortCode VARCHAR(255) NOT NULL PRIMARY KEY,
                originalUrl TEXT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Database setup complete. 'links' table is ready.");
    } catch (error) {
        console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.error("!!! DATABASE CONNECTION FAILED !!!");
        console.error("Error connecting to database or setting up table:", error);
        console.error("Please check your .env file and ensure the database is accessible.");
        console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // We rethrow the error to prevent the app from running with a bad DB connection.
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

// We'll await the setup to ensure the database is ready before the app continues.
const setupPromise = setupDatabase();

// This function now gets a connection from the single, shared pool.
async function getConnection() {
    await setupPromise; // Ensure setup is complete before getting a connection
    return pool.getConnection();
}


export async function isShortCodeTaken(shortCode: string): Promise<boolean> {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT shortCode FROM links WHERE shortCode = ?', [shortCode.toLowerCase()]);
    return rows.length > 0;
  } finally {
    connection.release();
  }
}

export async function getLinkByShortCode(shortCode: string): Promise<{originalUrl:string} | null> {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT originalUrl FROM links WHERE shortCode = ?', [shortCode.toLowerCase()]);
    if (rows.length > 0) {
      return { originalUrl: rows[0].originalUrl };
    }
    return null;
  } finally {
    connection.release();
  }
}

export async function addLink(originalUrl: string, shortCode: string): Promise<void> {
    const connection = await getConnection();
    try {
        const sql = 'INSERT INTO links (originalUrl, shortCode, createdAt) VALUES (?, ?, ?)';
        await connection.query(sql, [originalUrl, shortCode.toLowerCase(), new Date()]);
    } finally {
        connection.release();
    }
}
