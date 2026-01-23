# Supabase Setup Instructions

This guide will help you set up Supabase for the Research Form.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Setup Steps

### 1. Create the Database Table

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor (in the left sidebar)
3. Copy the contents of `supabase-schema.sql`
4. Paste it into the SQL Editor and run it
5. This will create the `test_adding_columns` table with the proper schema and permissions

### 2. Get Your Supabase Credentials

1. Go to Project Settings → API (https://app.supabase.com/project/_/settings/api)
2. Copy your:
   - **Project URL** (should look like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

### 3. Configure Your Environment Variables

1. Create a `.env.local` file in the root directory of your project:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Important**: Add `.env.local` to your `.gitignore` if it's not already there (to keep your credentials private)

### 4. Restart Your Development Server

After adding the environment variables, restart your React development server:

```bash
npm start
```

## Viewing Form Submissions

You have several options to view form submissions:

### Option 1: Supabase Dashboard (Recommended for now)
1. Go to your Supabase project
2. Navigate to Table Editor
3. Select `test_adding_columns` table
4. You'll see all submissions with timestamps

### Option 2: Build an Admin View (Optional)
You can create an admin page in your React app to view submissions (requires authentication setup).

## Security Notes

- The current setup allows **anyone** to submit forms (INSERT)
- Only authenticated users can read the submissions (if you uncomment that policy)
- Your anon key is safe to use in client-side code for this purpose
- Never commit `.env.local` to version control
- Consider setting up email notifications for new submissions

## Troubleshooting

### "relation 'test_adding_columns' does not exist"
- Make sure you ran the SQL schema in your Supabase SQL Editor

### "Invalid API key"
- Double-check your environment variables
- Make sure you copied the **anon/public** key, not the service role key
- Restart your development server after changing env variables

### Form submissions not appearing
- Check the browser console for errors
- Verify RLS policies are set correctly
- Ensure the anon key has INSERT permissions on the table
