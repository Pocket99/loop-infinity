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

app = Flask(__name__)
CORS(app, origins=["*"])



# This is your test secret API key.
stripe.api_key = 'sk_test_51O2hqKGX1i6I66OXPQXgqJk80vtjHYgdXt6gaWWymuvSfHgPjKcNYToEQZgunViyRJVQvLJsFfL4jaJ4mUlVlQ1300QV8ElMbA'


@app.route('/addTeamMember', methods=['POST'])
def add_team_member():
    # Logic to insert team member into the database
    # Example: read JSON from frontend, insert into DB, return a response
    # Database connection setup here ...
    connection = mysql.connector.connect(
        host='database-1.c3nzflg9j5dh.us-east-1.rds.amazonaws.com',
        port=3306,
        user='admin',
        password='Aa990205qzr+++',
        database='LOOPINFINITY'
    )


    cursor = connection.cursor()
    data = request.get_json()
    data = json.loads(data['body'])
    print(data)
    name = data['name']
    print(name)
    role = data['role']
    print(role)
    
    # Insert data into DB (use psycopg2 as in the previous message)
    # ...
    
    try:
        query = "INSERT INTO team_members (name, role) VALUES (%s, %s);"
        cursor.execute(query, (name, role))
        connection.commit()
        return jsonify({"message": "Team member added successfully!"}), 200
    except KeyError as ke:
        return jsonify({"error": f"Key error: {str(ke)}"}), 400
    except ValueError as ve:
        return jsonify({"error": f"Value error: {str(ve)}. Possibly malformed JSON string in 'body'."}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        connection.close()

# Additional API routes...
@app.route('/getTeamMembers', methods=['GET'])
def get_team_members():
    connection = mysql.connector.connect(
        host='database-1.c3nzflg9j5dh.us-east-1.rds.amazonaws.com',
        port=3306,
        user='admin',
        password='Aa990205qzr+++',
        database='LOOPINFINITY'
    )


    cursor = connection.cursor()
    try:
        # Query to fetch data
        query = "SELECT * FROM team_members"
        cursor.execute(query)

        # Fetching and sending the result
        result = cursor.fetchall()
        #print(result)
        return jsonify(result)
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database error"}), 500
    finally:    
        cursor.close()
        connection.close()
    

@app.route('/getProductData', methods=['GET'])
def get_product_data():
    connection = mysql.connector.connect(
        host='database-1.c3nzflg9j5dh.us-east-1.rds.amazonaws.com',
        port=3306,
        user='admin',
        password='Aa990205qzr+++',
        database='LOOPINFINITY'
    )


    cursor = connection.cursor()
    try:
        # Query to fetch data
        query = "SELECT * FROM product_data"
        cursor.execute(query)

        # Fetching and sending the result
        result = cursor.fetchall()
        #print(result)
        return jsonify(result)
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database error"}), 500
    finally:
        cursor.close()
        connection.close()
    

def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 1400


@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='cad',
            # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403
    
YOUR_DOMAIN = 'http://localhost:3000'

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
    "US": [
        (0.001, 0.1, 136, 20), (0.101, 0.2, 144, 18), (0.201, 0.45, 142, 16),
        (0.451, 0.7, 140, 16), (0.701, 2, 140, 9), (2.001, 30, 132, 9)
    ],
    "CA": [
        (0.001, 0.15, 89, 22), (0.151, 0.45, 90, 22), (0.451, 0.75, 93, 23),
        (0.751, 1, 94, 23), (1.001, 30, 94, 23)
    ],
    "HK": [(0.001, 2, 16, 22), (2.001, 20, 16, 40)],
    "KR": [(0.001, 2, 7, 17), (2.001, 20, 9, 17)],
    "SG": [(0.001, 0.2, 62, 14), (0.201, 0.4, 61, 11.5), (0.401, 30, 52, 6)],
    "JP": {"initial_weight": 0.5, "initial_price": 31, "extra_weight": 0.5, "extra_price_1": 6, "extra_price_2": 8, "breakpoint": 2}
}

# 计算总重量
def calculate_total_weight(items):
    return sum(item['quantity'] * item.get('weight', 0.06) for item in items)

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


@app.route('/create-checkout-session', methods=['POST'])
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

@app.route('/contact', methods=['POST'])
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
    
@app.route('/send-image-email', methods=['POST'])
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
    app.run( port=5000)
