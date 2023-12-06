"""empty message

Revision ID: b9955462a5d9
Revises:
Create Date: 2023-12-05 16:09:23.025764

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'b9955462a5d9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('state', sa.String(length=50), nullable=False),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('image1', sa.String(length=255), nullable=False),
    sa.Column('image2', sa.String(length=255), nullable=False),
    sa.Column('image3', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE bookings SET SCHEMA {SCHEMA};")

    op.create_table('trips',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('city', sa.String(length=30), nullable=False),
    sa.Column('state', sa.String(length=30), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.Column('image', sa.String(length=255), nullable=True),
    sa.Column('simplify', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE trips SET SCHEMA {SCHEMA};")

    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('state', sa.String(length=50), nullable=False),
    sa.Column('balance', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('between_user_expenses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_one_id', sa.Integer(), nullable=True),
    sa.Column('user_two_id', sa.Integer(), nullable=True),
    sa.Column('trip_id', sa.Integer(), nullable=True),
    sa.Column('owed', sa.Float(), nullable=True),
    sa.Column('owes', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['trip_id'], ['trips.id'], ),
    sa.ForeignKeyConstraint(['user_one_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_two_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE between_user_expenses SET SCHEMA {SCHEMA};")

    op.create_table('expenses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('payer_id', sa.Integer(), nullable=True),
    sa.Column('trip_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('expense_date', sa.Date(), nullable=False),
    sa.Column('image', sa.String(length=255), nullable=True),
    sa.Column('split_type', sa.String(length=50), nullable=True),
    sa.Column('split_type_info', sa.String(length=100), nullable=True),
    sa.Column('category', sa.String(length=50), nullable=True),
    sa.Column('total', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['payer_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['trip_id'], ['trips.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE expenses SET SCHEMA {SCHEMA};")

    op.create_table('itineraries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('trip_id', sa.Integer(), nullable=True),
    sa.Column('booking_id', sa.Integer(), nullable=True),
    sa.Column('booking_date', sa.Date(), nullable=True),
    sa.Column('expensed', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['booking_id'], ['bookings.id'], ),
    sa.ForeignKeyConstraint(['trip_id'], ['trips.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE itineraries SET SCHEMA {SCHEMA};")

    op.create_table('trip_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('trip_id', sa.Integer(), nullable=True),
    sa.Column('settled', sa.Boolean(), nullable=True),
    sa.Column('settled_date', sa.Date(), nullable=True),
    sa.Column('creator', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['trip_id'], ['trips.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE trip_details SET SCHEMA {SCHEMA};")

    op.create_table('expense_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('expense_id', sa.Integer(), nullable=True),
    sa.Column('price', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['expense_id'], ['expenses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE expense_details SET SCHEMA {SCHEMA};")

    op.create_table('expense_update_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('expense_id', sa.Integer(), nullable=True),
    sa.Column('update_date', sa.Date(), nullable=False),
    sa.Column('update_type', sa.String(length=50), nullable=True),
    sa.Column('update_info', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['expense_id'], ['expenses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE expense_update_details SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('expense_update_details')
    op.drop_table('expense_details')
    op.drop_table('trip_details')
    op.drop_table('itineraries')
    op.drop_table('expenses')
    op.drop_table('between_user_expenses')
    op.drop_table('users')
    op.drop_table('trips')
    op.drop_table('bookings')
    # ### end Alembic commands ###
