from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from app.models.insurance import QuoteRequest

quote_bp = Blueprint('quote', __name__)


@quote_bp.route('/get-a-quote', methods=['GET', 'POST'])
def get_a_quote():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json() or {}
            quote = QuoteRequest(
                name=data.get('name', ''),
                email=data.get('email', ''),
                phone=data.get('phone', ''),
                product=data.get('product', ''),
                message=f"Cover: {data.get('cover_amount', '')} | ID: {data.get('id_number', '')}",
            )
            return jsonify({'status': 'success', 'message': 'Thank you! Your quote request has been received.'})

        quote = QuoteRequest(
            name=request.form.get('name', ''),
            email=request.form.get('email', ''),
            phone=request.form.get('phone', ''),
            product=request.form.get('product', ''),
            message=request.form.get('message', ''),
        )
        flash('Thank you! Your quote request has been received. We will be in touch shortly.', 'success')
        return redirect(url_for('quote.get_a_quote'))

    return render_template('quote.html')
