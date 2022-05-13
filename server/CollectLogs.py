import re, pandas as pd, xml.etree.ElementTree as ET 
from math import radians, cos, sin, asin, sqrt 
from IPython.display import display 
import folium 
from folium import FeatureGroup, LayerControl, Map, Marker 





#tree = ET.parse(r'..\data\Kismet-20220512-16-52-28-1.netxml')

df = pd.read_csv(r'..\data\Kismet-20220512-16-52-28-1.netxml', delimiter=',')
print(df)
#root = tree.getroot()

#print(root)
