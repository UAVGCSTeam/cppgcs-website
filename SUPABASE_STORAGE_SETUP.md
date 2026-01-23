# Supabase Storage Setup for File Uploads

This guide explains how to set up Supabase Storage for handling resume uploads in the Research Form.

## Storage Bucket Setup

### 1. Create the Storage Bucket

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Configure the bucket:
   - **Name**: `research-form-uploads`
   - **Public bucket**: Toggle **ON** (so uploaded files can be accessed via public URLs)
   - Click **"Create bucket"**

### 2. Set Up Storage Policies

After creating the bucket, you need to set up policies to allow uploads:

1. Click on the `research-form-uploads` bucket
2. Go to the **Policies** tab
3. Click **"New policy"**

#### Policy 1: Allow Public Uploads

Create a policy to allow anyone to upload files:

- **Policy name**: `Anyone can upload files`
- **Allowed operation**: `INSERT`
- **Policy definition**: Select "Custom" and use:
  ```sql
  true
  ```
- **Target roles**: Select `anon`
- Click **"Review"** then **"Save policy"**

Or run this SQL in the SQL Editor:

```sql
CREATE POLICY "Anyone can upload files"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'research-form-uploads');
```

#### Policy 2: Allow Public Access to Files

Create a policy to allow anyone to view/download uploaded files:

- **Policy name**: `Anyone can view files`
- **Allowed operation**: `SELECT`
- **Policy definition**: Select "Custom" and use:
  ```sql
  true
  ```
- **Target roles**: Select `anon` and `authenticated`
- Click **"Review"** then **"Save policy"**

Or run this SQL in the SQL Editor:

```sql
CREATE POLICY "Anyone can view files"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'research-form-uploads');
```

### 3. Update Your Database Schema

If you've already created the `test_adding_columns` table, you need to add the `resume_url` column:

```sql
ALTER TABLE test_adding_columns 
ADD COLUMN IF NOT EXISTS resume_url TEXT;
```

If you haven't created the table yet, use the updated `supabase-schema.sql` file which includes this column.

## File Upload Features

The form now includes:

- ✅ **PDF-only uploads** (validates file type)
- ✅ **5MB file size limit** (validates before upload)
- ✅ **File preview** with name and size display
- ✅ **Remove file option** before submitting
- ✅ **Unique file names** to prevent collisions
- ✅ **Public URLs** stored in database for easy access
- ✅ **Optional upload** - form works with or without file

## File Organization

Files are stored in the bucket with this structure:
```
research-form-uploads/
└── resumes/
    ├── 1234567890_abc123.pdf
    ├── 1234567891_def456.pdf
    └── ...
```

## Viewing Uploaded Files

### Option 1: Supabase Dashboard
1. Go to **Storage** → `research-form-uploads` bucket
2. Browse the `resumes/` folder
3. Click any file to view or download

### Option 2: Database Query
Query the database to see submissions with their file URLs:

```sql
SELECT 
  name, 
  email, 
  resume_url,
  created_at 
FROM test_adding_columns 
WHERE resume_url IS NOT NULL
ORDER BY created_at DESC;
```

## Security Considerations

- **Public bucket**: Files are publicly accessible via URL (appropriate for resumes)
- **No authentication required**: Anyone can upload (appropriate for a public form)
- **File validation**: Client-side validation for file type and size
- **Unique names**: Prevents filename collisions and reveals no user info
- **Size limits**: 5MB limit prevents abuse

## Optional: Restrict File Access

If you want to make uploaded files private (only accessible by authenticated users):

1. Change the bucket to **Private** (uncheck "Public bucket")
2. Update the storage policies to require authentication
3. Update the form to use `createSignedUrl()` instead of `getPublicUrl()`

## Testing

To test the file upload:

1. Start your development server: `npm start`
2. Fill out the form
3. Click "Upload Resume (PDF only)" and select a PDF
4. Submit the form
5. Check the Supabase Storage bucket to see your file
6. Check the database table to see the `resume_url` populated
