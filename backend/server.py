from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import psycopg2
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
import json
import stripe

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
    

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        items = data['items']
        #print(items)
        line_items = [{
            'price': item['price_id'],
            'quantity': item['quantity'],
        } for item in items]

        shipping_options = [
            {
                "shipping_rate_data": {
                    "type": "fixed_amount",
                    "fixed_amount": {"amount": 0, "currency": "cad"},
                    "display_name": "Free shipping",
                    "delivery_estimate": {
                    "minimum": {"unit": "business_day", "value": 5},
                    "maximum": {"unit": "business_day", "value": 7},
                    },
                },
            },
            {
                "shipping_rate_data": {
                    "type": "fixed_amount",
                    "fixed_amount": {"amount": 1500, "currency": "cad"},
                    "display_name": "Next day air",
                    "delivery_estimate": {
                    "minimum": {"unit": "business_day", "value": 1},
                    "maximum": {"unit": "business_day", "value": 1},
                    },
                },
            },
        ]

        #print(line_items)
        checkout_session = stripe.checkout.Session.create(
            mode='payment',
            line_items=line_items,
            # add address
            shipping_address_collection={
                'allowed_countries': ['US', 'CA','JP'],
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

if __name__ == '__main__':
    app.run( port=5000)
