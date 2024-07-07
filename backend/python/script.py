import requests
from bs4 import BeautifulSoup
import sys
import json

base_url = "https://www.flipkart.com"

def generate_indeed_url(search_query):
    search_query_formated = search_query.replace(" ", "-")
    url = f"https://www.flipkart.com/search?q={search_query_formated}"
    return url

def extract(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        # print(f"Original type of soup = {type(soup)}")
        soup = BeautifulSoup(response.content, "html.parser").encode("utf-8")
        # print(f"After encoding type of soup = {type(soup)}")
        decoded_data = soup.decode('utf-8')

        new_soup = BeautifulSoup(decoded_data, 'html.parser')

        # print(f"After restoring soup = {type(new_soup)}")
 
        return new_soup
        # return soup.encode("utf-8")
    else:
        print(f"Failed to fetch data from URL: {url}", file=sys.stderr)
        return None

def transform(soup):
    products_details = []
    try:
        # print(f"Inside tranform Type of soup = {type(soup)}")
        products = soup.find_all("div", {'class':["cPHDOP", "col-12-12"]})
        for product in products:
            try:
                title = product.find('div', class_="KzDlHZ").text
                img_url = product.find('img', class_="DByuf4").get('src')
                price = product.find('div', {'class': ["Nx9bqj", "_4b5DiR"]}).text.replace("₹","").replace(",","")
                website_url = base_url + product.find('a', {'class': ['CGtC98']}).get('href')
                product_details = {"title": title, "price": price, "image_url": img_url, 'website_url': website_url}
                products_details.append(product_details)
            except Exception as e:
                continue
                # print(f"Error extracting product details: {e}", file=sys.stderr)
    except Exception as e:
        print(f"Error transforming data: {e}", file=sys.stderr)
    return products_details

def get_all_product(search_query):
    url = generate_indeed_url(search_query)
    soup = extract(url)
    if soup:
        products_details = transform(soup)
        return products_details
    else:
        return []



if __name__ == "__main__":
    # product_details = get_all_product("Smartphone") # list
    a =sys.argv[1]
    # print(a)
    product_details = get_all_product(a) # list


    
        

    print((product_details),end="")
