import numpy as np
import pandas as pd
import sys

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

kuku = pd.read_csv('./main_database.csv', index_col=False)

# Convert Yearly_Hostel_Fees to numeric
kuku['Yearly_Hostel_Fees'] = pd.to_numeric(kuku['Yearly_Hostel_Fees'], errors='coerce')

# Calculate metrics per hostel
num_rating_df = kuku.groupby('Hostel_Name').count()['Hostel_Rating_Simple'].reset_index()
num_rating_df.rename(columns={'Hostel_Rating_Simple':'num_ratings'},inplace=True)

avg_rating_df = kuku.groupby('Hostel_Name')['Hostel_Rating_Simple'].mean().reset_index()
avg_rating_df.rename(columns={'Hostel_Rating_Simple':'avg_rating'},inplace=True)

popular_df = kuku.merge(avg_rating_df,on='Hostel_Name')
yoyo=popular_df.merge(num_rating_df,on='Hostel_Name')
yoyo = yoyo[yoyo['num_ratings']>=2].sort_values('avg_rating',ascending=False)

# Create tags for similarity calculation
yoyo['tags'] = yoyo['Hostel_Rating'] + yoyo['Hostel_Location'] + yoyo['Gender']
yoyo['tags'] = yoyo['tags'].apply(lambda x:x.lower())

cv = CountVectorizer(max_features=500,stop_words='english')
vector = cv.fit_transform(yoyo['tags']).toarray()
similarity = cosine_similarity(vector)

def recommend(Hostel_Name, price_range=None, location=None, gender=None):
    # Convert input to lowercase for case-insensitive search
    hostel_name_lower = Hostel_Name.lower().strip() if Hostel_Name else None
    
    # If hostel name is provided, find similar hostels to it
    if hostel_name_lower and hostel_name_lower != "null":
        # Find hostel with case-insensitive match
        matching_hostels = yoyo[yoyo['Hostel_Name'].str.lower() == hostel_name_lower]
        
        if len(matching_hostels) == 0:
            print(f"# Hostel '{Hostel_Name}' not found. Available hostels: {', '.join(yoyo['Hostel_Name'].unique()[:5])}")
            return
        
        hostel_index = matching_hostels.index[0]
        
        distances = similarity[hostel_index]
        hostel_list= sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])
        name = set()
        loc = list()
        avg = list()
        fee = list()
        
        # Get the reference hostel's gender (using index[0], not index[1])
        Gender = yoyo.loc[hostel_index].Gender
        
        for i in hostel_list:
            current_hostel = yoyo.iloc[i[0]]
            if current_hostel.Hostel_Name.lower() != hostel_name_lower and current_hostel.Gender == Gender:
                # Apply location filter if specified
                if location and current_hostel.Hostel_Location.lower() != location.lower():
                    continue
                # Apply price range filter if specified
                if price_range:
                    price = current_hostel.Yearly_Hostel_Fees
                    if pd.isna(price):
                        continue
                    if price_range == "budget" and price > 150000:
                        continue
                    elif price_range == "mid" and (price < 150000 or price > 250000):
                        continue
                    elif price_range == "premium" and price < 250000:
                        continue
                name.add(current_hostel.Hostel_Name)
        
        name = list(name)
        for i in name:
            # Get the hostel data using index[0]
            hostel_data = yoyo[yoyo['Hostel_Name'] == i].iloc[0]
            loc.append(hostel_data.Hostel_Location)
            avg.append(hostel_data.avg_rating)
            fee.append(hostel_data.Yearly_Hostel_Fees)

        # Output all recommendations (not limited to 3)
        for j in range(len(name)):
            fee_value = fee[j]
            # Handle NaN values
            if pd.isna(fee_value):
                fee_value = "N/A"
            print(f'{name[j]},{loc[j]},{avg[j]:.2f},{fee_value},{Gender}')
    
    else:
        # No hostel name provided - search by filters only
        # Get top-rated hostels matching the filters
        filtered_data = yoyo.copy()
        
        # Apply gender filter
        if gender:
            filtered_data = filtered_data[filtered_data['Gender'] == gender]
        
        # Apply location filter
        if location:
            filtered_data = filtered_data[filtered_data['Hostel_Location'].str.lower() == location.lower()]
        
        # Apply price range filter
        if price_range:
            if price_range == "budget":
                filtered_data = filtered_data[filtered_data['Yearly_Hostel_Fees'] <= 150000]
            elif price_range == "mid":
                filtered_data = filtered_data[(filtered_data['Yearly_Hostel_Fees'] >= 150000) & (filtered_data['Yearly_Hostel_Fees'] <= 250000)]
            elif price_range == "premium":
                filtered_data = filtered_data[filtered_data['Yearly_Hostel_Fees'] >= 250000]
        
        # Remove duplicates based on Hostel_Name and keep highest rated
        filtered_data = filtered_data.drop_duplicates(subset=['Hostel_Name'], keep='first')
        
        # Sort by rating and get all results
        filtered_data = filtered_data.sort_values('avg_rating', ascending=False)
        
        if len(filtered_data) == 0:
            print("# No hostels found matching your filters. Try changing your criteria.")
            return
        
        # Output all matching hostels
        for idx, row in filtered_data.iterrows():
            fee_value = row['Yearly_Hostel_Fees']
            if pd.isna(fee_value):
                fee_value = "N/A"
            print(f'{row["Hostel_Name"]},{row["Hostel_Location"]},{row["avg_rating"]:.2f},{fee_value},{row["Gender"]}')

# Parse command line arguments
hostel_name = sys.argv[1] if len(sys.argv) > 1 else None
price_range = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != "null" else None
location = sys.argv[3] if len(sys.argv) > 3 and sys.argv[3] != "null" else None
gender = sys.argv[4] if len(sys.argv) > 4 and sys.argv[4] != "null" else None

recommend(hostel_name, price_range=price_range, location=location, gender=gender)