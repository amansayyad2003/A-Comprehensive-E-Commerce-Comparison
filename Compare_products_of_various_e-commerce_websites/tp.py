import requests
import base64

def url_to_base64(url):
    try:
        # Get the image from the URL
        response = requests.get(url)
        # Convert the image to base64 format
        base64_image = base64.b64encode(response.content)
        # Construct the formatted string
        formatted_string = "data:image/jpeg;base64," + base64_image.decode('utf-8')
        return formatted_string
    except Exception as e:
        print("Error:", e)
        return None

# Example usage
url = "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/l/r/k/-original-imagwds6svytn9g2.jpeg?q=70"
formatted_base64_image = url_to_base64(url)
if formatted_base64_image:
    print("Base64 encoded image:", formatted_base64_image)
