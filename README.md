# Phoenix : IMF Gadget API Development Challenge

The IMF Gadget API allows the management of gadgets used by the Impossible Missions Force (IMF). This API provides endpoints for adding, updating, retrieving, and decommissioning gadgets, as well as triggering a self-destruct sequence on gadgets. It includes secure authentication and authorization using JWT to protect the API.

---

## Endpoints

### **User Endpoints**

#### 1. **Sign Up**
- **POST** `/auth/register`

#### 2. **Login**
- **POST** `/auth/login`

### **Gadget Endpoints**

#### 1. **Get All Gadgets**
- **GET** `/api/gadgets`

#### 2. **Add a Gadget**
- **POST** `api/gadgets`

#### 3. **Update a Gadget**
- **PATCH** `api/gadgets/:id`

#### 4. **Decommission a Gadget**
- **DELETE** `api/gadgets/:id`
- 
#### 5. **Trigger Self-Destruct**
- **POST** `api/gadgets/:id/self-destruct`
#### 6. **Filter by status**
- **GET** `api/gadgets?status={status}`
- Retrieve gadgets filtered by their current status (e.g., "Available", "Deployed", "Destroyed").

## Setup Instructions
1. Clone the repository
   
   ```bash
   git clone https://github.com/charu1603/pheonix-imf-gadget.git
   ```
2. Install dependencies:
   
   ```bash
   npm install
   ```
3. required environment variables.
   
   ```bash
   DATABASE_URL = your postgres url
   PORT = 5000
   JWT = your_token
   ```
4. Run Prisma migrations:

   ```bash
   npx prisma migrate deploy
   ```
5. Start the server:
   
   ```bash
   node server.js
   ```
## Tech Stack:

1. Backend: Node.js & Express
2. Database: PostgreSQL
3. ORM: Prisma (The absolute GOAT for handling DB queries)
4. Authentication and Authorization: JWT


##  URL
```
https://pheonix-imf-gadget-production.up.railway.app/
```


