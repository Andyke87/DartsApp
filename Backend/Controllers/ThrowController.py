class ThrowController(object):
    # de prints mogen er uit na connectie met react

    def __init__(self, Points=None):
        self.Firstname = Points
    
    @classmethod
    def getAll(cls, connection):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Throw")
        throwInfo = cursor.fetchall()
        print("All throws from the database:\n") 
        for throw in throwInfo:
            cls.printThrow(throw)
        print("")
        return throwInfo
    
    @classmethod
    def getById(cls, id, connection):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Throw WHERE IdThrow = ?", (id, ))
        throw = cursor.fetchone()
        print(f"Throw with id {id} fom the database:")
        cls.printThrow(throw) 
        print("")
        return throw

    @classmethod
    def add(cls, connection, throw):
        cursor = connection.cursor()
        cursor.execute("INSERT INTO Throw (Points) VALUES (?)", (throw.Points))
        connection.commit()

    @classmethod
    def delete(cls, id, connection):
        cursor = connection.cursor()
        cursor.execute("DELETE FROM Throw WHERE IdThrow like ?", (id, ))
        connection.commit()

        if cursor.rowcount > 0:
            print(f"Throw with ID {id} deleted.")
        else:
            print(f"Throw with ID {id} does not exist.")

    @classmethod
    def printThrow(cls, throw):
        print(f"ID: {throw[0]} - Points: {throw[1]}")
        return throw
