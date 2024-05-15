from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import requests
from bs4 import BeautifulSoup

base_url = "https://www.flipkart.com"

def scrap_products_flipkart(url):
    # print(url)
    products_details = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
    response = requests.get(url.encode('utf-8'), headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        # print(soup)
        # products = soup.find_all("div", {'class': ["_1xHGtK", "_373qXS", "_4ddWXP", "_2kHMtA"]})
        products = soup.find_all("div", {'class':["cPHDOP", "col-12-12"]})
        # print(products)
        for product in products:
            # print(product)
            try:
                    # title = product.find('div', class_="_4rR01T").text
            # try:
                title = product.find('div', class_="KzDlHZ").text
            # except:
                # title = None
            # print(title)
            # price = product.find('div', {'class' : ["_30jeq3", "_1_WHN1"]}).text
            # try:
                price = product.find('div', {'class': ["Nx9bqj", "_4b5DiR"]}).text.replace("₹","").replace(",","")
            # except:
                # price = None
            # img_url = product.find('img', {'class' : ["_396cs4", "_2r_T1I"]}).get('src')
            # try:
                img_url = product.find('img', class_="DByuf4").get('src')
            # except:
                # img_url = None
            # website_url = BASE_URL + product.find('a', {'class' : ["_2rpwqI", "_1fQZEK", "IRpwTa", "s1Q9rs"]}).get('href')
            # try:
                website_url = base_url + product.find('a', {'class': ['CGtC98']}).get('href')
            # except:
                # website_url = None
                product_details  = {"title":title, "price": price, "imgage_url": img_url, 'website_url': website_url}
                # print(product_details)
                products_details.append(product_details)
            except:
                continue
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

    # print(url)
    list_products = scrap_products_flipkart(url)
    # return 0
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
    for i in range(10):
        try:
            final_titles.append(sorted_documents[i])
        except:
            continue

    final_product = []
    for i in final_titles:
        try:
            final_product.append(list_products[list_index[i]])
        except:
            continue
    return final_product


product = {'title': 'FUJIFILM Instax Treasure Box Mini 11 Instant Camera', 'price': '₹6,499', 'imgage_url': 'https://rukminim2.flixcart.com/image/312/312/kp2y2kw0/instant-camera/3/z/r/treasure-box-mini-11-instax-mini-11-fujifilm-original-imag3efzmkzvretx.jpeg?q=70', 'website_url': 'https://www.flipkart.com/fujifilm-instax-treasure-box-mini-11-instant-camera/p/itme77e0804bcc36?pid=INAG37FNY2WHY9XG&lid=LSTINAG37FNY2WHY9XGLEXRCE&marketplace=FLIPKART&q=camera&store=jek%2Fp31&srno=s_1_1&otracker=search&fm=organic&iid=f844a016-6a36-44ae-b34b-651b98c02329.INAG37FNY2WHY9XG.SEARCH&ppt=None&ppn=None&ssid=u74fs3w0og0000001712161085303&qH=dd6d2dcc679d12b9'}

# print(product['title'])
# var  = similar_top_result_flipkart(product)
# print(var)
# for i in var:
#     print(i)
    
