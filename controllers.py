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


@action('index')
@action.uses(db, auth, 'index.html')
def index():
    return dict(
        # COMPLETE: return here any signed URLs you need.
        my_callback_url = URL('my_callback', signer=url_signer),
        load_reservation_table_url = URL('load_reservation_table', signer=url_signer),
        # add_new_post_url = URL('add_new_post', signer=url_signer),
        delete_reservation_url = URL('delete_reservation', signer=url_signer),
        user_email = get_user_email(),
    )


# (2) Making the database return a list here to pass through to table in html
@action('load_reservation_table')
@action.uses(url_signer.verify(), db)
def load_reservation_table():
    table_rows = db(db.reservations).select().as_list()
    return dict(table_rows=table_rows)


# Add Reservation Page
@action('addReservationPage')
@action.uses(db, session, auth.user, 'addReservationPage.html')
def addReservationPage():
    return dict(
        my_callback_url = URL('my_callback', signer=url_signer),
        add_new_reservation_url = URL('add_new_reservation'),
        load_reservation_table_url=URL('load_reservation_table', signer=url_signer),
    )


@action('add_new_reservation', method="POST")
# @action.uses(url_signer.verify(), db, session, auth.user)
@action.uses(db, session, auth.user)
def add_new_reservation():
    id = db.reservations.insert(
        reservation_day=request.json.get('reservation_day'),
        reservation_time=request.json.get('reservation_time'),
        reservation_location = request.json.get('reservation_location'),
        reservation_court_number = request.json.get('reservation_court_number'),
        user_email=request.json.get('user_email'),
    )
    print("Retrieving from the fields:")
    print(request.json)
    return dict(id=id)


@action('delete_reservation')
@action.uses(url_signer.verify(), db)
def delete_reservation():
    id = request.params.get('id')
    print("deleting reservation id: ", id)
    assert id is not None
    db(db.reservations.id == id).delete()
    return "deleted"


# Cancel Reservation Button
@action('redirect_home')
@action.uses(db, session, auth.user)
def cancel_reservation_button():
    redirect(URL('index'))
    pass



