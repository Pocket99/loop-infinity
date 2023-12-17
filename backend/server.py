from flask import Flask, request, jsonify
import psycopg2
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
import json
import stripe

app = Flask(__name__)
CORS(app, origins=["*"])


# This is your test secret API key.
stripe.api_key = ''


@app.route('/addTeamMember', methods=['POST'])
def add_team_member():
    # Logic to insert team member into the database
    # Example: read JSON from frontend, insert into DB, return a response
    # Database connection setup here ...
    connection = mysql.connector.connect(
        host='',
        port=3306,
        user='',
        password='',
        database=''
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
        host='',
        port=3306,
        user='',
        password='',
        database=''
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
        host='',
        port=3306,
        user='',
        password='',
        database=''
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
        host='',
        port=3306,
        user='',
        password='',
        database=''
    )
    cursor = connection.cursor()
    try:
        query = "SELECT price_id FROM product_data WHERE id = %s"
        cursor.execute(query, (productId,))
        result = cursor.fetchone()
        price_id = result[0]
        print(price_id)
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
        print(items)
        line_items = [{
            'price': getPriceId(item['id']),
            'quantity': item['quantity'],
        } for item in items]

        print(line_items)
        checkout_session = stripe.checkout.Session.create(
            line_items=line_items,
            # add address
            shipping_address_collection={
                'allowed_countries': ['US', 'CA','JP'],
            },
            mode='payment',
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
            automatic_tax={'enabled': True},
        )
        
    except Exception as e:
        return jsonify(error=str(e)), 400
    return jsonify(url=checkout_session.url)
    

if __name__ == '__main__':
    app.run(port=5000)
