"""
This file defines the database models
"""

import datetime
from .common import db, Field, auth
from pydal.validators import *


def get_user_email():
    return auth.current_user.get('email') if auth.current_user else None

def get_time():
    return datetime.datetime.utcnow()


# Define your table below
#
# db.define_table('thing', Field('name'))
#
# always commit your models to avoid problems later

db.define_table('reservations',
                Field('reservation_date'),
                Field('reservation_time'),
                Field('reservation_location'),
                Field('reservation_court_number'),
                Field('verification', default=get_user_email),
                )

db.commit()
