@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        request_data = request.json
        if not request_data or 'data' not in request_data:
            raise ValueError("Missing 'data' field in request")

        data = request_data['data']
        if not isinstance(data, list):
            raise ValueError("'data' should be a list")

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        lowercase_alphabets = [item for item in alphabets if item.islower()]

        response = {
            "is_success": True,
            "user_id": "john_doe_17091999",
            "email": "john@xyz.com",
            "roll_number": "ABCD123",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [max(lowercase_alphabets)] if lowercase_alphabets else []
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 400
