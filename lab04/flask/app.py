from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped,mapped_column
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_marshmallow import Marshmallow
from marshmallow import post_load
import re

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] ="sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Base(DeclarativeBase):
    pass

class Person(db.Model):
    id: Mapped[int] = mapped_column(db.Integer,primary_key=True)
    name: Mapped[str] = mapped_column(db.String)
    surname: Mapped[str] = mapped_column(db.String)
    job: Mapped[str] = mapped_column(db.String)


class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person

    @post_load
    def make_user(self, data, **kwargs):
        return Person(**data)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/hello")
def hello():
    name = request.args.get('name')
    if name==None:
        return jsonify({'content':"Hello World!"})
    match_ =re.match("[a-zA-Z]+", name)
    if match_:
        name = match_.group(0)
    else:
        name = "Friend"
    content="Hello "+name+"!"
    
    return jsonify({'content':content})
    
@app.route("/person")
def person():
    surname1 = request.args.get('surname')
    if not surname1:
        data=db.session.execute(db.select(Person)).scalars().all()
        persons=PersonSchema(many=True).dump(data)
        return jsonify({'persons':persons})
    
    data = Person.query.filter_by(surname=surname1).first()
    person=PersonSchema().dump(data)
    if person:
        return jsonify({'person_data':person})
    else:
        content = "Person not found."
    return jsonify({'content': content})

@app.route("/person/<id>")
def person1(id):
    data = db.get_or_404(Person, id)
    person=PersonSchema().dump(data)
    if person:
        return jsonify({'person_data':person})
    else:
        content = "Person not found."
    return jsonify({'content': content})

@app.route('/create', methods = ['POST'])
def create():
    try:
        data=request.get_json()
        person=PersonSchema().load(data)
        db.session.add(person)
        db.session.commit()
        return jsonify({'message': 'Person created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
if __name__ == '__main__':
    app.run()

with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add(Person(name="ser",surname="serowy",job='it'))
    db.session.commit()