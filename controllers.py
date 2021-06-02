"""
This file defines actions, i.e. functions the URLs are mapped into
The @action(path) decorator exposed the function at URL:

    http://127.0.0.1:8000/{app_name}/{path}

If app_name == '_default' then simply

    http://127.0.0.1:8000/{path}

If path == 'index' it can be omitted:

    http://127.0.0.1:8000/

The path follows the bottlepy syntax.

@action.uses('generic.html')  indicates that the action uses the generic.html template
@action.uses(session)         indicates that the action uses the session
@action.uses(db)              indicates that the action uses the db
@action.uses(T)               indicates that the action uses the i18n & pluralization
@action.uses(auth.user)       indicates that the action requires a logged in user
@action.uses(auth)            indicates that the action requires the auth object

session, db, T, auth, and tempates are examples of Fixtures.
Warning: Fixtures MUST be declared with @action.uses({fixtures}) else your app will result in undefined behavior
"""

from py4web import action, request, abort, redirect, URL
from yatl.helpers import A
from .common import db, session, T, cache, auth, logger, authenticated, unauthenticated, flash
from py4web.utils.url_signer import URLSigner
from .models import get_user_email

url_signer = URLSigner(session)


# Index Page
@action('index')
@action.uses(db, auth, 'index.html')
def index():
    return dict(
        # COMPLETE: return here any signed URLs you need.
        my_callback_url = URL('my_callback', signer=url_signer),
        load_reservation_table_url = URL('load_reservation_table', signer=url_signer),
        delete_reservation_url = URL('delete_reservation', signer=url_signer),
    )


# Add Reservation Page
@action('addReservationPage')
@action.uses(db, session, auth.user, 'addReservationPage.html')
def addReservationPage():
    return dict(
        my_callback_url = URL('my_callback', signer=url_signer),
    )

# connecting to Reservation Page


# (2) Making the database return a list here to pass through to table in html
@action('load_reservation_table')
@action.uses(url_signer.verify(), db)
def load_reservation_table():
    rows = db(db.reservations).select().as_list()
    return dict(table_rows=rows)


