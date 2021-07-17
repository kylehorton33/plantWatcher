import time
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource

from uuid import uuid4

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

## Define Models

class Plant(db.Model):
    _tablename__ = 'plant'
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(32))
    # change to "created/updated on" later?
    added_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    name = db.Column(db.String(50))
    location = db.Column(db.String(50))
    latest_pic = db.Column(db.String(255))

    def __repr__(self):
        return f'{self.name} - id: {self.id}'

class Log(db.Model):
    _tablename__ = 'log'
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36))
    plant_id = db.Column(db.String(32), db.ForeignKey('plant.uuid'))
    # change to "created/updated on" later?
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
    icon = db.Column(db.String(50))
    msg = db.Column(db.String(50))

    def __repr__(self):
        return f'Log: {self.msg}'

## Define Schema

class PlantSchema(ma.Schema):
    class Meta:
        fields = ("id", "uuid", "added_at", "updated_at", "name", "location", "latest_pic")
        model = Plant

class LogSchema(ma.Schema):
    class Meta:
        fields = ("id", "uuid", "plant_id", "timestamp", "icon", "msg")
        model = Log

plant_schema = PlantSchema()
plants_schema = PlantSchema(many=True)

log_schema = LogSchema()
logs_schema = LogSchema(many=True)

## Define Resources

class PlantListResource(Resource):
    def get(self):
        plants = Plant.query.all()
        return plants_schema.dump(plants)

    def post(self):
        data = request.get_json()
        new_plant = Plant(
            name = data["name"],
            uuid = uuid4().hex,
            location = data["location"],
            latest_pic = data["latest_pic"]
        )
        db.session.add(new_plant)
        db.session.commit()
        print(plant_schema.dump(new_plant))
        return plant_schema.dump(new_plant)

api.add_resource(PlantListResource, '/api/plants')

class PlantResource(Resource):
    def get(self, plant_id):
        plant = Plant.query.filter_by(uuid=plant_id).first_or_404()
        return plant_schema.dump(plant)
    
    def delete(self, plant_id):
        plant = Plant.query.filter_by(uuid=plant_id).first_or_404()
        db.session.delete(plant)
        db.session.commit()
        return '', 204

api.add_resource(PlantResource, '/api/plants/<string:plant_id>')

class LogListResource(Resource):
    def get(self):
        logs = Log.query.all()
        return logs_schema.dump(logs)

    def post(self):
        data = request.get_json()
        print(data)
        new_log = Log(
            plant_id = data["plant_id"],
            uuid = uuid4().hex,
            msg = data["msg"],
            icon = data["icon"]
        )
        db.session.add(new_log)
        db.session.commit()
        return log_schema.dump(new_log)

api.add_resource(LogListResource, '/api/logs')

class LogResource(Resource):
    def get(self, log_id):
        log = Log.query.filter_by(uuid=log_id).first_or_404()
        return log_schema.dump(log)
    
    def delete(self, log_id):
        log = Log.query.filter_by(uuid=log_id).first_or_404()
        db.session.delete(log)
        db.session.commit()
        return '', 204

api.add_resource(LogResource, '/api/logs/<string:log_id>')
