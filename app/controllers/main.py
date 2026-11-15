from flask import Blueprint, render_template, redirect

main_bp = Blueprint('main', __name__)


@main_bp.route('/')
def index():
    return render_template('index.html')


@main_bp.route('/products')
def products():
    return redirect('/#products')


@main_bp.route('/the-linar-difference')
def difference():
    return redirect('/#difference')


@main_bp.route('/eligibility')
def eligibility():
    return redirect('/#eligibility')


@main_bp.route('/resources')
def resources():
    return redirect('/#resources')


@main_bp.route('/values')
def values():
    return redirect('/#values')
