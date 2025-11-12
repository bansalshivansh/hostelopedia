# 🏠 Hostel Recommendation System

A smart hostel recommendation system that uses machine learning (cosine similarity) to find the perfect hostel based on user preferences, ratings, location, and budget.

## ✨ Features

- 🔍 **Search by Hostel Name** - Find similar hostels using AI algorithm
- 💰 **Filter by Price** - Budget (0-150k), Mid-range (150k-250k), Premium (250k+)
- 📍 **Filter by Location** - Bidholi, Kandoli
- 👥 **Filter by Gender** - Boys Hostels, Girls Hostels
- ⭐ **Smart Recommendations** - Get all matching hostels sorted by rating
- 🎨 **Beautiful UI** - Modern Tailwind CSS design with React
- ⚡ **Fast Performance** - Real-time search and filtering

## 🏗️ Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router v6** - Navigation
- **Vite 3.2.2** - Build tool
- **Tailwind CSS 3.2.1** - Styling

### Backend
- **Express.js 4.18.2** - Node.js framework
- **CORS** - Cross-origin support
- **Node.js** - Runtime

### Machine Learning
- **Python 3.14.0** - Language
- **Pandas** - Data processing
- **Scikit-learn** - ML algorithms
  - CountVectorizer - Feature extraction
  - Cosine Similarity - Recommendation algorithm

### Database
- **CSV** - main_database.csv (239 hostel records)

## 📁 Project Structure

```
hostel-recom-main/
├── src/
│   ├── App.jsx           # Main React component
│   ├── main.jsx          # Entry point
│   ├── index.css         # Styles
│   └── logo.jsx          # Logo component
├── server/
│   └── index.js          # Express backend
├── python/
│   ├── new.py            # ML recommendation engine
│   └── main_database.csv # Hostel data
├── public/               # Static assets
├── package.json          # NPM dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.cjs   # Tailwind configuration
└── index.html            # HTML template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.7+
- pip

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/hostel-recom-main.git
cd hostel-recom-main
```

2. **Setup Python virtual environment**
```bash
python -m venv .venv
.venv\Scripts\activate  # On Windows
source .venv/bin/activate  # On macOS/Linux
```

3. **Install Python dependencies**
```bash
cd python
pip install pandas numpy scikit-learn
cd ..
```

4. **Install Node dependencies**
```bash
npm install
```

## 🎯 Running the Application

### Start Backend Server
```bash
cd server
node index.js
# Server runs on http://localhost:8080
```

### Start Frontend Dev Server (in a new terminal)
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

## 💡 How It Works

### Recommendation Algorithm
1. **Data Loading** - Load hostel database with ratings, locations, and prices
2. **Feature Creation** - Create tags from hostel attributes (rating, location, gender)
3. **Vectorization** - Convert tags to numerical vectors using CountVectorizer
4. **Similarity Calculation** - Compute cosine similarity between all hostels
5. **Filtering** - Apply user filters (price, location, gender)
6. **Ranking** - Sort by similarity score and rating

### Search Modes

**Mode 1: Search by Hostel Name**
- Input: "scholars park"
- Output: All similar boys hostels sorted by similarity

**Mode 2: Filter Only Search**
- Input: Select "Budget" + "Bidholi" + "Girls"
- Output: Top-rated girls hostels in Bidholi under 150k

**Mode 3: Combined Search**
- Input: "royal stay" + Budget filter
- Output: Budget-friendly hostels similar to Royal Stay

## 📊 API Endpoints

### POST /search
Fetch hostel recommendations

**Query Parameters:**
- `hostelName` (optional) - Hostel name to find similar hostels
- `priceRange` (optional) - "budget", "mid", "premium"
- `location` (optional) - "bidholi", "kandoli"
- `gender` (optional) - "boys", "girls"

**Response:**
```json
[
  {
    "hostelName": "scholars park",
    "location": "bidholi",
    "rating": "3.91",
    "price": "175000.0",
    "gender": "boys"
  }
]
```

## 🔧 Configuration

### Price Ranges
- Budget: 0 - 150,000
- Mid-range: 150,000 - 250,000
- Premium: 250,000+

### Locations
- Bidholi
- Kandoli

### Genders
- Boys
- Girls

## 📝 Sample Searches

1. **Find hostels similar to Scholars Park**
   - Input: "scholars park"
   - Result: 11 boys hostels with similarity scores

2. **Browse all girls hostels**
   - Filter: Select "Girls Hostels"
   - Result: All available girls hostels sorted by rating

3. **Find budget-friendly hostels in Bidholi**
   - Filters: Budget + Bidholi
   - Result: All budget hostels in Bidholi

## 🐛 Troubleshooting

### Backend not starting
- Make sure port 8080 is not in use
- Check Python installation: `python --version`
- Verify venv is activated

### Frontend not loading
- Clear browser cache
- Check that Vite server is running on port 5173
- Verify backend API is accessible

### No recommendations found
- Check spelling of hostel name (case-insensitive)
- Verify filters are correctly set
- Ensure CSV file path is correct

## 📈 Future Enhancements

- [ ] User reviews and ratings
- [ ] Favorite hostels
- [ ] Booking integration
- [ ] Advanced filters (amenities, WiFi, etc.)
- [ ] Mobile app
- [ ] Real-time availability

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a hostel recommendation system using ML algorithms.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
