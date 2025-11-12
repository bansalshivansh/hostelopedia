import { RouterProvider } from "react-router-dom";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogoSvg } from "./logo";


let recommedHostel = null;

// Category definitions for filtering
const PRICE_RANGES = [
  { id: "budget", label: "Budget (0-150k)" },
  { id: "mid", label: "Mid-range (150k-250k)" },
  { id: "premium", label: "Premium (250k+)" }
];

const LOCATIONS = [
  { id: "bidholi", label: "Bidholi" },
  { id: "kandoli", label: "Kandoli" }
];

const GENDERS = [
  { id: "boys", label: "Boys Hostels" },
  { id: "girls", label: "Girls Hostels" }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Check if at least one filter or hostel name is provided
    if (!searchInput.trim() && !selectedPrice && !selectedLocation && !selectedGender) {
      alert("Please either enter a hostel name or select at least one filter (Price, Location, or Gender)");
      return;
    }

    try {
      // Use environment variable for backend URL, fallback to localhost
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const backendUrl = new URL(`${apiBase}/search`);
      
      // Only add hostel name if provided
      if (searchInput.trim()) {
        backendUrl.searchParams.set("hostelName", searchInput.trim());
      }
      
      // Add filter parameters if selected
      if (selectedPrice) {
        backendUrl.searchParams.set("priceRange", selectedPrice);
      }
      if (selectedLocation) {
        backendUrl.searchParams.set("location", selectedLocation);
      }
      if (selectedGender) {
        backendUrl.searchParams.set("gender", selectedGender);
      }

      const response = await fetch(backendUrl, { method: "POST" });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseInJson = await response.json();
      recommedHostel = responseInJson;
      navigate("/products");
    } catch (error) {
      console.error("Search error:", error);
      alert("Error searching hostels: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      <main className="bg-blue-300 min-h-screen">
        <div className="min-h-[600px] flex items-center justify-center">
          <div className="flex flex-col gap-y-6">
            {/* Logo */}
            <div className="grid place-items-center">
              <LogoSvg />
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col gap-y-5">
              <div className="flex gap-x-3">
                <input
                  type="text"
                  placeholder="Hostel name (optional - e.g., Scholar Park)..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-[500px] px-3 py-2 rounded-md"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition font-semibold"
                >
                  Search
                </button>
              </div>

              {/* Price Range Filter */}
              <div className="flex flex-col gap-y-2">
                <p className="text-white font-semibold">💰 Price Range (optional):</p>
                <div className="flex gap-3 flex-wrap">
                  {PRICE_RANGES.map((price) => (
                    <button
                      key={price.id}
                      type="button"
                      onClick={() => setSelectedPrice(selectedPrice === price.id ? null : price.id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition transform ${
                        selectedPrice === price.id
                          ? "bg-yellow-400 text-black ring-4 ring-white"
                          : "bg-yellow-300 text-black hover:bg-yellow-400"
                      }`}
                    >
                      {price.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="flex flex-col gap-y-2">
                <p className="text-white font-semibold">📍 Location (optional):</p>
                <div className="flex gap-3 flex-wrap">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedLocation(selectedLocation === loc.id ? null : loc.id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition transform ${
                        selectedLocation === loc.id
                          ? "bg-green-400 text-black ring-4 ring-white"
                          : "bg-green-300 text-black hover:bg-green-400"
                      }`}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div className="flex flex-col gap-y-2">
                <p className="text-white font-semibold">👥 Gender (optional):</p>
                <div className="flex gap-3 flex-wrap">
                  {GENDERS.map((gender) => (
                    <button
                      key={gender.id}
                      type="button"
                      onClick={() => setSelectedGender(selectedGender === gender.id ? null : gender.id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition transform ${
                        selectedGender === gender.id
                          ? "bg-purple-400 text-white ring-4 ring-white"
                          : "bg-purple-300 text-white hover:bg-purple-400"
                      }`}
                    >
                      {gender.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Filters Display */}
              {(selectedPrice || selectedLocation || selectedGender) && (
                <div className="mt-2 bg-white bg-opacity-20 px-4 py-3 rounded-lg text-white font-semibold">
                  ✓ Filters Applied:
                  {selectedPrice && ` ${PRICE_RANGES.find(p => p.id === selectedPrice)?.label}`}
                  {selectedLocation && ` • ${LOCATIONS.find(l => l.id === selectedLocation)?.label}`}
                  {selectedGender && ` • ${GENDERS.find(g => g.id === selectedGender)?.label}`}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="flex justify-between bg-opacity-80 bg-blue-400 p-4">
          <Features text={"24x7"} />
          <Features text={"No Brokerage"} />
          <Features text={"Verified Accounts"} />
        </div>
      </main>

      <section className="px-4 py-8">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-gray-700 mt-4">
          Our hostel recommendation system uses advanced AI algorithms to help you find the perfect hostel based on your preferences, ratings, and location. Filter by price, location, and gender to narrow down your options!
        </p>
      </section>
    </div>
  );
};

const Features = ({ text }) => {
  return (
    <h2 className="border-2 border-black rounded-md  text-black bg-orange-300 w-40 grid place-items-center h-[50px]">
      {text}
    </h2>
  );
};


const Products = () => {
  return (
    <div className="flex flex-col min-h-screen bg-pink-200 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Recommended Hostels</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {recommedHostel && recommedHostel.length > 0 ? (
          recommedHostel.map((hostel, idx) => (
            <ProductCard
              key={idx}
              gender={hostel.gender}
              price={hostel.price}
              location={hostel.location}
              rating={hostel.rating}
              hostelName={hostel.hostelName}
            />
          ))
        ) : (
          <p className="text-2xl text-gray-600">No hostels found. Try another search.</p>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ gender, price, location, rating, hostelName }) => {
  return (
    <div className="p-4 border-2 border-blue-500 rounded-lg w-[300px] bg-white shadow-lg hover:shadow-xl transition">
      <div className="flex gap-x-2 justify-between">
        <div>
          <h1 className="font-bold text-lg">{hostelName}</h1>
          <h3 className="text-gray-600">Gender: {gender}</h3>
          <p className="text-gray-600">Price: ₹{price}</p>
          <p className="text-gray-600">Location: {location}</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-yellow-100 p-2 rounded">
          <p className="text-xs text-gray-600">Rating</p>
          <h1 className="text-3xl font-bold text-yellow-600">{rating}</h1>
          <p className="text-yellow-500">⭐</p>
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
