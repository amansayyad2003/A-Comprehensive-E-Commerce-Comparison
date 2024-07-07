import requests
from bs4 import BeautifulSoup

products_details = []

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
        return soup
    else:
        print("Failed to fetch data")

def transform(soup):
        # Find the specific elements containing the data you're interested in
        # For example, if you're interested in product titles, you might do:
        products = soup.find_all("div", {'class': ["_1xHGtK", "_373qXS", "_4ddWXP", "_2kHMtA"]})
        # if len(products) == 0:
        #     products = soup.find_all("div", {'class': ["_1xHGtK", "_373qXS", "_4ddWXP"]})

        # print(products)
        for product in products:
            # print(product)
            try:
                try:
                    title = product.find('div', class_="_4rR01T").text
                except:
                    title = product.find('a', {'class': ["IRpwTa", "s1Q9rs"]}).get('title')
                # print(title)
                # img_url = product.find('img', class_="_396cs4").get('src')
                # price = product.find('div', {'class' : ["_30jeq3", "_1_WHN1"]}).text
                # website_url = base_url + product.find('a', {'class' : ['_2rpwqI', '_1fQZEK']}).get('href')
                img_url = product.find('img', {'class' : ["_396cs4", "_2r_T1I"]}).get('src')
                price = product.find('div', {'class' : ["_30jeq3", "_1_WHN1"]}).text
                website_url = base_url + product.find('a', {'class' : ["_2rpwqI", "_1fQZEK", "IRpwTa", "s1Q9rs"]}).get('href')
                # print(website_url)
            except:
               # try:
               # title = product.find('a', {'class': ["IRpwTa", "s1Q9rs"]}).get('title')
               # print(title)
                # except:
                continue
            product_details  = {"title":title, "price": price, "imgage_url": img_url, 'website_url': website_url}
            # print(product_details)
            products_details.append(product_details)


def get_all_product(search_query):
    url = generate_indeed_url(search_query)
    print(url)
    soup = extract(url)
    transform(soup)
    return products_details

product_details = get_all_product("Roadster Men's Zipper Solid Cardigan")
# print(product_details)
for i in product_details:
    print(i)
