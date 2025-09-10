# 🛒 E-Commerce Website

A modern, full-stack e-commerce platform built with Next.js, React, TypeScript, and Node.js. This project features a complete online shopping experience with product catalog, shopping cart, user authentication, order management, and product customization.

## ✨ Features

### 🎨 Frontend Features
- **Modern UI/UX**: Built with Next.js 14 and React 18
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Component Library**: Reusable UI components with shadcn/ui
- **Dark/Light Theme**: Theme switching capability
- **Product Gallery**: Interactive product image galleries
- **Shopping Cart**: Real-time cart management
- **User Authentication**: Secure login and registration
- **Product Customization**: Custom product options
- **Order Tracking**: Complete order management system

### 🔧 Backend Features
- **RESTful API**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **File Upload**: Image upload functionality
- **Order Management**: Complete order processing
- **User Management**: User profiles and preferences
- **Product Management**: CRUD operations for products
- **Contact System**: Contact form handling

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT
- **File Upload**: Multer

## 📁 Project Structure

```
ecommerce-website/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── cart/              # Shopping cart page
│   ├── contact/           # Contact page
│   ├── customize/         # Product customization
│   ├── login/             # Authentication pages
│   ├── orders/            # Order management
│   ├── products/          # Product catalog
│   └── profile/           # User profile
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── ProductCard.tsx   # Product display
│   └── ...
├── context/              # React Context providers
│   ├── AuthContext.tsx   # Authentication state
│   └── CartContext.tsx   # Shopping cart state
├── ecommerce-backend/    # Backend API
│   ├── config/          # Database configuration
│   ├── controller/      # API controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── uploads/         # File upload handling
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── public/              # Static assets
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Vivekpatil26072003/ecommerce-website.git
cd ecommerce-website
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd ecommerce-backend
npm install
cd ..
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
```

### 4. Database Setup
Make sure MongoDB is running on your system:
```bash
# Start MongoDB service
mongod
```

### 5. Run the Application
```bash
# Start the backend server
cd ecommerce-backend
npm start

# In a new terminal, start the frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📱 Pages & Features

### 🏠 Home Page
- Hero section with featured products
- Product categories
- Latest arrivals
- Customer testimonials

### 🛍️ Product Catalog
- Product grid with filtering
- Search functionality
- Category-based browsing
- Product details with image gallery

### 🛒 Shopping Cart
- Add/remove products
- Quantity adjustment
- Price calculation
- Checkout process

### 👤 User Authentication
- User registration
- Login/logout
- Profile management
- Order history

### 🎨 Product Customization
- Custom product options
- Color selection
- Size variations
- Personalization features

### 📦 Order Management
- Order placement
- Order tracking
- Order history
- Invoice generation

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Contact
- `POST /api/contact` - Submit contact form

## 🎨 UI Components

The project uses a comprehensive set of UI components from shadcn/ui:
- Buttons, Cards, Forms
- Navigation, Menus, Dialogs
- Tables, Charts, Calendars
- Inputs, Selects, Checkboxes
- And many more...

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically

### Backend (Railway/Heroku)
1. Connect your repository
2. Set environment variables
3. Deploy the backend API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vivek Patil**
- GitHub: [@Vivekpatil26072003](https://github.com/Vivekpatil26072003)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) for the database solution

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Contact me at [your-email@example.com]

---

⭐ **Star this repository if you found it helpful!**
