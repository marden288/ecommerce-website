<div align="center">

# 🛒 ShopHub — Full-Stack E-Commerce

### A complete, production-ready online store with product catalog, cart, orders, payments flow, and admin panel.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

</div>

---

> **The fastest way to study a real e-commerce codebase** — authentication, cart state, order management, and a full admin panel, all wired together with a clean React + Express + MongoDB stack.

---

## ✨ Features

<table>
<tr>
<td width="50%">

**🛍️ Shopping Experience**
- Browse 12+ products with search & category filter
- Sort by price, rating, newest
- Product detail with stock status & ratings
- Persistent cart with quantity controls

</td>
<td width="50%">

**🔐 Auth & Accounts**
- JWT-based register / login
- User dashboard with full order history
- Order status tracking
- Secure password hashing (bcryptjs)

</td>
</tr>
<tr>
<td width="50%">

**📦 Order Flow**
- Checkout with shipping address form
- Order summary before confirmation
- Order confirmation + history

</td>
<td width="50%">

**⚙️ Admin Panel**
- Add / edit / delete products
- Mark orders as delivered
- Manage users

</td>
</tr>
</table>

---

## ⚡ Quick Start

```bash
git clone https://github.com/aasimansari1/ecommerce.git
cd ecommerce

npm install          # installs root + client + server deps

# Seed the database with sample products
npm run seed

# Start both frontend (port 3000) and backend (port 5000)
npm run dev
```

Open **http://localhost:3000**

---

## 🔧 Environment Variables

Create `server/.env`:

```env
MONGO_URI=mongodb://localhost:27017/shophub
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Single product |
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | User's orders |
| GET | `/api/users` | All users *(admin)* |

---

## 🗂️ Project Structure

```
ecommerce/
├── client/                     # React frontend (CRA)
│   └── src/
│       ├── api/                # Axios instance
│       ├── components/         # Navbar, Footer, ProductCard
│       ├── context/            # AuthContext, CartContext
│       └── pages/              # Home, Products, Cart, Checkout,
│                               # Login, Register, Dashboard, Admin
├── server/                     # Express backend
│   ├── config/                 # MongoDB connection
│   ├── middleware/             # JWT auth
│   ├── models/                 # User, Product, Order schemas
│   ├── routes/                 # auth, products, orders, users
│   ├── seed.js                 # Sample product seeder
│   └── server.js               # Entry point
└── package.json                # Root — runs both with concurrently
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Axios |
| Backend | Express.js, Node.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| State | React Context (AuthContext, CartContext) |
| Dev | concurrently (run both servers with one command) |

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start frontend + backend concurrently |
| `npm run server` | Backend only (port 5000) |
| `npm run client` | Frontend only (port 3000) |
| `npm run seed` | Seed DB with sample products |

---

## 🚀 Deployment

**Frontend → Vercel**
```bash
cd client && npm run build
# Deploy build/ — set REACT_APP_API_URL=https://your-api.com
```

**Backend → Railway / Render**
1. Set env vars: `MONGO_URI`, `JWT_SECRET`
2. Start command: `node server/server.js`

**Database → MongoDB Atlas**
1. Free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Copy connection string → `MONGO_URI`

---

## 🤝 Contributing

Ideas welcome:
- 💳 Stripe / Razorpay payment integration
- ⭐ Product reviews & ratings system
- 🔎 Elasticsearch-powered search
- 📧 Order confirmation emails

```bash
git checkout -b feature/your-feature
git commit -m 'Add your feature'
git push origin feature/your-feature
```

---

## 📄 License

MIT © [Mohd Aasim Ansari](https://github.com/aasimansari1)

---

<div align="center">

**A solid base for your next e-commerce project. If this helped, please ⭐ star the repo!**

</div>
