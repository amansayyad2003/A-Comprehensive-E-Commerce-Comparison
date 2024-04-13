from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.flipkart.com"

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

        if (tit in list_index.keys()):
            continue
        list_index[tit] = index
        index = index + 1
        if tit == corpus[0]:
            continue
        corpus.append(tit)

    # print("List Products: ")
    # for i in list_products:
    #     print(i)
    # print("\nCorpus: ")
    # for i in corpus:
    #     print(i)
    # print("\nList Index: ")
    # for i in list_index:
    #     print(i)
    
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
    # sorted_documents = [corpus[i] for i in sorted_indices]

    final_titles = []
    count = 0
    index = 0
    while index < 10:
        try:
            if (similarity_scores[sorted_indices[index]] == 1):
                index = index + 1
                continue
            else:
                final_titles.append(sorted_documents[count])
                count = count + 1
                index = index + 1
        except:
            index = index + 1
    # for i in range(10):
    #     try:
    #         final_titles.append(sorted_documents[i])
    #     except:
            continue

    final_product = []
    for i in final_titles:
        try:
            final_product.append(list_products[list_index[i]])
        except:
            continue
    return final_product


product = {"title":"Canon EOS 200D II DSLR Camera EF-S18-55mm IS STM","price":"55990","image_url":"https://rukminim2.flixcart.com/image/312/312/juwzf680/dslr-camera/g/a/q/200d-ii-200d-ii-canon-original-imaffvrhzyqzayys.jpeg?q=70","website_url":"https://www.flipkart.com/canon-eos-200d-ii-dslr-camera-ef-s18-55mm-stm/p/itm5d6e44f7fd976?pid=DLLFFNVDYGQN9XCS&lid=LSTDLLFFNVDYGQN9XCSS1NNIP&marketplace=FLIPKART&q=camera&store=jek%2Fp31&srno=s_1_1&otracker=search&fm=organic&iid=63c6814b-f0d5-4f1d-8eb2-db618959f425.DLLFFNVDYGQN9XCS.SEARCH&ppt=None&ppn=None&ssid=8i9b5u2ugw0000001712455667549&qH=dd6d2dcc679d12b9"}


# print(product['title'])
# var  = similar_top_result_flipkart(product)
# for i in var:
#     print(i)
    
