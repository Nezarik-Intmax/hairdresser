sudo chmod -R 777 ./
git clone https://github.com/Nezarik-Intmax/hairdresser.git
python3.13 -m venv venv
source venv/bin/activate
cd hairdresser/
pip install django djangorestframework drf_yasg
pip install -r ./requirements.txt 
python3 manage.py makemigrations
python3 manage.py migrate
mkdir static
python3 manage.py collectstatic
pip install gunicorn
sudo vim /etc/systemd/system/gunicorn.socket

[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn/gunicorn.sock

[Install]
WantedBy=sockets.target

sudo vim /etc/systemd/system/gunicorn.service

[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=makci
Group=www-data
WorkingDirectory=/var/www/hairdresser.smartsitedevelop.ru/hairdresser/hairdresser/
RuntimeDirectory=gunicorn
ExecStart=/var/www/hairdresser.smartsitedevelop.ru/venv/bin/gunicorn \
    --bind unix:/run/gunicorn/gunicorn.sock \
    --workers 3 \
    hairdresser.wsgi:application

[Install]
WantedBy=multi-user.target








sudo systemctl stop gunicorn
sudo -u root /var/www/hairdresser.smartsitedevelop.ru/venv/bin/gunicorn \
    --bind unix:/run/gunicorn.sock \
    hairdresser.wsgi:application


deactivate
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python3.13


ln -s /etc/nginx/sites-available/hairdresser.smartsitedevelop.ru /etc/nginx/sites-enabled/hairdresser.smartsitedevelop.ru

nginx -t
service nginx reload
sudo chmod -R 777 "/var/www/work.smartsitedevelop.ru"


sudo systemctl daemon-reload
sudo service gunicorn restart
sudo service gunicorn status
sudo nginx -t
sudo service nginx reload
ls -la /run/gunicorn.sock

sudo chmod -R 777 /run/gunicorn.sock
