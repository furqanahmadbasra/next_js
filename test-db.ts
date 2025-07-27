// test-db.ts
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

const test = async () => {
  try {
    // Add this check to see your loaded variables
    console.log('Checking DATABASE_URL:', process.env.DATABASE_URL ? 'Exists' : 'Missing');
    
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT 1 as test_value`;
    console.log('✅ Connection successful! Result:', result[0].test_value);
  } catch (error) {
    console.log('❌ Connection failed:', error instanceof Error ? error.message : error);
  }
};

test();