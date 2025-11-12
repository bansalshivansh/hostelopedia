# 🏠 Hostel Recommendation System

A smart ML-powered hostel recommendation system using cosine similarity to find the perfect hostel based on preferences, ratings, location, and budget.

**Author:** Shivansh Bansal

## ✨ Features

- 🔍 Search by hostel name for similar recommendations
- 💰 Filter by price (Budget/Mid/Premium)
- 📍 Filter by location (Bidholi/Kandoli)
- 👥 Filter by gender (Boys/Girls)
- ⭐ Get all matching hostels sorted by rating
- 🎨 Beautiful React + Tailwind UI
- ⚡ Real-time search & filtering

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18.2 + Vite 3.2 + Tailwind CSS |
| **Backend** | Express.js 4.18 + Node.js |
| **ML Engine** | Python + Scikit-learn (Cosine Similarity) |
| **Database** | CSV (239 hostel records) |

## 📁 Project Structure

```
hostel-recom-main/
├── src/                    # React components
│   ├── App.jsx            # Main app
│   ├── main.jsx           # Entry point
│   └── logo.jsx           # Logo
├── server/
│   └── index.js           # Express API
├── python/
│   ├── new.py             # ML engine
│   └── main_database.csv  # Data
├── package.json
├── vite.config.js
└── index.html
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- Python 3.7+

### Setup

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/hostel-recom-main.git
cd hostel-recom-main

# Setup Python
python -m venv .venv
.venv\Scripts\activate
pip install pandas numpy scikit-learn

# Setup Node
npm install
```

### Run

**Terminal 1 - Backend:**
```bash
cd server
node index.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Visit `http://localhost:5173` ✨

## 🤖 How It Works

1. **Load Data** → Read hostel database with ratings & attributes
2. **Feature Engineering** → Create tags (rating + location + gender)
3. **Vectorization** → Convert to numerical vectors (CountVectorizer)
4. **Similarity** → Calculate cosine similarity between all hostels
5. **Filter & Rank** → Apply filters and sort by similarity + rating

## 🔍 Search Modes

| Mode | Input | Output |
|------|-------|--------|
| **By Name** | "scholars park" | Similar boys hostels |
| **By Filters** | Budget + Bidholi | Top budget hostels in Bidholi |
| **Combined** | "royal stay" + Budget | Budget-friendly similar hostels |

## 📊 API

**POST** `/search`

**Query Params:**
- `hostelName` (optional) - Hostel name
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
    "price": "175000",
    "gender": "boys"
  }
]
```

## 💰 Price Ranges

- **Budget**: 0 - 150k
- **Mid**: 150k - 250k
- **Premium**: 250k+

## 📝 Example Searches

```
1. Search: "scholars park" → 11 similar boys hostels
2. Filter: "Girls" → All girls hostels (sorted by rating)
3. Filter: "Budget" + "Bidholi" → Budget hostels in Bidholi
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check port 8080 is free, Python installed |
| Frontend blank | Clear cache, verify backend running |
| No results | Check hostel name spelling (case-insensitive) |

## 📈 Future Enhancements

- User reviews & ratings
- Favorite hostels
- Booking integration
- Mobile app
- Advanced filters (WiFi, amenities, etc.)

## 📄 License

MIT License - feel free to use this project!

## 🤝 Contributing

Pull requests welcome! Feel free to contribute improvements.

---

**Created by:** Shivansh Bansal | [GitHub](https://github.com/YOUR_USERNAME)
