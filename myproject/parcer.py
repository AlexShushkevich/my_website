import requests
from bs4 import BeautifulSoup

response = requests.get('https://luki.by/catalog/lyuki-pod-plitku/lyuki_evrostandart/')
luki_data = response.text
luki_items = {}
to_parse = BeautifulSoup(luki_data, 'html.parser')
for elem in to_parse.find_all('div', class_='catalog-list__info flex-1 flexbox flexbox--direction-row'):
    print(f'-{elem}')