from src import create_app, db
#from waitress import serve

# Create DB and run
db.create_all(app=create_app())


# Run app only
#app=create_app()


