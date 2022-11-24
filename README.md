![waving](https://capsule-render.vercel.app/api?type=waving&height=200&text=WarFlying&fontAlign=80&fontAlignY=40&color=gradient)

## Goal of this project
Being able to view a .kismet file from a kismet scan on a map. Each wifi are displayed on the map with markers and can be clicked to display the network informations. 
The user is also able to upload his own kismet scans on the website and can contribute to the map.

## Use of this project
For our New Technologies class at College Champlain Lennoxville, we had to chose a project to do over the semester, we chose to do a WarFlying drone that could scan networks
and upload its findings to a website that could display the networks that were scanned. Each network can be clicked to display its information such as its SSID, Mac Address,
WPA version, its encryption method, the number of packets seen and more. The networks can also be filtered by their encryption method to only display on the map the networks
that have the same encryption method that is selected. A specific network can also be searched either by its SSID or by its Mac Address. A Kismet scan can also be uploaded on
the website to create new markers with the networks that were added.

### Built With

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [![Express][Express.com]][Express-url]
* [![Python][Python.com]][Python-url]
* [![MongoDB][MongoDB.com]][MongoDB-url]
## Installation

**SERVER SIDE**
````
cd Wardriving/server/
npm install
npm start
````
**CLIENT SIDE**
````
cd Wardriving/client/
npm install
npm start
````

## Contributors
Tom Gaillard and Sacha Paquette


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Express-url]: http://expressjs.com/
[Express.com]: https://img.shields.io/badge/Express-0769AD?style=for-the-badge&logo=Express&logoColor=red
[Python.com]: https://img.shields.io/badge/Python-20232A?style=for-the-badge&logo=Python&logoColor=green
[Python-url]: https://www.python.org/
[MongoDB.com]: https://img.shields.io/badge/MongoDB-563D7C?style=for-the-badge&logo=MongoDB&logoColor=green
[MongoDB-url]: https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=bing&utm_campaign=search_bs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-ca_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=415204512&adgroup=1212761794897237&msclkid=adad715ac24012a413c012242948c715
