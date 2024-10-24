# A Comprehensive E-Commerce Comparison Application

This project aims to help users compare various attributes such as prices, ratings, and services across multiple e-commerce websites for the same product. The primary objective is to enable users to make informed purchasing decisions by choosing the e-commerce platform that offers the best combination of price, rating, and other relevant services.

## Key Features of the Application:
**1. Product Search:**

- Users start by entering the name of a product into the search bar.
- Based on the input, the system fetches and displays a list of top search results from multiple e-commerce websites. This ensures that users are presented with options from various online retailers.

**2. Comparison of Product Attributes**:

- After the search results are displayed, the system provides a Comparison Button next to each product.
- When the user clicks the comparison button, the application compares the selected product across different e-commerce platforms.
- The comparison focuses on key attributes such as:
    - **Prices**: The price of the product on different websites.
    - **Ratings**: The average customer rating or reviews for the product on each platform.
- This feature enables users to see all the important data in one place, making it easier for them to choose where to buy the product based on their priorities (price, rating, or services).

**3. Similar Product Recommendations:**

- Recognizing that users may have budget constraints, the system includes a Similar Products feature.
- If the user finds that the price of the product is too high, they can click on the "Similar Products" button, which will display recommendations for alternative products that are similar to the original one but may have a lower price.
- This feature enhances the user experience by offering cheaper alternatives, ensuring that users don’t have to manually search for similar products across multiple platforms.


## Detailed Working of the System:
**1. Product Search Functionality:**

- **User Input**: When the user types a product name in the search bar, the system processes this input.
- **Web Scraping**: The system scrapes multiple e-commerce websites (such as Flipkart etc.) in real-time to gather product data. It pulls details such as product titles, prices, ratings, and other attributes from these sites.
- **Displaying Search Results**: The system displays the search results, including the product title, price, rating, and the e-commerce platform where it is available. This gives users a clear idea of the different options available for the same product across platforms.

**2. Comparison Feature:**

- **Comparison Trigger**: Once the search results are displayed, each product has a "Compare" button.
- **Comparison Process**:
    - When the user clicks this button, the system pulls and aggregates data from different websites to show a side-by-side comparison of key product attributes.
    - This comparison helps users evaluate the product across websites, focusing on price, customer ratings.
- **User-Friendly Interface**: The comparison is shown in a table or grid format, making it easy for the user to visually compare and make a decision on which platform to purchase from.

**3. Similar Product Feature:**

- **User Requirement**: If the user decides that the original product is too expensive, they can click on the Similar Products button.

## Technical Implementation:
### Web Scraping:

- The core data collection mechanism involves scraping websites using tools like Beautiful Soup and Selenium to gather product details in real-time.
- The system scrapes structured data (product name, price, rating) from the e-commerce sites, ensuring that the data is accurate and up-to-date.

### Frontend (User Interface):

- The user interface (UI) is built using React.js, making the platform responsive and interactive.
- The UI displays search results and comparison data in an intuitive and user-friendly manner, allowing seamless navigation between product searches, comparisons, and similar product recommendations.

### Backend:

- The backend server is built using Node.js (Express.js) to handle search queries, manage scraping tasks, and serve comparison data.
- It processes the search query, triggers the scraping processes, and manages communication between the frontend and backend.

### Database:

- MongoDB is used to store authentication data of users

### Similarity
- To find the similarity we used the TFIDF vectorization to convert the words into vector and cosing similarity to find the similarity.

## Function requirements
**1. User Registration and Authentication:**
	- Users should be able to create accounts.
	- Secure authentication mechanisms to ensure user privacy and data security.

**2. Data Collection:**
	- Ability to fetch and collect data from various e-commerce websites.
	- Realtime scrap data according to the user search

**3. Item Comparison:**
	- Users can select and compare specific items from different e-commerce platforms.
	- Display detailed specifications, prices, and other relevant information for each item.
	- Implement NLP module for deciding how we can compare products

**4. Search and Filter:**
	- A robust search functionality allowing users to find specific items.
	- Filters to narrow down options based on various criteria (price range, brand, ratings, etc.).

**5. Bookmarking or Wishlist:**
    - Allow users to save and compare items later.
    - Implement a wishlist feature for users to save preferred items.


## Execution
- Install required modules
```
    npm install
```

- start mongodb-compass
```
    mongodb-compass
```

- Install necessary libraries for web scraping
```
    pip install beautifulsoup4 bs4 requests
```

- Start web server
```
    npm run both
```

## Future enhancement 
1. In store details related to purticular product
- For this we have to access location or details related to local area
- Then we will show the near by shop details like price etc
