import requests
from urllib.parse import unquote
from bs4 import BeautifulSoup
import requests
import json
import re
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
# import similar_products

BASE_URL = "https://www.flipkart.com"
urls = []

def get_google_search_url(query):
    base_url = "https://www.google.com/search?q="
    # params = {"q": query}
    params = query.replace(" ", "+")
    url = base_url + params
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
    
    # response = requests.get(base_url, params=params, headers=headers)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # print(soup)
    # Find the first search result link
    search_results = soup.find_all("a")
    # for i in search_results:
    #     print(i)
    for link in search_results:
        url = link.get('href')
        # urls.append(url)
        # print(url)
        if url.startswith("/url?q=http"):
           # Decode the URL
           url_name = url.split("/url?q=")[1]
           decoded_url = unquote(url_name)
           # print(decoded_url)
           # url_name = url.split("/url?esrc=")[1].split("U&url=")[1].split("&ved")[0]
           if "www.flipkart.com" in decoded_url:
               # urls.append(decoded_url)
               continue
           elif "www.croma.com" in url_name:
               # continue
               urls.append(url_name)
    
    return None

# query = "flipkart Samsung Galaxy A14 5G"
# query = "croma FUJIFILM Instax Treasure Box Mini 11 Instant Camera  (Purple)"
# get_google_search_url(query)

# print(urls)
# for i in urls:
#     print(i)
# print("URL from Google search results:", url)


def extract_product_details_croma(url):
    # print(url)
    # Your code to fetch HTML content from the URL and extract <script> tags
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
        # "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0"}

    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # print(soup)
        scripts = soup.find_all('script', type='application/ld+json')
        # Iterate through <script> tags
        # print(scripts)
        for script in scripts:
            try:
                # Attempt to load JSON data from the <script> tag contents
                script_data = json.loads(''.join(script.contents))

                # Check if the loaded data is of type "Product"
                if script_data.get("@type") == "Product":
                    name = script_data.get('name', 'N/A')
                    price = script_data['offers'].get('price', 'N/A')
                    image = script_data.get('image', 'N/A')[0]
                    # Extract the rating value from the first product object
                    # Extracting the required information
                    rating_value = script_data['review']['reviewRating']['ratingValue']
                    review_count = script_data['review']['reviewCount']
                    brand_name = script_data['brand']['name']
                    rating_value = (int(script_data['review']['reviewRating']['bestRating']) + int(script_data['review']['reviewRating']['worstRating']))/2
                    product_details = {'name': name, 'price': price, 'image': image, 'rating': rating_value, "brand_name": brand_name}
                    return product_details
            except json.JSONDecodeError:
                # Handle JSON decoding errors (truncated data)
                # print("JSON decoding error. Data may be truncated.")
                # Attempt to recover from truncated data

                # Check if the last character is '}' to see if data is truncated
                script_contents = ''.join(script.contents)
                # print(script_contents)
                if script_contents.strip().endswith('}'):
                    # If the last character is '}', it indicates the data is likely complete
                    # Retry loading JSON data
                    try:
                        script_data = json.loads(script_contents)
                        if script_data.get("@type") == "Product":
                            name = script_data.get('name', 'N/A')
                            price = script_data['offers'].get('price', 'N/A')
                            image = script_data.get('image', 'N/A')[0]
                            # Extract the rating value from the first product object
                            # rating_value = (script_contents['review']['reviewRating']['bestRating'] + script_contents['review']['reviewRating']['worstRating'])/2
                            # review_count = script_data['review']['reviewCount']
                            brand_name = script_data['brand']['name']
                            rating_value = (int(script_data['review']['reviewRating']['bestRating']) + int(script_data['review']['reviewRating']['worstRating']))/2
                            product_details = {'name': name, 'price': price, 'image': image, 'rating': rating_value, "brand_name": brand_name}
                            return product_details
                            # return script_data
                    except json.JSONDecodeError:
                        # Remove the extra '}' at the end, if present
                        # print(script_contents)
                        if script_contents.strip().endswith('}'):
                            script_contents = script_contents.strip()
                            script_contents = script_contents[:-1]
                            # print(type(script_contents))
                        # print("---------------------------------")
                        # print(script_contents)
                        # Sanitize the JSON string
                        script_contents = script_contents.replace('<p>', '').replace('</p>', '').replace('<br />', '').replace('&nbsp;', '')
                        # Assuming json_string contains the problematic JSON string
                        # Remove non-printable characters using regular expressions
                        script_contents = re.sub(r'[^\x20-\x7E]', '', script_contents)
                        try:
                            script_contents = json.loads(script_contents)
                        except:
                            pass
                        # print(type(script_contents))
                        if script_contents.get("@type") == "Product":
                            name = script_contents.get('name', 'N/A')
                            price = script_contents['offers'].get('price', 'N/A')
                            image = script_contents.get('image', 'N/A')[0]
                            # Extract the rating value from the first product object
                            rating_value = (int(script_contents['review']['reviewRating']['bestRating']) + int(script_contents['review']['reviewRating']['worstRating']))/2
                            # review_count = script_contents['review']['reviewCount']
                            brand_name = script_contents['brand']['name']
                            product_details = {'name': name, 'price': price, 'image': image, 'rating': rating_value, "brand_name": brand_name}
                            return product_details
                            # return script_data
                        # print("Failed to recover from truncated data.")
                else:
                    continue
                    # print("Data is still truncated. Unable to recover.")

    # If no valid product data is found
    return None

def extract_product_details_jiomart(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        print(soup)
    return

def extract_product_details_flipkart(url):
    # print(url)
    # Your code to fetch HTML content from the URL and extract <script> tags
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
        # "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0"}

    response = requests.get(url, headers=headers)
    # print(response)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        scripts = soup.find_all('script', type='application/ld+json')
        # Iterate through <script> tags
        # print(scripts)
        for script in scripts:
            # print(script)
            # Extract content of the script tag
            script_content = script.string

            # Parse script content as JSON
            try:
                data = json.loads(script_content)
            except json.JSONDecodeError:
                continue

            # Check if the parsed data is a list or not
            if isinstance(data, list):
                # Traverse through the list
                for item in data:
                    # Extract name, price, and image URL if available
                    if '@type' in item:
                        # return item
                        if item['@type'] == 'Product':
                            name = item.get('name', 'N/A')
                            price = item['offers'].get('price', 'N/A')
                            image = item.get('image', 'N/A')
                            # Extract the rating value from the first product object
                            rating_value = item['aggregateRating']['ratingValue']
                            review_count = item['aggregateRating']['reviewCount']
                            brand_name = item['brand']['name']
                            product_details = {'name': name, 'price': price, 'image': image, 'rating': rating_value, 'brand_Name': brand_name}
                            return product_details
                            # price = item.
                            # print("Name:", item.get('name', 'N/A'))
                            # if 'offers' in item:
                            #     offers = item['offers']
                            #     print("Price:", offers.get('price', 'N/A'))
                            # print("Image:", item.get('image', 'N/A'))
            else:
                # Extract name, price, and image URL from single item
                if '@type' in data:
                    if data['@type'] == 'Product':
                        name = data.get('name', 'N/A')
                        price = data['offers'].get('price', 'N/A')
                        image = data.get('image', 'N/A')
                        # Extract the rating value from the first product object
                        rating_value = data[0]['aggregateRating']['ratingValue']
                        # Extract the review count from the first product object
                        review_count = data[0]['aggregateRating']['reviewCount']
                        # Extract the brand name from the first product object
                        brand_name = data[0]['brand']['name']
                        product_details = {'name': name, 'price': price, 'image': image, 'rating': rating_value, 'Brand Name': brand_name}
                        return product_details
                        # print("Name:", data.get('name', 'N/A'))
                        # if 'offers' in data:
                        #     offers = data['offers']
                        #     print("Price:", offers.get('price', 'N/A'))
                        # print("Image:", data.get('image', 'N/A'))
                        # print()

    # If no valid product data is found
    return None

# product_details = extract_product_details_croma(urls[0])
# product_details = extract_product_details_flipkart(urls[1])
# print(product_details)

# We will call this function to get the product details from different website
def get_product_details_all_website(product):
    website_names = ['croma']
    query = product["title"] 
    # print(query)
    for i in website_names:
        i = i + query
        get_google_search_url(i)
        for i in urls:
            croma_product_details = extract_product_details_croma(i)
            if croma_product_details is not None:
                croma_product_details["website_url"] = i
                break
        flipkart_product_details = extract_product_details_flipkart(product["website_url"])
        flipkart_product_details["website_url"] = str(product["website_url"])
        # print(croma_product_details)
        # print(flipkart_product_details)
        product_details = [flipkart_product_details, croma_product_details]
        # print(product_details)
        return product_details

# Example 
product = {'title': 'FUJIFILM Instax Treasure Box Mini 11 Instant Camera', 'price': '₹6,499', 'imgage_url': 'https://rukminim2.flixcart.com/image/312/312/kp2y2kw0/instant-camera/3/z/r/treasure-box-mini-11-instax-mini-11-fujifilm-original-imag3efzmkzvretx.jpeg?q=70', 'website_url': 'https://www.flipkart.com/fujifilm-instax-treasure-box-mini-11-instant-camera/p/itme77e0804bcc36?pid=INAG37FNY2WHY9XG&lid=LSTINAG37FNY2WHY9XGLEXRCE&marketplace=FLIPKART&q=camera&store=jek%2Fp31&srno=s_1_1&otracker=search&fm=organic&iid=f844a016-6a36-44ae-b34b-651b98c02329.INAG37FNY2WHY9XG.SEARCH&ppt=None&ppn=None&ssid=u74fs3w0og0000001712161085303&qH=dd6d2dcc679d12b9'}

def scrap_products_flipkart(url):
    # print(url)
    products_details = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
    response = requests.get(url.encode('utf-8'), headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        # print(soup)
        products = soup.find_all("div", {'class': ["_1xHGtK", "_373qXS", "_4ddWXP", "_2kHMtA"]})
        # print(products)
        for product in products:
            # print(product)
            try:
                try:
                    title = product.find('div', class_="_4rR01T").text
                except:
                    title = product.find('a', {'class': ["IRpwTa", "s1Q9rs"]}).get('title')
                # print(title)
                price = product.find('div', {'class' : ["_30jeq3", "_1_WHN1"]}).text
                img_url = product.find('img', {'class' : ["_396cs4", "_2r_T1I"]}).get('src')
                website_url = BASE_URL + product.find('a', {'class' : ["_2rpwqI", "_1fQZEK", "IRpwTa", "s1Q9rs"]}).get('href')
            except:
                continue
            product_details  = {"title":title, "price": price, "imgage_url": img_url, 'website_url': website_url}
            # print(product_details)
            products_details.append(product_details)
        return products_details
    return None

def similar_top_result_flipkart(product):
    title = product["title"]
    # title = "noise twist go smartwatch with bluetooth calling 35mm tft display ip67 water resistant jet black strap"
    # base_url_croma = "https://www.croma.com/" 

    # Encode the search query
    keyword = title.replace(" ", "-")
    url = f"https://www.flipkart.com/search?q={keyword}"
    # url = base_url_croma + title.replace(",", "%2").replace(" ", "-") #+ "%3Arelevance&text=" + title.replace(",", "%2").replace(" ", "%20") # count = 0

    list_products = scrap_products_flipkart(url)
    # print(list_products)
    corpus = []
    list_index = {}
    corpus.append(title)
    index = 0
    for i in list_products:
        tit = i['title']
        corpus.append(tit)
        list_index[tit] = index
        index = index + 1

    tfidf = TfidfVectorizer(stop_words="english")

    result = tfidf.fit_transform(corpus)

   # Compute cosine similarity matrix
    cosine_sim_matrix = cosine_similarity(result, result)

    # Get the similarity scores for the 0th document
    similarity_scores = cosine_sim_matrix[0]
    
    # Create a list of document indices sorted by their similarity scores (excluding the 0th document itself)
    sorted_indices = np.argsort(similarity_scores)[::-1][1:]
    
    # Sort the documents according to their similarity to the 0th document
    sorted_documents = [corpus[i] for i in sorted_indices]

    # print(corpus)
    # Sort the documents according to their similarity to the 0th document
    sorted_documents = [corpus[i] for i in sorted_indices]

    final_titles = []
    print(sorted_documents)
    for i in range(10):
        final_titles.append(sorted_documents[i])

    final_product = []
    for i in final_titles:
        final_product.append(list_products[list_index[i]])
    return final_product

def all_types_of_products(product):
    product_dict = {}
    product_dict["product"] = get_product_details_all_website(product)
    product_dict["similar_product"] = similar_top_result_flipkart(product) 
    return product_dict
# print(get_product_details_all_website(product))
# extract_product_details_jiomart()
# dict1 = all_types_of_products(product)
# print(dict1)

    
