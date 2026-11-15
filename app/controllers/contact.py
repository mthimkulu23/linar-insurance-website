from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from app.models.insurance import ContactRequest

contact_bp = Blueprint('contact', __name__)


@contact_bp.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json() or {}
            contact_req = ContactRequest(
                name=data.get('name', ''),
                email=data.get('email', ''),
                phone=data.get('phone', ''),
                message=data.get('message', ''),
            )
            return jsonify({'status': 'success', 'message': 'Thank you! A consultant will contact you shortly.'})

        contact_req = ContactRequest(
            name=request.form.get('name', ''),
            email=request.form.get('email', ''),
            phone=request.form.get('phone', ''),
            message=request.form.get('message', ''),
        )
        flash('Thank you for reaching out! A consultant will contact you soon.', 'success')
        return redirect(url_for('contact.contact'))

    return render_template('contact.html')
