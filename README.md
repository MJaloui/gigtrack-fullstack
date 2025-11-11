# GigTrack

A freelance project manager app to track client projects, deadlines, deliverables, hours, and invoice status.

<img width="1510" height="722" alt="image" src="https://github.com/user-attachments/assets/ea255e82-89b1-4688-aad2-98dc08cc9de2" />


## Features

- **Track Projects**: Add and manage client projects with deadlines and deliverables
- **Log Hours**: Track hours worked on each project
- **Invoice Status**: Monitor invoice status (Not Invoiced, Invoiced, Paid, Overdue)
- **Priority Levels**: Color-coded priority levels (High/Medium/Low)
  - High: Red border
  - Medium: Yellow border
  - Low: Green border
- **Client Rating**: yes/no rating to track which clients to work with again
- **Edit & Delete**: Full CRUD functionality for projects

## Installation

1. Navigate to the project folder:
   ```bash
   cd gig-track
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `config/database.js` with your MongoDB connection string if needed

4. Run the server:
   ```bash
   node server.js
   ```

5. Open browser to `http://localhost:8080`

## MongoDB Collections

- **projects** - Contains project data with:
  - clientName (String)
  - projectName (String)
  - deadline (Date)
  - deliverables (String)
  - hours (Number)
  - invoiceStatus (String: Not Invoiced, Invoiced, Paid, Overdue)
  - priority (String: High, Medium, Low)
  - rated (Number)
  - rated (Number)
  - timestamps (createdAt, updatedAt)

## Database

The app uses MongoDB database: `gigTrack`

