class GameTypeController(object):
    # de prints mogen er uit na connectie met react

    def __init__(self, Name=None, Value=None):
        self.Name = Name
        self.Value = Value
    
    @classmethod
    def getAll(cls, connection):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM GameType")
        gameTypeInfo = cursor.fetchall()
        print("All PlayTypes from the database:\n") 
        for gameType in gameTypeInfo:
            cls.printPlayTypeInfo(gameType)
        print("")
        return gameTypeInfo
    
    @classmethod
    def getById(cls, id, connection):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM GameType WHERE IdGameType = ?", (id, ))
        gameTypeInfo = cursor.fetchone()
        print(f"PlayType with id {id} fom the database:")
        cls.printPlayer(gameTypeInfo) 
        print("")
        return gameTypeInfo
    
    @classmethod
    def patch(cls, id, field, new_value, connection):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM GameType WHERE IdGameType = ?", (id, ))
        gameTypeInfo = cursor.fetchone()

        if gameTypeInfo is not None:
            if field == "Name":
                gameTypeInfo[1] = new_value
                cursor.execute("UPDATE GameType SET Name = ? WHERE IdGameType = ?", (new_value, id))
            if field == "Value":
                gameTypeInfo[2] = new_value
                cursor.execute("UPDATE GameType SET Value = ? WHERE IdGameType = ?", (new_value, id))
            connection.commit()
        else:
            print(f"PlayType with ID {id} does not exist.")

    @classmethod
    def add(cls, connection, newGameType):
        cursor = connection.cursor()
        cursor.execute("INSERT INTO GameType (Name, Value) VALUES (?, ?)",
                   (newGameType.Name, newGameType.Value))
        connection.commit()

    @classmethod
    def delete(cls, id, connection):
        cursor = connection.cursor()
        cursor.execute("DELETE FROM GameType WHERE IdGameType like ?", (id, ))
        connection.commit()

        if cursor.rowcount > 0:
            print(f"PlayType with ID {id} deleted.")
        else:
            print(f"PlayType with ID {id} does not exist.")


    @classmethod
    def printPlayType(cls, gameType):
        print(f"ID: {gameType[0]} - Name: {gameType[1]} - Value: {gameType[2]}")
        return gameType
