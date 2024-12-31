from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import psycopg2
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
import json
import stripe
import pandas as pd
import math
import base64
import os

app = Flask(__name__)
CORS(app, origins=["*"])


stripe.api_key = os.getenv("STRIPE_API_KEY", "default_key")

#YOUR_DOMAIN = 'http://localhost:3000' # for local testing
YOUR_DOMAIN = 'https://ych-yoyo.com'
def getPriceId(productId):
    connection = mysql.connector.connect(
        host='database-1.c3nzflg9j5dh.us-east-1.rds.amazonaws.com',
        port=3306,
        user='admin',
        password='Aa990205qzr+++',
        database='LOOPINFINITY'
    )
    cursor = connection.cursor()
    try:
        query = "SELECT price_id FROM product_data WHERE id = %s"
        cursor.execute(query, (productId,))
        result = cursor.fetchone()
        price_id = result[0]
        #print(price_id)
        return price_id
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database error"}), 500
    finally:    
        cursor.close()
        connection.close()
    
######################################checkout############################################

# 固定国家运费数据
SHIPPING_RATES = {
'AU': [(0.001, 0.5, 64.0, 55.0), (0.501, 2.0, 64.0, 95.0), (2.001, 5.0, 64.0, 117.0), (5.001, 10.0, 64.0, 132.0), (10.001, 22.0, 64.0, 155.0)], 
'AE': [(0.001, 1.0, 58.0, 22.0), (1.001, 2.0, 71.0, 22.0), (2.001, 5.0, 75.0, 22.0), (5.001, 10.0, 71.0, 22.0), (10.001, 30.0, 78.0, 22.0)], 
'AO': [(0.001, 2.0, 123.0, 24.0)], 
'AT': [(0.001, 30.0, 119.0, 23.0)], 
'BE': [(0.001, 0.3, 132.0, 21.0), (0.301, 0.5, 132.0, 21.0), (0.501, 2.0, 132.0, 21.0), (2.001, 30.0, 121.0, 21.0)], 
'BG': [(0.001, 30.0, 101.0, 18.0)], 
'BH': [(0.001, 0.3, 65.0, 37.0), (0.301, 0.5, 76.0, 40.0), (0.501, 1.5, 96.0, 55.0), (1.501, 5.0, 111.0, 65.0)], 
'BR': [(0.001, 0.5, 85.0, 35.0), (0.501, 1.0, 85.0, 37.0), (1.001, 1.5, 85.0, 41.0), (1.501, 2.0, 85.0, 45.0), (2.001, 3.0, 85.0, 60.0)], 
'CA': [(0.001, 0.15, 89.0, 22.0), (0.151, 0.45, 90.0, 22.0), (0.451, 0.75, 93.0, 23.0), (0.751, 1.0, 94.0, 23.0), (1.001, 30.0, 94.0, 23.0)], 
'CH': [(0.001, 0.2, 147.0, 22.0), (0.201, 0.5, 136.0, 24.0), (0.501, 2.0, 136.0, 24.0), (2.001, 30.0, 141.0, 34.0)], 
'CL': [(0.001, 0.5, 96.0, 22.0), (0.501, 1.0, 101.0, 25.0), (1.001, 1.5, 106.0, 30.0), (1.501, 2.0, 106.0, 35.0)], 
'CO': [(0.001, 2.0, 135.0, 26.0), (2.001, 3.0, 135.0, 26.0)], 
'CY': [(0.001, 2.0, 191.0, 19.0), (2.001, 30.0, 191.0, 19.0)], 
'CZ': [(0.001, 2.0, 95.0, 20.0)], 
'DE': [(0.001, 0.3, 94.0, 20.0), (0.301, 30.0, 94.0, 23.0)], 
'DK': [(0.001, 2.0, 114.0, 24.0), (2.001, 30.0, 114.0, 24.0)], 
'EE': [(0.001, 2.0, 99.0, 20.0), (2.001, 30.0, 99.0, 20.0)], 
'ES': [(0.001, 30.0, 98.0, 18.0)], 
'FI': [(0.001, 20.0, 105.0, 26.0)], 
'FR': [(0.001, 0.5, 104.0, 19.0), (0.501, 30.0, 102.0, 23.0)], 
'GB': [(0.001, 1.0, 101.0, 16.0), (1.001, 20.0, 103.0, 16.0)], 
'GH': [(0.001, 2.0, 148.0, 22.0), (2.001, 10.0, 209.0, 22.0), (10.001, 30.0, 181.0, 22.0)], 
'GR': [(0.001, 30.0, 106.0, 18.0)], 
'HK': [(0.001, 2.0, 16.0, 22.0), (2.001, 20.0, 16.0, 40.0)], 
'HR': [(0.001, 30.0, 86.0, 23.0)], 
'HU': [(0.001, 30.0, 108.0, 21.0)], 
'IE': [(0.001, 20.0, 123.0, 23.0)], 
'IL': [(0.001, 0.5, 101.0, 21.0), (0.501, 5.0, 101.0, 23.0)], 
'IN': [(0.001, 2.0, 121.0, 13.0)], 
'IT': [(0.001, 1.0, 92.0, 25.0), (1.001, 30.0, 95.0, 25.0)], 
'JO': [(0.001, 0.5, 101.0, 37.0), (0.501, 2.0, 109.0, 30.0), (2.001, 5.0, 96.0, 25.0), (5.001, 15.0, 96.0, 25.0)], 
'KE': [(0.001, 2.0, 114.0, 22.0), (2.001, 10.0, 162.0, 22.0), (10.001, 30.0, 141.0, 22.0)], 
'KR': [(0.001, 2.0, 7.0, 17.0), (2.001, 20.0, 9.0, 17.0)], 
'LT': [(0.001, 2.0, 94.0, 20.0), (2.001, 30.0, 94.0, 20.0)], 
'LU': [(0.001, 2.0, 132.0, 26.0), (2.001, 30.0, 137.0, 26.0)], 
'LV': [(0.001, 2.0, 99.0, 20.0), (2.001, 30.0, 99.0, 20.0)], 
'MA': [(0.001, 2.0, 121.0, 48.0)], 
'MT': [(0.001, 2.0, 231.0, 20.0), (2.001, 30.0, 136.0, 25.0)], 
'MX': [(0.001, 0.5, 99.0, 18.0), (0.501, 1.0, 99.0, 19.0), (1.001, 5.0, 99.0, 20.0)], 
'NG': [(0.001, 2.0, 95.0, 27.0), (2.001, 10.0, 151.0, 27.0), (10.001, 30.0, 131.0, 27.0)], 
'NL': [(0.001, 0.3, 126.0, 21.0), (0.301, 0.5, 126.0, 21.0), (0.501, 2.0, 126.0, 21.0), (2.001, 30.0, 125.0, 21.0)], 
'NO': [(0.001, 5.0, 123.0, 20.0)], 
'NZ': [(0.001, 25.0, 84.0, 17.0)], 
'OM': [(0.001, 20.0, 94.0, 37.0)], 
'PE': [(0.001, 2.0, 186.0, 21.0)], 
'PH': [(0.001, 30.0, 91.0, 13.0)], 
'PL': [(0.001, 0.2, 101.0, 11.0), (0.201, 30.0, 96.0, 15.0)], 
'PR': [(0.001, 0.2, 124.0, 30.0), (0.201, 0.34, 124.0, 35.0), (0.341, 0.45, 124.0, 40.0), (0.451, 30.0, 129.0, 55.0)], 
'PT': [(0.001, 30.0, 109.0, 20.0)], 
'QA': [(0.001, 0.5, 66.0, 45.0), (0.501, 2.0, 77.0, 45.0), (2.001, 5.0, 77.0, 55.0), (5.001, 30.0, 82.0, 55.0)], 
'RA': [(0.001, 0.2, 124.0, 30.0), (0.201, 0.34, 124.0, 35.0), (0.341, 0.45, 124.0, 40.0), (0.451, 30.0, 129.0, 55.0)], 
'RO': [(0.001, 30.0, 106.0, 18.0)], 
'RW': [(0.001, 2.0, 111.0, 18.0)], 
'SA': [(0.001, 0.5, 67.0, 40.0), (0.501, 1.0, 68.0, 35.0), (1.001, 2.0, 68.0, 35.0), (2.001, 5.0, 68.0, 35.0), (5.001, 30.0, 68.0, 25.0)], 
'SE': [(0.001, 0.3, 105.0, 16.0), (0.301, 2.0, 95.0, 21.0), (2.001, 20.0, 98.0, 21.0)], 
'SG': [(0.001, 0.2, 62.0, 14.0), (0.201, 0.4, 61.0, 11.5), (0.401, 30.0, 52.0, 6.0)], 
'SI': [(0.001, 30.0, 86.0, 26.0)], 
'SK': [(0.001, 30.0, 114.0, 21.0)], 
'TH': [(0.001, 30.0, 29.0, 11.0)], 
'TR': [(0.001, 10.0, 104.0, 18.0)], 
'TW': [(0.001, 20.0, 39.0, 29.0)], 
'TZ': [(0.001, 2.0, 107.0, 21.0)], 
'UA': [(0.001, 0.15, 106.0, 20.0), (0.151, 30.0, 96.0, 12.0)], 
'UG': [(0.001, 2.0, 133.0, 22.0), (2.001, 10.0, 216.0, 22.0), (10.001, 30.0, 187.0, 22.0)], 
'US': [(0.001, 0.1, 136.0, 20.0), (0.101, 0.2, 144.0, 18.0), (0.201, 0.45, 142.0, 16.0), (0.451, 0.7, 140.0, 16.0), (0.701, 2.0, 140.0, 9.0), (2.001, 30.0, 132.0, 9.0)], 
'ZA': [(0.001, 8.0, 172.0, 26.0)],
"JP": {"initial_weight": 0.5, "initial_price": 31, "extra_weight": 0.5, "extra_price_1": 6, "extra_price_2": 8, "breakpoint": 2}
}

# 计算总重量
def calculate_total_weight(items):
    return sum(item['quantity'] * item.get('weight', 0.1) for item in items)

# 根据国家和重量计算运费
def calculate_shipping_cost(country_code, total_weight):
    if country_code == "JP":  # 日本特殊规则
        rates = SHIPPING_RATES["JP"]
        if total_weight <= rates["breakpoint"]:
            cost = rates["initial_price"] + math.ceil((total_weight - rates["initial_weight"]) / rates["extra_weight"]) * rates["extra_price_1"]
        else:
            cost = rates["initial_price"] + math.ceil((total_weight - rates["initial_weight"]) / rates["extra_weight"]) * rates["extra_price_2"]
    else:
        # 其他国家按重量段计算
        for min_weight, max_weight, cost_per_kg, handling_fee in SHIPPING_RATES[country_code]:
            if min_weight <= total_weight <= max_weight:
                cost = (cost_per_kg * total_weight) + handling_fee
                break
        else:
            raise ValueError("Weight exceeds limit for shipping.")
    return int(cost * 100)  # 转为 Stripe 单位（分）

# 汇率转换函数
def convert_to_usd(amount_in_cny):
    exchange_rate = 1 / 7  # 假设 1 美元 = 7 人民币
    return round(amount_in_cny * exchange_rate, 2)  # 保留两位小数


@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        items = data['items']
        # 计算总重量和运费
        country_code = data['country_code']
        # print image url
        
        print(country_code)
        if not country_code:
            return jsonify(error="Country code is missing"), 400  # 错误提示


        # 计算总重量
        total_weight = calculate_total_weight(items)

        # 计算运费
        # 运费以人民币计算
        shipping_cost_cny = calculate_shipping_cost(country_code, total_weight)

        # 转换运费为美元
        shipping_cost_usd = convert_to_usd(shipping_cost_cny)
        print(total_weight)
        print(shipping_cost_cny)
        print(shipping_cost_usd)

        # print all items and its color
        for item in items:
            print(item['name'], item['color'])
        
        line_items = []
        for item in items:
            product_name_with_color = f"{item['name']} - {item['color']}" 
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': int(item['price'] * 100),  # Convert to cents
                    'product_data': {
                        'name': product_name_with_color,
                        'metadata': {
                            'color': item['color'],  # Include the selected color
                        },
                    },
                },
                'quantity': item['quantity'],
            })

        # 生成单一运费选项
        shipping_options = [{
            "shipping_rate_data": {
                "type": "fixed_amount",
                "fixed_amount": {"amount": int(shipping_cost_usd), "currency": "usd"},
                "display_name": f"Shipping to {country_code}",
                "delivery_estimate": {
                    "minimum": {"unit": "business_day", "value": 3},
                    "maximum": {"unit": "business_day", "value": 15},
                },
            }
        }]

        #print(line_items)
         # 创建 Stripe Checkout Session
        checkout_session = stripe.checkout.Session.create(
            mode='payment',
            line_items=line_items,
            # add address
            shipping_address_collection={
                'allowed_countries': [country_code],
            },
            # add shipping method
            shipping_options=shipping_options,
            
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
            automatic_tax={'enabled': True},
        )
        
    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 400
    return jsonify(url=checkout_session.url)

# 配置 Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'ychenghao783@gmail.com'  # 使用您的 Gmail 用户名
app.config['MAIL_PASSWORD'] = 'ptco dfib rxmq cveu'  # 使用您的 Gmail 密码或应用密码
app.config['MAIL_DEFAULT_SENDER'] = 'ychenghao783@gmail.com'

mail = Mail(app)

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    data = request.json
    name = data.get('firstName') + " " + data.get('lastName')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    msg = Message(subject,
                  recipients=['ychenghao783@gmail.com'],  # 替换为您的邮箱地址
                  body=f"Name: {name}\nEmail: {email}\nMessage: {message}")
    
    try:
        mail.send(msg)
        return jsonify({"message": "Contact form submitted successfully."})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500 
    
@app.route('/api/send-image-email', methods=['POST'])
def send_image_email():
    try:
        data = request.json
        image_data = data.get('image')  # Base64 格式的图片数据
        if not image_data:
            return jsonify({"error": "Image data is missing"}), 400

        # 解析 Base64 图片
        image_binary = base64.b64decode(image_data.split(',')[1])

        # 创建邮件
        msg = Message('Customized Yo-Yo Image', 
                      sender='ychenghao783@gmail.com', 
                      recipients=['ychenghao783@gmail.com'])
        msg.body = 'Attached is the customized Yo-Yo image.'

        # 添加附件
        msg.attach("customized_yoyo.png", "image/png", image_binary)

        # 发送邮件
        mail.send(msg)
        return jsonify({"message": "Email sent successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
